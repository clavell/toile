import { createStore } from 'vuex'
import { DateTime } from 'luxon'

export default createStore({
  state: {
    timeFormat: 'yyyyMMddHHmm',
    currentDate: '20210620',
    commitments: [
      {
        id: '0766c8ed-4ab0-425a-8a88-02335ba51baa',
        entrytitle: 'set up vuex',
        startTime: '202106201330',
        duration: 45,
      },
      {
        id: 'b018ade0-a120-4d59-8a72-92b2c5072411',
        entrytitle: 'add dummy data to vuex',
        startTime: '202106200430',
        duration: 45,
      },
      {
        id: '601b550c-2c68-4cbe-85b6-a6a61563db1f',
        entrytitle: 'display dummy data in list view',
        startTime: '202106201530',
        duration: 45,
      },
      {
        id: '7ece7fc9-0a59-47b2-b87f-2e493bfb4d49',
        entrytitle: 'display dummy data in calendar view',
        startTime: '202106201630',
        duration: 45,
      },
    ],
  },
  getters: {
    commitmentsOnCurrentDate(state) {
      //find all events on `currentDate`
      var currentDate = DateTime.fromFormat(state.currentDate, 'yyyyMMdd')
      return state.commitments.filter((commitment) => {
        var commitmentTime = DateTime.fromFormat(
          commitment.startTime,
          state.timeFormat
        )
        return currentDate.hasSame(commitmentTime, 'day')
      })
    },
  },
  mutations: {
    UPDATE_STARTTIME(state, { newStartTime, id }) {
      //find the correct commitment in the commitments array
      var index = state.commitments.findIndex((el) => {
        return el.id === id
      })
      //set the value of the start time of this commitment to the new start time
      state.commitments[index].startTime = newStartTime
    },
  },
  actions: {
    updateStartTime({ commit }, { newStartTime, id }) {
      //could become more complex as api calls are added etc.
      console.log(id)
      console.log(newStartTime)
      if (newStartTime !== '') {
        commit('UPDATE_STARTTIME', { newStartTime, id })
      }
    },
  },
  // modules: {},
})
