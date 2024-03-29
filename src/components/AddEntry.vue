<template>
  <div id="entry-form">
    <form @submit.prevent="handleSubmission">
      <input
        type="text"
        v-model="entrytitle"
        placeholder="Add Entry"
        class="field"
      />
      <div>
        <label for="duration">Duration (minutes)</label>
        <input
          type="Number"
          v-model="duration"
          placeholder="Add duration"
          class="field"
        />
      </div>
      <div>
        <label>Due Date (yyyymmdd)</label>
        <input type="text" v-model="duedate" class="field" />
      </div>
      <button v-if="entryToEdit._id" type="submit">Update</button>
      <button v-else type="submit">Add</button>
    </form>
    <form v-if="entryToEdit._id" @submit.prevent="deleteEntry">
      <button type="submit">Delete</button>
    </form>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import { useStore } from 'vuex'
import { useMutation } from '@vue/apollo-composable'
import createCommitmentMutation from '@/graphql/createCommitment.mutation.gql'
import updateCommitmentMutation from '@/graphql/updateCommitment.mutation.gql'
import deleteCommitmentMutation from '@/graphql/deleteCommitment.mutation.gql'
import mixpanel from 'mixpanel-browser'
import allCommitmentsQuery from '@/graphql/allCommitments.query.gql'

export default {
  props: {
    parent: Object,
    entryToEdit: Object,
  },
  name: 'AddEntry',
  setup(props, context) {
    const store = useStore()

    const entryToEdit = JSON.parse(JSON.stringify(props.entryToEdit))

    const entrytitle = entryToEdit._id ? ref(entryToEdit.entrytitle) : ref('')
    const duedate =
      entryToEdit._id && entryToEdit.duedate
        ? ref(entryToEdit.duedate)
        : ref('')
    const duration =
      entryToEdit._id && entryToEdit.duration
        ? ref(entryToEdit.duration)
        : ref(45)

    const { mutate: createCommitment } = useMutation(
      createCommitmentMutation,
      () => ({
        update: (cache, { data: { createCommitment } }) => {
          const data = cache.readQuery({ query: allCommitmentsQuery })
          const newData = [...data.allCommitments.data].concat([
            createCommitment,
          ])
          const newAllCommitments = { ...data.allCommitments, data: newData }
          cache.writeQuery({
            query: allCommitmentsQuery,
            data: { ...data, allCommitments: newAllCommitments },
          })
        },
      })
    )

    const { mutate: updateCommitment } = useMutation(updateCommitmentMutation)

    const addEntry = () => {
      const newParent = JSON.parse(JSON.stringify(props.parent))
      console.log(newParent)
      store.dispatch('addCommitment', {
        newCommitment: {
          entrytitle: entrytitle.value,
          duedate: duedate.value,
          duration: duration.value,
          parent: { _id: newParent._id },
        },
        createCommitment,
        mixpanel,
      })
    }

    const handleSubmission = () => {
      if (entryToEdit._id) {
        const updatedCommitment = {
          ...entryToEdit,
          entrytitle: entrytitle.value,
          duedate: duedate.value,
          duration: duration.value,
        }
        store.dispatch('updateCommitment', {
          updatedCommitment,
          updateCommitment,
        })
      } else {
        addEntry()
      }
      store.commit('SET_ENTRY_TO_EDIT', { entryToEdit: {} })
      context.emit('submitted', true)
    }

    const { mutate: deleteCommitment } = useMutation(
      deleteCommitmentMutation,
      () => ({
        update: (cache, { data: { deleteCommitment } }) => {
          const data = cache.readQuery({ query: allCommitmentsQuery })
          const newData = data.allCommitments.data.filter(
            (commitment) => commitment._id != deleteCommitment._id
          )
          const newAllPlanets = { ...data.allCommitments, data: newData }
          cache.writeQuery({
            query: allCommitmentsQuery,
            data: { ...data, allCommitments: newAllPlanets },
          })
        },
      })
    )
    const deleteEntry = () => {
      store.dispatch('deleteCommitment', {
        commitmentToDelete: entryToEdit,
        deleteCommitment,
      })
    }
    return { handleSubmission, duedate, duration, entrytitle, deleteEntry }
  },
}
</script>

<style scoped>
#entry-form {
  box-shadow: 5px 10px 20px var(--entry-addition-colour);
  position: relative;
  top: -100px;
  left: -10px;
  width: 290px;
  height: 1000px;
  background-color: theme('colors.pink.900');
  border-radius: 10px;
  z-index: 20;
}

#entry-form form {
  display: grid;
  gap: 10px;
  grid-template-rows: auto;
  padding: 20px;
}

option,
select,
label,
input {
  display: inline-flex;
  font-family: 'Open sans', sans-serif;
  font-size: 100%;
  /* line-height: 1.15; */
  margin-right: 5px;
}

label {
  color: whitesmoke;
  font-weight: 200;
  opacity: 0.5;
}

/* removing the buttons on the number input */
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type='number'] {
  -moz-appearance: textfield;
}

button,
optgroup,
input,
select,
option {
  background-color: theme('colors.pink.800');
  border-style: none;
  outline: none;
  border-radius: 5px;
  color: white;
  padding: 10px;
}
</style>
