import { DateTime } from 'luxon'

import { originTypeEnum } from '@/use/enums'

export const getters = {
  //this returns an object so you need to DESTRUCTURE the object to get what you want!!!!
  topParentCommitments(state) {
    const parentIndex = getters.topParentIndex(state)
    //get the currently in topParent commitments
    let topParentCommitments = [...state.decks[0].deck[parentIndex].commitments]
    // .sort((a,b)=> a.rank - b.rank)
    return { topParentCommitments, parentIndex }
  },
  subTasks(state, parent) {
    return state.commitments
      .filter((c) => {
        return c.parent.id === parent.id
      })
      .sort((a, b) => a.rank - b.rank)
  },
  parentCommitmentsByParent(state, parent, deckIndex) {
    //get the current stack
    if (!deckIndex) deckIndex = 0

    let currentStack = JSON.parse(JSON.stringify(state.decks[deckIndex].deck))
    //get the commitments for chosen parent
    let parentCommitments = JSON.parse(
      JSON.stringify(
        currentStack.filter((el) => el.id == parent.id)[0].commitments
      )
    )
    return { parentCommitments }
  },

  commitmentsOnCurrentDate(state) {
    //find all events on `currentDate`
    var currentDate = DateTime.fromFormat(state.currentDate, 'yyyyMMdd')

    return state.schedule.filter((scheduleEntry) => {
      if (!scheduleEntry.sessionStartTime) return false
      var scheduleEntryTime = DateTime.fromFormat(
        scheduleEntry.sessionStartTime,
        state.timeFormat
      )
      return currentDate.hasSame(scheduleEntryTime, 'day')
    })
  },
  commitmentsSortedByCompletedStatus(state) {
    let commitments = state.commitments
    return [...commitments].sort((a, b) => a.complete - b.complete)
  },
  commitmentById2(state, id) {
    return state.commitments.find((commitment) => commitment.id === id)
  },
  commitmentById: (state) => (id) => {
    return state.commitments.find((commitment) => commitment.id === id)
  },
  indexFromStateArray(id, state, stateAttribute) {
    //use this function to find an index from an array found in the state
    var index = state[stateAttribute].findIndex((el) => {
      return el.id === id
    })
    return index
  },
  topParentIndex(state) {
    // return getters.indexFromStateArray(
    //   state.topParent.id,
    //   state,
    //   'decks'
    // )
    return state.decks[0].deck.findIndex((el) => {
      return el.id === state.topParent[0].id
    })
  },
  ancestorsById(state, id) {
    let ancestors = []
    let commitment = this.commitmentById2(state, id)
    while (commitment.parent.id !== null) {
      commitment = this.commitmentById2(state, commitment.parent.id)
      ancestors.push(commitment.id)
    }
    return ancestors
  },

  prerequisitesById: (state, getters) => (id) => {
    const prereqs = state.prerequisites.filter((el) => el.commitmentId == id)
    if (prereqs.length === 0) return []

    return prereqs.map((prereq) => {
      const commitment = getters.commitmentById(prereq.prerequisiteId)
      return { ...commitment, type: originTypeEnum.prerequisite }
    })
  },
  //make one for testing. still not sure how to get around this.. very annoying :(
  prerequisitesById2(state, id) {
    const prereqs = state.prerequisites.filter((el) => el.commitmentId == id)
    if (prereqs.length === 0) return []

    return prereqs.map((prereq) => {
      const commitment = this.commitmentById2(state, prereq.prerequisiteId)
      return { ...commitment, type: originTypeEnum.prerequisite }
    })
  },
}
