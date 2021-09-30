import { computed } from 'vue'
import { getters } from '@/store/getters.js'

export default function (store, props) {
  return {
    currentDisplayPosition: computed(() => {
      const index = getters.indexFromStateArray(
        store.state.topParent.id,
        store.state,
        'currentCommitmentStackDisplayOrder'
      )
      const currentPage =
        store.state.currentCommitmentStackDisplayOrder[index].commitments
      return currentPage.findIndex((el) => {
        return el.id === props.commitment.id
      })
    }),
  }
}
