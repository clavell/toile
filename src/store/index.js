import { createStore as vuexCreateStore } from 'vuex'
import { actions } from '@/store/actions.js'
import { mutations } from '@/store/mutations.js'
import { getters } from '@/store/getters.js'

import { generateState } from '@/store/stategenerator.js'

const state = generateState()
const defaultStoreConfig = {
  state,
  getters,
  mutations,
  actions,
  strict: process.env.NODE_ENV !== 'production',
}

const defaultOverrides = {}

export function createStore(storeOverrides = defaultOverrides){
  const store = vuexCreateStore({
    ...defaultStoreConfig,
    ...storeOverrides,
  })
  return store
}

export default createStore()
