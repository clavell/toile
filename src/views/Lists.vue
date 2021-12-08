<template>
  <div class="Lists">
    <Calendar />
    <Deck
      v-for="index in deckIndices"
      :key="decks[index]._id"
      :deckIndex="index"
    />
    <MovingTodoCard class="todo" />
  </div>
</template>

<script>
// @ is an alias to /src
import Deck from '@/components/Deck.vue'
import Calendar from '@/components/Calendar.vue'
import MovingTodoCard from '@/components/MovingTodoCard.vue'
import { useStore } from 'vuex'
import { computed } from 'vue'
export default {
  name: 'Lists',
  components: {
    Deck,
    Calendar,
    MovingTodoCard,
  },
  setup() {
    const store = useStore()
    store.dispatch('setCrouleur')
    store.dispatch('getCommitments')

    //   store.commit('SET_DECK_AS_SINGLE_PARENT', {
    //   commitment: { _id: '91f281f4-b8dc-429a-8e21-6b9d72ce8428' },
    //   deckIndex: 0,
    // })
    // store.commit('SET_DECK_AS_SINGLE_PARENT', {
    //   commitment: { _id: '0766c8ed-4ab0-425a-8a88-02335ba51baa' },
    //   deckIndex: 1,
    // })
    // store.commit('SET_DECK_AS_SINGLE_PARENT', {
    //   commitment: { _id: '91f281f4-b8dc-429a-8e21-6b9d72ce8428' },
    //   deckIndex: 2,
    // })

    // store.dispatch('setSchedule')
    // console.log(store.state.schedule)
    // store.commit('ADD_ANCESTORS_TO_STACK')
    const decks = computed(() => store.state.decks)
    const deckIndices = computed(() => {
      let deckIndices = Array(decks.value.length)
        .fill()
        .map((element, index) => index)
      return deckIndices
    })

    return { decks, deckIndices }
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
