<template>
  <div id="entry-form">
    <form @submit.prevent="addEntry">
      <input
        type="text"
        v-model="entrytitle"
        placeholder="Add Entry"
        class="field"
      />
      <div>
        <label for="duration">Duration</label>
        <input
          type="Number"
          v-model="duration"
          placeholder="Add duration"
          class="field"
        />
      </div>
      <div>
        <label>Due Date (dd/mm/yyyy)</label>
        <input type="text" v-model="duedate" class="field" />
      </div>
      <button type="submit">Add</button>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    parent: Object,
  },
  name: 'AddEntry',
  data() {
    return {
      entrytitle: '',
      duedate: '21/07/2021',
      duration: 45,
    }
  },
  methods: {
    addEntry() {
      const newParent = JSON.parse(JSON.stringify(this.parent))
      this.$store.dispatch('addCommitment', {
        entrytitle: this.entrytitle,
        duedate: this.duedate,
        duration: this.duration,
        parent: { _id: newParent._id },
      })
      this.$emit('submitted', true)
    },
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
  grid-template-rows: 30px;
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
