<template>
  <div class="list" :class="listid" ref="el">
    <div class="listheader">
      <div v-if="canGoBack" @click="goBack(parentCommitment)">&lt;</div>
      <div class="title">{{ parentCommitment.entrytitle }}</div>
    </div>
    <div id="wrapper">
      <!-- put the prerequisites here -->
      <div v-if="prerequisites.length != 0" class="sectionTitle">
        Prerequisites:
      </div>

      <TodoCard
        v-for="prereq in prerequisites"
        :key="prereq._id"
        :commitment="prereq"
        :parentCommitment="parentCommitment"
        :deckIndex="deckIndex"
        class="prerequisite"
      />

      <div v-if="canGoBack && listInfo.commitments.length>0" class="sectionTitle">Subtasks:</div>
      <!-- here are the subtasks -->
      <component
        v-for="item in listInfo.commitments"
        :is="item.type"
        :key="item._id"
        :commitment="item"
        :parentCommitment="parentCommitment"
        :deckIndex="deckIndex"
        class="todo"
      />
    </div>
    <div class="buttoncontainer">
      <AddEntry
        v-if="addingEntry"
        @submitted="hideAddCard"
        :parent="parentCommitment"
        :entryToEdit="entryToEdit"
      />
      <AddButton v-else @press="showAddCard" />
    </div>
    <div v-if="addingEntry" class="overlay"></div>
  </div>
</template>

<script>
import TodoCard from '@/components/TodoCard.vue'
import AddButton from '@/components/AddButton.vue'
import AddEntry from '@/components/AddEntry.vue'
import EmptyListSpace from '@/components/EmptyListSpace.vue'
import { computed, ref, watch, provide } from 'vue'
import { useStore } from 'vuex'
import { classStringEnum } from '@/use/enums.js'

export default {
  name: 'List',
  props: {
    listInfo: Object,
    deckIndex: Number,
  },
  components: {
    TodoCard,
    AddButton,
    AddEntry,
    EmptyListSpace,
  },
  setup(props) {
    const el = ref(null)
    const listWidth = ref(null)
    const addingEntry = ref(false)
    const store = useStore()

    const parentCommitment = store.getters.commitmentById(props.listInfo._id)
    // store.commit('UPDATE_DISPLAY')
    // watch(commitmentsList, () => {
    //   store.commit('UPDATE_DISPLAY')
    // })

    //get the list of prerequisites
    const prerequisites = computed(() => {
      return store.getters.prerequisitesById(props.listInfo._id)
    })

    const canGoBack = computed(() => parentCommitment.parent._id != null)

    const entryWidth = computed(() => {
      if (listWidth.value) {
        return {
          width: listWidth.value * 0.75 + 'px',
        }
      }
      return {}
    })
    watch(el, (el) => {
      listWidth.value = el.offsetWidth
    })

    provide('entryWidth', entryWidth)

    const hideAddCard = () => {
      addingEntry.value = false
      console.log('hiding')
      store.commit('SET_ENTRY_TO_EDIT', { entryToEdit: {} })
      store.commit('SET_DECK_AS_SINGLE_PARENT', {
        deckIndex: props.deckIndex,
        commitment: parentCommitment,
      })
    }

    const entryToEdit = computed(() => store.state.entryToEdit)

    const showAddCard = () => {
      addingEntry.value = true
      document.addEventListener('pointerdown', (event) => {
        var x = event.clientX,
          y = event.clientY,
          elementMouseIsOver = document.elementFromPoint(x, y)
        if (elementMouseIsOver.classList.contains('overlay')) {
          hideAddCard()
        }
      })
    }

    watch(entryToEdit, (entryToEdit) => {
      if (entryToEdit._id) {
        showAddCard()
      }
    })

    const goBack = function (parent) {
      if (parent.parent._id != null) {
        const previousParent = store.getters.commitmentById(parent.parent._id)
        store.commit('SET_DECK_AS_SINGLE_PARENT', {
          deckIndex: props.deckIndex,
          commitment: previousParent,
        })
      }
    }

    const listid = computed(() => {
      return classStringEnum.listid + '_' + props.listInfo._id
    })

    return {
      el,
      entryToEdit,
      addingEntry,
      showAddCard,
      hideAddCard,
      parentCommitment,
      goBack,
      canGoBack,
      prerequisites,
      listid,
    }
  },
  // computed: {
  //   commitments() {
  //     return this.$store.getters.commitmentsSortedByCompletedStatus
  //   },
  //   numberOfCommitments() {
  //     return this.$store.getters.commitmentsCount
  //   },
  // },
}
</script>

<style>
.buttoncontainer {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.list {
  padding: 0 20px 0 40px;
  display: grid;
  grid-template-rows: var(--entry-size) 1fr calc(2 * var(--entry-size));
  width: 350px;
  height: 500px;
  background-color: theme('colors.pink.900');
  border-radius: 20px;
  /* color: var(--list-font-colour); */
  gap: 2px;
  /* padding-left: 40px;
  padding-right: 0px; */
}

#wrapper {
  display: grid;
  overflow-y: auto;
  gap: 2px;
  grid-auto-rows: var(--entry-size);
  grid-template-columns: 1fr 20fr;
  scrollbar-color: rgba(255, 255, 255, 0.2) theme('colors.pink.900');
  padding: 0;
}

.prerequisite {
  background-color: theme('colors.purple.800');
}

.todo {
  background-color: theme('colors.pink.800');
}

.listentry {
  /* thinking ahead to when going to be using drag and drop */
  border-radius: 5px;
  /* display: flex; */
  /* width: 100%; */
  /* margin: 0 auto; */
  justify-content: center;
}

.title {
  text-align: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.listheader {
  display: flex;
  flex-direction: row;
}

.sectionTitle {
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  grid-column: 1 / span 2;
}
</style>
