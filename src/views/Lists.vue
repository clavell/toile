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
import allCrouleursQuery from '@/graphql/allCrouleurs.query.gql'
import allCommitmentsQuery from '@/graphql/allCommitments.query.gql'

export default {
  name: 'Lists',
  components: {
    Deck,
    Calendar,
    MovingTodoCard,
  },
  setup() {
    const store = useStore()
    store.dispatch('setCrouleur', { allCrouleursQuery })
    store.dispatch('getCommitments', { allCommitmentsQuery })

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
  margin-left: 2em;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2em;
  color: var(--list-font-colour);
}
</style>
