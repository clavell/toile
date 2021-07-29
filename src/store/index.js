import { createStore } from 'vuex'
import { DateTime } from 'luxon'
import { v4 as uuidv4} from 'uuid'

export const state = {
  timeFormat: 'yyyyMMddHHmm',
  currentDate: '20210620',
  commitments: [
    {
      id: '0766c8ed-4ab0-425a-8a88-02335ba51baa',
      entrytitle: 'set up vuex',
      startTime: '202106201330',
      duration: 45,
      complete: false,
    },
    {
      id: 'b018ade0-a120-4d59-8a72-92b2c5072411',
      entrytitle: 'add dummy data to vuex',
      startTime: '202106200430',
      duration: 45,
      complete: false,
    },
    {
      id: '601b550c-2c68-4cbe-85b6-a6a61563db1f',
      entrytitle: 'display dummy data in list view',
      startTime: '202106201530',
      duration: 45,
      complete: false,
    },
    {
      id: '7ece7fc9-0a59-47b2-b87f-2e493bfb4d49',
      entrytitle: 'display dummy data in calendar view',
      startTime: '202106201630',
      duration: 45,
      complete: false,
    },
  ],
}

// export `mutations` as a named export
export const mutations = {
  UPDATE_START_TIME(state, { newStartTime, id }) {
    //find the correct commitment in the commitments array
    const index = findIndex(id)
    //set the value of the start time of this commitment to the new start time
    state.commitments[index].startTime = newStartTime
  },
  ADD_COMMITMENT(state, newCommitment) {
    state.commitments.push(newCommitment)
  },
  SET_AS_COMPLETE(state, id) {
    //find the correct commitment in the commitments array
    const index = findIndex(id)
    //set complete to be true
    state.commitments[index].complete = !state.commitments[index].complete
  }
}

function findIndex(id){
  var index = state.commitments.findIndex((el) => {
    return el.id === id
  })
  return index
}

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
  }
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
