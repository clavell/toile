import { computed } from 'vue'
import {findIndex} from '@/store/index.js'


export default function (store, props) {
  return {
    currentDisplayPosition: computed(() => {
      const index = findIndex(store.state.topParent.id,store.state, 'currentCommitmentStackDisplayOrder')
      const currentPage = store.state.currentCommitmentStackDisplayOrder[index].commitments
      return currentPage.findIndex((el) => {
        return el.id === props.commitment.id
      })
    }),
  }
}
