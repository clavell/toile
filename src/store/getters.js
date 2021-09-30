import { DateTime } from 'luxon'

export const getters = {
  //this returns an object so you need to DESTRUCTURE the object to get what you want!!!!
  topParentCommitments(state) {
    const parentIndex = getters.topParentIndex(state)
    //get the currently in topParent commitments
    let topParentCommitments = [
      ...state.currentCommitmentStackDisplayOrder[parentIndex].commitments,
    ]
    // .sort((a,b)=> a.rank - b.rank)
    return { topParentCommitments, parentIndex }
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
    return getters.indexFromStateArray(
      state.topParent.id,
      state,
      'currentCommitmentStackDisplayOrder'
    )
  },
}
