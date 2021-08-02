import { DateTime } from 'luxon'
import { createStore } from 'vuex'
import { actions } from './actions.js'
import { generateState } from '@/store/stategenerator.js'


const state = generateState()

// export `mutations` as a named export
export const mutations = {
  UPDATE_START_TIME(state, { newStartTime, id }) {
    //find the correct commitment in the commitments array
    const index = findIndex(id,state)
    //set the value of the start time of this commitment to the new start time
    state.commitments[index].startTime = newStartTime
  },
  ADD_COMMITMENT(state, newCommitment) {
    state.commitments.push(newCommitment)
  },
  SET_AS_COMPLETE(state, id) {
    //find the correct commitment in the commitments array
    const index = findIndex(id,state)
    //set complete to be true
    state.commitments[index].complete = !state.commitments[index].complete
  },
  UPDATE_COMMITMENT(state,  {newInfo, index}){
    state.commitments[index] = newInfo
  }
}

export function findIndex(id,state){
  var index = state.commitments.findIndex((el) => {
    return el.id === id
  })
  return index
}


export const getters = {
  commitmentsOnCurrentDate(state) {
    //find all events on `currentDate`
    var currentDate = DateTime.fromFormat(state.currentDate, 'yyyyMMdd')
    
    return state.commitments.filter((commitment) => {
      if(!commitment.startTime) return false
      var commitmentTime = DateTime.fromFormat(
        commitment.startTime,
        state.timeFormat
      )
      return currentDate.hasSame(commitmentTime, 'day')
    })
  },
  commitmentsSortedByCompletedStatus(state) {
    let commitments = state.commitments
    return [...commitments].sort((a,b) => a.complete - b.complete) 
  },
  commitmentById: (state) => (id) => {
    return state.commitments.find(commitment => commitment.id === id)
  }
}

export default createStore({
  state,
  getters,
  mutations,
  actions,
  strict: process.env.NODE_ENV !== 'production',
})
