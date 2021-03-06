import { getters } from '@/store/getters.js'

import { currentDateChangeEnum } from '@/use/enums.js'

import { DateTime } from 'luxon'

// import { ApolloClient, createHttpLink, InMemoryCache, } from '@apollo/client'
// import { setContext } from '@apollo/client/link/context';

import { useQuery, useResult } from '@vue/apollo-composable'

import {
  createSchedule,
  createScheduleSessions,
  generateScheduleOrder,
} from '@/store/helpers.js'

export const actions = {
  setCrouleur({ commit }, { allCrouleursQuery }) {
    try {
      const { result, onResult } = useQuery(allCrouleursQuery)
      const crouleurs = useResult(result, [], (data) => data.allCrouleurs.data)

      onResult(() => {
        // console.log(crouleurs)
        commit('SET_CROULEUR', { _id: crouleurs.value[0]._id })
      })
    } catch (err) {
      console.log(err)
    }
  },

  getCommitments({ commit, state }, { allCommitmentsQuery }) {
    try {
      const { result, onResult } = useQuery(allCommitmentsQuery)
      // console.log(result)
      const commitments = useResult(
        result,
        [],
        (data) => data.allCommitments.data
      )
      // console.log(commitments.value)

      onResult(() => {
        // console.log(result)
        const mappedCommitments = commitments.value.map((el) => {
          if (el.parent !== null) {
            return { ...el, parent: el.parent.link }
          }
          return { ...el, parent: { _id: null } }
        })
        commit('SET_COMMITMENTS', { commitments: mappedCommitments })
        // console.log(state)

        commit('SET_DECK_AS_SINGLE_PARENT', {
          commitment: {
            _id: state.initializing
              ? state.commitments[0]._id
              : state.decks[0].deck[0]._id,
          },
          deckIndex: 0,
        })
        commit('SET_DECK_AS_SINGLE_PARENT', {
          commitment: {
            _id: state.initializing
              ? state.commitments[0]._id
              : state.decks[1].deck[0]._id,
          },
          deckIndex: 1,
        })
        commit('SET_DECK_AS_SINGLE_PARENT', {
          commitment: {
            _id: state.initializing
              ? state.commitments[0]._id
              : state.decks[2].deck[0]._id,
          },
          deckIndex: 2,
        })
        commit('SET_INITIALIZING', { setting: false })
      })
    } catch (err) {
      console.log(err)
    }
  },

  updateStartTime({ commit }, { newStartTime, _id }) {
    //could become more complex as api calls are added etc.
    if (newStartTime !== '') {
      commit('UPDATE_START_TIME', { newStartTime, _id })
    }
  },

  addCommitment({ state }, { newCommitment, createCommitment, mixpanel }) {
    if (newCommitment && newCommitment.entrytitle) {
      // newCommitment._id = uuidv4()
      console.log('adding commitment')
      // newCommitment.complete = false
      // commit('ADD_COMMITMENT', newCommitment)
      const parent = getters.commitmentById2(state, newCommitment.parent._id)

      createCommitment({
        commitment: {
          entrytitle: newCommitment.entrytitle,
          parent: {
            connect: parent.selfAsParent._id,
          },
          complete: false,
          selfAsParent: {
            create: {
              crouleur: {
                connect: state.crouleur._id,
              },
            },
          },
          duedate: newCommitment.duedate,
          duration: parseInt(newCommitment.duration),
          crouleur: {
            connect: state.crouleur._id,
          },
        },
      })
      mixpanel.track('added task', { user: state.crouleur._id })
    }
  },

  setAsComplete({ commit }, _id) {
    commit('SET_AS_COMPLETE', _id)
  },

  updateCommitment({ state }, { updatedCommitment, updateCommitment }) {
    const originalCommitment = getters.commitmentById2(
      state,
      updatedCommitment._id
    )

    if (
      JSON.stringify(originalCommitment) !== JSON.stringify(updatedCommitment)
    ) {
      const parent = getters.commitmentById2(
        state,
        updatedCommitment.parent._id
      )

      updateCommitment({
        id: updatedCommitment._id,
        commitmentData: {
          entrytitle: updatedCommitment.entrytitle,
          parent: {
            connect: parent.selfAsParent._id,
          },
          complete: false,
          selfAsParent: {
            connect: updatedCommitment.selfAsParent._id,
          },
          duedate: updatedCommitment.duedate,
          duration: parseInt(updatedCommitment.duration),
          crouleur: {
            connect: state.crouleur._id,
          },
        },
      })
    }
  },
  // updateCommitment({ state, commit }, { newCommitment, oldCommitment }) {
  //   if (JSON.stringify(newCommitment) !== JSON.stringify(oldCommitment)) {
  //     const index = getters.indexFromStateArray(
  //       oldCommitment._id,
  //       state,
  //       'commitments'
  //     )
  //     commit('UPDATE_COMMITMENT', { newCommitment, index })
  //   }
  // },

  deleteCommitment({ state }, { commitmentToDelete, deleteCommitment }) {
    state
    console.log(commitmentToDelete)
    deleteCommitment(commitmentToDelete)
  },

  addPrerequisite({ state, commit }, { commitment, prerequisite, mixpanel }) {
    let fullCommitment = getters.commitmentById2(state, commitment._id)
    let commitmentAncestors = getters.ancestorsById(state, commitment._id)
    let prerequisiteAncestors = getters.ancestorsById(state, prerequisite._id)
    let safeToAdd = !(
      commitmentAncestors.includes(prerequisite._id) ||
      prerequisiteAncestors.includes(commitment._id) ||
      fullCommitment.parent._id == prerequisite._id ||
      prerequisite.parent._id == fullCommitment._id ||
      prerequisite._id == fullCommitment._id
    )
    if (safeToAdd) {
      commit('ADD_PREREQUISITE', { commitment: fullCommitment, prerequisite })
      mixpanel.track('successful prerequisite setting', {
        user: state.crouleur._id,
      })
    } else {
      mixpanel.track('prerequisiste setting rejected', {
        user: state.crouleur._id,
      })
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
