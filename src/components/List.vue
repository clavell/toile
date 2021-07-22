<template>
  <div class="list" ref="el">
    <div class="title">Commitments</div>
    <div id="wrapper">
      <!-- <EventCard v-for="event in events" :key="event.id" :event="event" /> -->
      <TodoCard
        v-for="item in commitments"
        :key="item"
        :entrytitle="item.entrytitle"
      />
    </div>
    <div class="buttoncontainer">
      <AddEntry v-if="addingEntry" @submitted="hideAddCard"/>
      <AddButton v-else ref="buttonElement" @press="showAddCard"/>
    </div>
    <div v-if="addingEntry" class="overlay"></div>
  </div>
</template>

<script>
import TodoCard from '@/components/TodoCard.vue'
import AddButton from '@/components/AddButton.vue'
import AddEntry from '@/components/AddEntry.vue'
import { computed, ref, watch, provide } from 'vue'
export default {
  name: 'List',
  components: {
    TodoCard,
    AddButton,
    AddEntry,
  },
  setup() {
    const el = ref(null)
    const listWidth = ref(null)
    const addingEntry = ref(false)

    watch(el, (el) => {
      listWidth.value = el.offsetWidth
    })

    provide(
      'entryWidth',
      computed(() => {
        if (listWidth.value) {
          return {
            width: listWidth.value * 0.75 + 'px',
          }
        }
        return {}
      })
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
      return this.$store.state.commitments
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
  width: 300px;
  height: 500px;
  background-color: var(--list-background-colour);
  border-radius: 20px;
  color: var(--list-font-colour);
  gap: 2px;
  /* padding-left: 40px;
  padding-right: 0px; */
}

#wrapper {
  display: grid;
  width: 300px;
  overflow-y: auto;
  gap: 2px;
  grid-auto-rows: var(--entry-size);
  scrollbar-color: rgba(255, 255, 255, 0.2) var(--list-background-colour);
  padding: 0;
}

.listentry {
  background-color: var(--entry-background-colour);
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
