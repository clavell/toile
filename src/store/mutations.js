import { blankSpace,findIndex,removeBlankHelper } from '@/store/helpers.js'
import {getters } from '@/store/getters.js'

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
    let {parentIndex,topParentCommitments} = getters.topParentCommitments(state)
    topParentCommitments.splice(commitmentPosition, 0, blankSpace)

    state.currentCommitmentStackDisplayOrder[parentIndex].commitments = topParentCommitments
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
    //remove the blank space
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
