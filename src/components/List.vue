<template>
  <div class="list" ref="el">
    <div class="title" >Commitments</div>
    <div id="wrapper">
      <!-- <EventCard v-for="event in events" :key="event.id" :event="event" /> -->
      <component
        v-for="item in listInfo.commitments"
        :is="item.type"
        :key="item.id"
        :commitment="item"
      />
    </div>
    <div class="buttoncontainer">
      <AddEntry v-if="addingEntry" @submitted="hideAddCard"/>
      <AddButton v-else @press="showAddCard"/>
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

export default {
  name: 'List',
  props: {
    listInfo: Object
    },
  components: {
    TodoCard,
    AddButton,
    AddEntry,
    EmptyListSpace
  },
  setup() {
    const el = ref(null)
    const listWidth = ref(null)
    const addingEntry = ref(false)
    const store = useStore()
    const commitmentsList = computed(() => {
      return store.state.commitments.filter(((el) => {
        return el.parent.id === store.state.topParent.id
      }))
    })
    store.commit('UPDATE_DISPLAY')
    watch(commitmentsList,()=>{
    store.commit('UPDATE_DISPLAY')
    })

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

    provide(
      'entryWidth', entryWidth
      
    )

    const hideAddCard = () => {
      addingEntry.value = false
    }
    
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


    return { el, addingEntry, showAddCard, hideAddCard }
  },
  computed: {
    commitments() {
      return this.$store.getters.commitmentsSortedByCompletedStatus
    },
    numberOfCommitments() {
      return this.$store.getters.commitmentsCount
    },
  },
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
  color: var(--list-font-colour);
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

.listentry {
  /* thinking ahead to when going to be using drag and drop */
  background-color: theme('colors.pink.800');
  border-radius: 5px;
  display: flex;
  /* width: 100%; */
  /* margin: 0 auto; */
  justify-content: center;
  flex-direction: column;
}

.title {
  text-align: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
}
</style>
