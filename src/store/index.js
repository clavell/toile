import { DateTime } from 'luxon'
import { createStore } from 'vuex'
import { actions } from './actions.js'
import { generateState } from '@/store/stategenerator.js'


const state = generateState()
const blankSpace = {
    id:"",
    type:'EmptyListSpace'
  }

// export `mutations` as a named export
export const mutations = {
  UPDATE_START_TIME(state, { newStartTime, id }) {
    //find the correct commitment in the commitments array
    const index = findIndex(id,state,'commitments')
    //set the value of the start time of this commitment to the new start time
    state.commitments[index].startTime = newStartTime
  },
  ADD_COMMITMENT(state, newCommitment) {
    state.commitments.push(newCommitment)
  },
  SET_AS_COMPLETE(state, id) {
    //find the correct commitment in the commitments array
    const index = findIndex(id,state,'commitments')
    //set complete to be true
    state.commitments[index].complete = !state.commitments[index].complete
  },
  UPDATE_COMMITMENT(state,  {newInfo, index}){
    state.commitments[index] = newInfo
  },
  ADD_BLANK_SPACE_TO_LIST(state, commitmentPosition){
    const parentIndex = findIndex(state.topParent.id,state, 'currentCommitmentStackDisplayOrder')
    state.currentCommitmentStackDisplayOrder[parentIndex].commitments.splice(commitmentPosition, 0, blankSpace)
    state.blankSpacePosition=commitmentPosition
  },
  REMOVE_BLANK_FROM_LIST(state){
    let {parentIndex, topParentCommitments} = removeBlankHelper(state)
      //set this new topParentCommitments array to be the new displayArray at the top parent position
      state.currentCommitmentStackDisplayOrder[parentIndex].commitments = topParentCommitments
      //set the blank space position
      state.blankSpacePosition=null
  },

  MOVE_BLANK_SPACE_TO_NEW_POSITION(state, commitmentPosition) {
    let {parentIndex, topParentCommitments} = removeBlankHelper(state)
    //add a blank at the new position
    topParentCommitments.splice(commitmentPosition, 0, blankSpace)
    //set this new topParentCommitments array to be the new displayArray at the top parent position
    state.currentCommitmentStackDisplayOrder[parentIndex].commitments = topParentCommitments
    //set the blank space position
    state.blankSpacePosition=topParentCommitments.findIndex((el) => el.type === 'EmptyListSpace')
  },

  UPDATE_DISPLAY(state) {

    const commitmentsFromParent = state.commitments.filter((el) => {
      return el.parent.id === state.topParent.id
    }).sort((a,b)=> a.rank - b.rank)

    const commitmentsToAdd = commitmentsFromParent.map((el) => {
      return {id: el.id, type:'TodoCard'}
    })
    state.currentCommitmentStackDisplayOrder = [{id:state.topParent.id, commitments:commitmentsToAdd}]

  },

  SET_RANK(state, id,newRank){
    state.commitments[findIndex(id,state,'commitments')].rank = newRank
  },


}
function removeBlankHelper(state){
  const parentIndex = findIndex(state.topParent.id,state, 'currentCommitmentStackDisplayOrder')
    //get the currently in topParent commitments
    let topParentCommitments = [...state.currentCommitmentStackDisplayOrder[parentIndex].commitments]
    //set the type of the former blank space to old
    let oldBlankPosition = topParentCommitments.findIndex((el) => el.type === 'EmptyListSpace')
    topParentCommitments.splice(oldBlankPosition, 1, {...blankSpace, type:'old'})
    //remove the blank from the old position
    oldBlankPosition = topParentCommitments.findIndex((el) => el.type === 'old')
    topParentCommitments.splice(oldBlankPosition,1)
    return {parentIndex,topParentCommitments,}
}


export function findIndex(id,state,stateAttribute){
  //use this function to find an index an an array found in the state
  var index = state[stateAttribute].findIndex((el) => {
    return el.id === id
  })
  return index
}


export const getters = {
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

export default createStore({
  state,
  getters,
  mutations,
  actions,
  strict: process.env.NODE_ENV !== 'production',
})
