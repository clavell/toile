<template>
  <div class="list">
    <div class="title">Commitments</div>
    <div id="wrapper">
      <!-- <EventCard v-for="event in events" :key="event.id" :event="event" /> -->
      <TodoCard
        v-for="item in commitments"
        :key="item"
        :event="item.entrytitle"
      />
    </div>
  </div>
</template>

<script>
import TodoCard from '@/components/TodoCard.vue'
export default {
  name: 'List',
  components: {
    TodoCard,
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
.list {
  padding: 0 40px;
  display: grid;
  grid-template-rows: var(--entry-size) 1fr var(--entry-size);
  width: 300px;
  height: 500px;
  background-color: var(--list-background-colour);
  border-radius: 20px;
  color: var(--list-font-colour);
}

#wrapper {
  display: grid;
  width: 100%;
  overflow-y: auto;
  gap: 2px;
  grid-auto-rows: var(--entry-size);
  scrollbar-color: rgba(255, 255, 255, 0.2) var(--list-background-colour);
}

.listentry {
  background-color: var(--entry-background-colour);
  border-radius: 5px;
  display: flex;
  width: 90%;
  margin: 0 auto;
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
