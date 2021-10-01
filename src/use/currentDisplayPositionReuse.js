import { computed } from 'vue'
import { getters } from '@/store/getters.js'

export default function (store, props, fullCommitment) {
  return {
    currentDisplayPosition: computed(() => {
      const index = getters.indexFromStateArray(
        fullCommitment.value.parent.id,
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
