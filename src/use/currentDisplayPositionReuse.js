import { computed } from 'vue'

export default function (store, props, fullCommitment) {
  return {
    currentDisplayPosition: computed(() => {
      const index = store.state.decks[0].deck.findIndex((el) => {
        return el.id === fullCommitment.value.parent.id
      })
        
      
      // const index = getters.indexFromStateArray(
      //   fullCommitment.value.parent.id,
      //   store.state,
      //   'decks'
      // )
      const currentPage =
        store.state.decks[0].deck[index].commitments
      return currentPage.findIndex((el) => {
        return el.id === props.commitment.id
      })
    }),
  }
}
