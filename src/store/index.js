import { createStore } from 'vuex'

export default createStore({
  state: {
    commitments: [
      'set up vuex',
      'add dummy data to vuex',
      'display dummy data in list view',
      'display dummy data in calendar view',
    ],
  },
  getters: {
    commitmentsCount(state) {
      return state.commitments
    },
  },
  mutations: {},
  actions: {},
  // modules: {},
})
