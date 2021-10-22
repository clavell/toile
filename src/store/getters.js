import { DateTime } from 'luxon'

export const getters = {
  //this returns an object so you need to DESTRUCTURE the object to get what you want!!!!
  topParentCommitments(state) {
    const parentIndex = getters.topParentIndex(state)
    //get the currently in topParent commitments
    let topParentCommitments = [...state.decks[0].deck[parentIndex].commitments]
    // .sort((a,b)=> a.rank - b.rank)
    return { topParentCommitments, parentIndex }
  },
  parentCommitmentsByParent(state, parent, deckIndex) {
    //get the current stack
    if (!deckIndex) deckIndex = 0

    let currentStack = state.decks[deckIndex].deck
    //get the commitments for chosen parent
    let parentCommitments = currentStack.filter((el) => el.id == parent.id)[0]
      .commitments
    return { parentCommitments }
  },

  commitmentsOnCurrentDate(state) {
    //find all events on `currentDate`
    var currentDate = DateTime.fromFormat(state.currentDate, 'yyyyMMdd')

    return state.commitments.filter((commitment) => {
      if (!commitment.startTime) return false
      var commitmentTime = DateTime.fromFormat(
        commitment.startTime,
        state.timeFormat
      )
      return currentDate.hasSame(commitmentTime, 'day')
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
    //use this function to find an index an an array found in the state
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
}
