import { blankSpace, removeBlankHelper } from '@/store/helpers.js'
import { getters } from '@/store/getters.js'

// export `mutations` as a named export
export const mutations = {
  UPDATE_START_TIME(state, { newStartTime, id }) {
    //find the correct commitment in the commitments array
    const index = getters.indexFromStateArray(id, state, 'commitments')
    //set the value of the start time of this commitment to the new start time
    state.commitments[index].startTime = newStartTime
  },
  ADD_COMMITMENT(state, newCommitment) {
    state.commitments.push(newCommitment)
  },
  SET_AS_COMPLETE(state, id) {
    //find the correct commitment in the commitments array
    const index = getters.indexFromStateArray(id, state, 'commitments')
    //set complete to be true
    state.commitments[index].complete = !state.commitments[index].complete
  },
  UPDATE_COMMITMENT(state, { newInfo, index }) {
    state.commitments[index] = newInfo
  },
  ADD_BLANK_SPACE_TO_LIST(state, commitmentPosition) {
    let { parentIndex, topParentCommitments } =
      getters.topParentCommitments(state)
    topParentCommitments.splice(commitmentPosition, 0, blankSpace)

    state.currentCommitmentStackDisplayOrder[parentIndex].commitments =
      topParentCommitments
    state.blankSpacePosition = commitmentPosition
  },
  REMOVE_BLANK_FROM_LIST(state) {
    let { parentIndex, topParentCommitments } = removeBlankHelper(state)
    //set this new topParentCommitments array to be the new displayArray at the top parent position
    state.currentCommitmentStackDisplayOrder[parentIndex].commitments =
      topParentCommitments
    //set the blank space position
    state.blankSpacePosition = null
  },

  MOVE_BLANK_SPACE_TO_NEW_POSITION(state, commitmentPosition) {
    //remove the blank space
    let { parentIndex, topParentCommitments } = removeBlankHelper(state)

    //add a blank at the new position
    topParentCommitments.splice(commitmentPosition, 0, blankSpace)

    //set this new topParentCommitments array to be the new displayArray at the top parent position
    state.currentCommitmentStackDisplayOrder[parentIndex].commitments =
      topParentCommitments

    //set the blank space position
    state.blankSpacePosition = topParentCommitments.findIndex(
      (el) => el.type === 'EmptyListSpace'
    )
  },

  UPDATE_DISPLAY(state) {
    const commitmentsFromParent = state.commitments
      .filter((el) => {
        return el.parent.id === state.topParent.id
      })
      .sort((a, b) => a.rank - b.rank)

    const commitmentsToAdd = commitmentsFromParent.map((el) => {
      return { id: el.id, type: 'TodoCard' }
    })
    state.currentCommitmentStackDisplayOrder = [
      { id: state.topParent.id, commitments: commitmentsToAdd },
    ]
  },

  SET_RANK(state, id, newRank) {
    state.commitments[
      getters.indexFromStateArray(id, state, 'commitments')
    ].rank = newRank
  },
  UPDATE_DISPLAY_LIST_POSITIONS(state, { commitment, newPosition, parent }) {
    //get the commitments
    let { parentCommitments } = getters.parentCommitmentsByParent2(state,parent)
    //remove the original commitment
    const indexToRemove = parentCommitments.findIndex((el) => {
      return el.id === commitment.id
    })
    parentCommitments.splice(indexToRemove, 1)
    //insert it at the new position
    parentCommitments.splice(newPosition, 0, commitment)
    //set the state
    //need the commitments stack array
    let newCommitmentsStack = state.currentCommitmentStackDisplayOrder.map((item) => {
      if(item.id == parent.id){
        return {...item, commitments: parentCommitments}
      }
      return item
    })

    state.currentCommitmentStackDisplayOrder = newCommitmentsStack
  },
  SET_RANKS(state, { parent }) {
    parent
    //get all of the commitments
    let allCommitments = state.commitments
    //get the commitments in the current parent display
    let { topParentCommitments } = getters.topParentCommitments(state)
    //map from the commitments to a new array
    const newlyRankedCommitments = allCommitments.map((item) => {
      if (item.parent.id == state.topParent.id) {
        const newRank = topParentCommitments.findIndex((el) => el.id == item.id)
        return { ...item, rank: newRank }
      }
      return item
    })
    state.commitments = newlyRankedCommitments
  },
  ADD_ANCESTORS_TO_STACK(state) {
    //get the top parent
    const topParent = state.topParent
    //create an empty array
    let stackIds = []
    // stackIds.unshift(topParent)2
    //iterate back through the ancestors and unshift them into the array (UPDATE_DISPLAY (above) should help)
    //maybe map from an initial array of just the IDs into an array with the commitments for each
    let ancestor = getters.commitmentById2(state, topParent.id)
    stackIds.unshift(ancestor)

    while (ancestor.parent.id != null) {
      ancestor = getters.commitmentById2(state, ancestor.parent.id)
      stackIds.unshift(ancestor)
    }

    //add the children of each parent as commitments
    const newStack = stackIds.map((item) => {
      //get the commitments from the current parent
      const commitmentsFromParent = state.commitments
        .filter((el) => {
          return item.id === el.parent.id
        })
        .sort((a, b) => a.rank - b.rank)
      // add them as the sub array
      const commitmentsToAdd = commitmentsFromParent.map((el) => {
        return { id: el.id, type: 'TodoCard' }
      })
      return { id: item.id, commitments: commitmentsToAdd }
    })
    //set the stack to be the new stack
    state.currentCommitmentStackDisplayOrder = newStack
  },
  SET_TOP_PARENT(state, newTopParent) {
    state.topParent = getters.commitmentById2(state, newTopParent.id)
  },
}
