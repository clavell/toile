<template>
  <div class="Lists">
    <Calendar />
    <List v-for="list in lists" :key="list.id" :listInfo="list" />
    <MovingTodoCard />
  </div>
</template>

<script>
// @ is an alias to /src
import List from '@/components/List.vue'
import Calendar from '@/components/Calendar.vue'
import MovingTodoCard from '@/components/MovingTodoCard.vue'
import { useStore } from 'vuex'
import { computed } from 'vue'
export default {
  name: 'Lists',
  components: {
    List,
    Calendar,
    MovingTodoCard
  },
  setup() {
    const store = useStore()
    store.commit('SET_TOP_PARENT', {
      id: '91f281f4-b8dc-429a-8e21-6b9d72ce8428',
    })
    store.commit('ADD_ANCESTORS_TO_STACK')
    const lists = computed(() => store.state.decks[0].deck)

    return { lists }
  },
}
</script>

<style>
.Lists {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  color: var(--list-font-colour);
}
</style>
