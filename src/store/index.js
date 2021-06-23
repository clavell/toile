import { createStore } from 'vuex'
import { DateTime } from 'luxon'

export default createStore({
  state: {
    timeFormat: 'yyyyMMddHHmm',
          currentDate: '20210620',
    commitments: [
      { entrytitle: 'set up vuex', startTime: '202106201330', duration: 45 },
      {
        entrytitle: 'add dummy data to vuex',
        startTime: '202106201430',
        duration: 45,
      },
      {
        entrytitle: 'display dummy data in list view',
        startTime: '202106201530',
        duration: 45,
      },
      {
        entrytitle: 'display dummy data in calendar view',
        startTime: '202106201630',
        duration: 45,
      },
    ],
  },
  getters: {
    commitmentsCount(state) {
      return state.commitments
    },
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
  mutations: {},
  actions: {},
  // modules: {},
})
