import { findTopParentIndex } from '@/store/helpers.js'
import { DateTime } from 'luxon'

export const getters = {
  topParentCommitments(state){
    const parentIndex = findTopParentIndex(state)
    //get the currently in topParent commitments
    let topParentCommitments = [...state.currentCommitmentStackDisplayOrder[parentIndex].commitments]
    return {topParentCommitments,parentIndex}
  },
  commitmentsOnCurrentDate(state) {
    //find all events on `currentDate`
    var currentDate = DateTime.fromFormat(state.currentDate, 'yyyyMMdd')
    
    return state.commitments.filter((commitment) => {
      if(!commitment.startTime) return false
      var commitmentTime = DateTime.fromFormat(
        commitment.startTime,
        state.timeFormat
      )
      return currentDate.hasSame(commitmentTime, 'day')
    })
  },
  commitmentsSortedByCompletedStatus(state) {
    let commitments = state.commitments
    return [...commitments].sort((a,b) => a.complete - b.complete) 
  },
  commitmentById: (state) => (id) => {
    return state.commitments.find(commitment => commitment.id === id)
  },

}