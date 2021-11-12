import { v4 as uuidv4 } from 'uuid'
import { getters } from '@/store/getters.js'

import { currentDateChangeEnum } from '@/use/enums.js'

import { DateTime } from 'luxon'

import {
  createSchedule,
  createScheduleSessions,
  generateScheduleOrder,
} from '@/store/helpers.js'

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
  setAsComplete({ commit }, id) {
    commit('SET_AS_COMPLETE', id)
  },
  updateCommitment({ state, commit }, { newCommitment, oldCommitment }) {
    if (JSON.stringify(newCommitment) !== JSON.stringify(oldCommitment)) {
      const index = getters.indexFromStateArray(
        oldCommitment.id,
        state,
        'commitments'
      )
      commit('UPDATE_COMMITMENT', { newCommitment, index })
    }
  },
  addPrerequisite({ state, commit }, { commitment, prerequisite }) {
    let fullCommitment = getters.commitmentById2(state, commitment.id)
    let commitmentAncestors = getters.ancestorsById(state, commitment.id)
    let prerequisiteAncestors = getters.ancestorsById(state, prerequisite.id)
    let safeToAdd = !(
      commitmentAncestors.includes(prerequisite.id) ||
      prerequisiteAncestors.includes(commitment.id) ||
      fullCommitment.parent.id == prerequisite.id ||
      prerequisite.parent.id == fullCommitment.id ||
      prerequisite.id == fullCommitment.id
    )
    if (safeToAdd) {
      commit('ADD_PREREQUISITE', { commitment: fullCommitment, prerequisite })
    }
  },

  resetDecks({ state, commit }) {
    for (let i = 0; i < state.decks.length; i++) {
      const commitment = JSON.parse(JSON.stringify(state.decks[i].deck[0]))
      commit('SET_DECK_AS_SINGLE_PARENT', { deckIndex: i, commitment })
    }
  },

  setCurrentDate({ state, commit }, { instruction }) {
    const currentDateObject = DateTime.fromFormat(
      state.currentDate,
      state.dateFormat
    )
    switch (instruction) {
      //if the type of change is FORWARD commit the change with a date one GREATER than previous date
      case currentDateChangeEnum.forward:
        commit('UPDATE_CURRENT_DATE', {
          newDate: currentDateObject
            .plus({ day: 1 })
            .toFormat(state.dateFormat),
        })
        break
      //if the type of change is BACK commit the change with a date one LESS than previous date
      case currentDateChangeEnum.back:
        commit('UPDATE_CURRENT_DATE', {
          newDate: currentDateObject
            .minus({ day: 1 })
            .toFormat(state.dateFormat),
        })
        break
      case currentDateChangeEnum.today:
        commit('UPDATE_CURRENT_DATE', {
          newDate: DateTime.now().toFormat(state.dateFormat),
        })
        break
    }
  },

  setSchedule({ state, commit }, { rearrange }) {
    const timeOfCallToSchedule = DateTime.now().toFormat(state.timeFormat)

    const orderedItemsToSchedule = generateScheduleOrder({
      state,
      commit,
      rearrange,
    })
    const orderedSessions = createScheduleSessions({
      orderedItemsToSchedule,
      sessionLength: state.sessionLength,
    })
    const schedule = createSchedule({
      state,
      orderedSessions,
      timeOfCallToSchedule,
    })

    commit('SET_SCHEDULE', { schedule })
  },
  removeFromDontScheduleAtArray({ state, commit }, { time }) {
    const index = state.dontScheduleAt.findIndex((el) => {
      return el.time == time
    })
    commit('REMOVE_FROM_DONT_SCHEDULE_ARRAY', { index })
  },
  // updateDisplayOrder({state, commit},{commitment, newPosition}){

  // }

  // updateRanks({ state,commit },{  })
}
