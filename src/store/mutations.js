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

  UPDATE_DISPLAY(state) {
    //find the commitments from a particular parent
    const commitmentsFromParent = state.commitments
      .filter((el) => {
        return el.parent.id === state.topParent[0].id
      })
      .sort((a, b) => a.rank - b.rank)
    //map them to the right format
    const commitmentsToAdd = commitmentsFromParent.map((el) => {
      return { id: el.id, type: 'TodoCard' }
    })
    //set the 
    state.decks[0] = {deck:[
      { id: state.topParent[0].id, commitments: commitmentsToAdd },
    ]}
  },

  SET_RANK(state, id, newRank) {
    state.commitments[
      getters.indexFromStateArray(id, state, 'commitments')
    ].rank = newRank
  },
  
  UPDATE_DISPLAY_LIST_POSITIONS(state, { commitment, newPosition, oldParent, newParent }) {
    commitment
    newPosition
    newParent
    //get the commitments
    let { parentCommitments:oldParentCommitments } = JSON.parse(JSON.stringify(getters.parentCommitmentsByParent(state,oldParent)))
    //remove the original commitment
    // if(JSON.stringify(oldParent) === JSON.stringify(newParent)){
      const indexToRemove = oldParentCommitments.findIndex((el) => {
        return el.id === commitment.id
      })
      oldParentCommitments.splice(indexToRemove, 1)
    // // }
    //   //insert it at the new position
    var newParentCommitments
    if(JSON.stringify(oldParent) === JSON.stringify(newParent)){
      newParentCommitments = JSON.parse(JSON.stringify(oldParentCommitments))
    } else{
      ({parentCommitments:newParentCommitments} = JSON.parse(JSON.stringify(getters.parentCommitmentsByParent(state,newParent))))
    }
      
      newParentCommitments.splice(newPosition, 0, commitment)

    // //set the state
    // //need the commitments stack array
    let oldCommitmentsStack = JSON.parse(JSON.stringify(state.decks[0].deck))
    let newCommitmentsStack = oldCommitmentsStack.map((item) => {
      if(oldParent.id == newParent.id) {
        if(item.id == newParent.id){
          return {...item, commitments: newParentCommitments.map((el) => {
            return {id:el.id, type:"TodoCard"}
          })}
        }
      } else{
        if(item.id == oldParent.id){
          return {...item, commitments: oldParentCommitments}
        }
        if(item.id == newParent.id){
          return {...item, commitments: newParentCommitments.map((el) => {
            return {id:el.id, type:"TodoCard"}
          })}
        }
      }

      
      return item
    })
    state.moving.parent = JSON.parse(JSON.stringify(newParent))
    state.decks[0].deck = newCommitmentsStack
  },

  SET_RANKS(state, { parent }) {
    parent
    //get all of the commitments
    let allCommitments = state.commitments
    //get the commitments in the current parent display
    let { topParentCommitments } = getters.topParentCommitments(state)
    //map from the commitments to a new array
    const newlyRankedCommitments = allCommitments.map((item) => {
      if (item.parent.id == state.topParent[0].id) {
        const newRank = topParentCommitments.findIndex((el) => el.id == item.id)
        return { ...item, rank: newRank }
      }
      return item
    })
    state.commitments = newlyRankedCommitments
  },

  ADD_ANCESTORS_TO_STACK(state) {
    //get the top parent
    const topParent = state.topParent[0]
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
    state.decks[0].deck = newStack
  },

  SET_TOP_PARENT(state, newTopParent) {
    state.topParent[0] = getters.commitmentById2(state, newTopParent.id)
  },

  SET_AS_MOVING(state, {parent, original,position}) {
    //parent is the parent within the current deck that the task is displayed in
    //original is the commitment as it was when picked up (not sure if it is needed)
    state.moving = {parent,original, position}
  },

  UPDATE_DRAG_POSITION(state, {e}) {
    let { clientX, clientY } = e
    let position = state.moving.position
    state.moving.position = {
      ...position, 
      x:clientX - position.dragStartX,
      y:clientY - position.dragStartY
    }
  },

  STOP_MOVING(state,) {
    state.moving.position.dragging = false
    state.moving.position.dragStartX = null
    state.moving.position.dragStartY = null
  }

}
