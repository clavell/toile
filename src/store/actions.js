import { v4 as uuidv4} from 'uuid'
import { findIndex } from '@/store/index.js'

export const actions = {
  updateStartTime({ commit }, { newStartTime, id }) {
    //could become more complex as api calls are added etc.
    if (newStartTime !== '') {
      commit('UPDATE_START_TIME', { newStartTime, id })
    }
  },
  addCommitment({ commit }, newCommitment) {
    if (newCommitment && newCommitment.entrytitle) {
      newCommitment.id = uuidv4()
      newCommitment.complete = false
      commit('ADD_COMMITMENT', newCommitment)
    }
  },
  setAsComplete( { commit }, id) {
      commit('SET_AS_COMPLETE',id)
  },
  updateCommitment({ state, commit }, { newCommitment, oldCommitment }) {
    if(JSON.stringify(newCommitment) !== JSON.stringify(oldCommitment))
    {
      const index = findIndex(oldCommitment.id, state)
      commit('UPDATE_COMMITMENT',{newCommitment, index})
    } 

  },
}