import {computed} from 'vue'

export default function (store, commitment) {
  return {
    checked: computed({
      get: () => {
        return store.getters.commitmentById(commitment.id).complete
      },
      set: () => {
        store.dispatch('setAsComplete', commitment.id)
      },
    }),
  }
}