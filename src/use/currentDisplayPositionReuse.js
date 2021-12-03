import { computed } from 'vue'

export default function ({ store, props }) {
  return {
    currentDisplayPosition: computed(() => {
      const index = store.state.decks[props.deckIndex].deck.findIndex((el) => {
        return el._id === props.parentCommitment._id
      })

      // const index = getters.indexFromStateArray(
      //   fullCommitment.value.parent._id,
      //   store.state,
      //   'decks'
      // )
      const currentPage =
        store.state.decks[props.deckIndex].deck[index].commitments
      return currentPage.findIndex((el) => {
        return el._id === props.commitment._id
      })
    }),
  }
}
