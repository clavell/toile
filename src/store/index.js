import { createStore } from 'vuex'
import { actions } from '@/store/actions.js'
import { mutations } from '@/store/mutations.js'
import { getters } from '@/store/getters.js'

import { generateState } from '@/store/stategenerator.js'

const state = generateState()

export default createStore({
  state,
  getters,
  mutations,
  actions,
  strict: process.env.NODE_ENV !== 'production',
})
