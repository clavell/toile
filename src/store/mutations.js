import { getters } from '@/store/getters.js'
import { v4 as uuidv4 } from 'uuid'

import { movingEnum, originTypeEnum } from '@/use/enums.js'

// export `mutations` as a named export
export const mutations = {
  UPDATE_CURRENT_DATE(state, { newDate }) {
    state.currentDate = newDate
  },
  UPDATE_START_TIME(state, { newStartTime, _id }) {
    //find the correct schedule entry in the schedule array
    const index = getters.indexFromStateArray(_id, state, 'schedule')
    //set the value of the start time of this commitment to the new start time
    state.schedule[index].sessionStartTime = newStartTime
  },
  ADD_COMMITMENT(state, newCommitment) {
    state.commitments.push(newCommitment)
  },
  SET_AS_COMPLETE(state, _id) {
    //find the correct commitment in the commitments array
    const index = getters.indexFromStateArray(_id, state, 'commitments')
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
        return el.parent._id === state.topParent[0]._id
      })
      .sort((a, b) => a.rank - b.rank)
    //map them to the right format
    const commitmentsToAdd = commitmentsFromParent.map((el) => {
      return { _id: el._id, type: originTypeEnum.todoCard }
    })
    //set the
    state.decks[0] = {
      deck: [{ _id: state.topParent[0]._id, commitments: commitmentsToAdd }],
    }
  },

  SET_RANK(state, _id, newRank) {
    state.commitments[
      getters.indexFromStateArray(_id, state, 'commitments')
    ].rank = newRank
  },

  UPDATE_DISPLAY_LIST_POSITIONS(
    state,
    {
      commitment,
      newPosition,
      oldParent,
      newParent,
      newDeckIndex,
      oldDeckIndex,
    }
  ) {
    if (!newDeckIndex) newDeckIndex = 0
    if (!oldDeckIndex) oldDeckIndex = 0

    //get the commitments
    let { parentCommitments: oldParentCommitments } = JSON.parse(
      JSON.stringify(
        getters.parentCommitmentsByParent(state, oldParent, oldDeckIndex)
      )
    )
    //remove the original commitment
    // if(JSON.stringify(oldParent) === JSON.stringify(newParent)){
    const indexToRemove = oldParentCommitments.findIndex((el) => {
      return el._id === commitment._id
    })
    oldParentCommitments.splice(indexToRemove, 1)
    // // }
    //   //insert it at the new position
    var newParentCommitments
    if (JSON.stringify(oldParent) === JSON.stringify(newParent)) {
      newParentCommitments = JSON.parse(JSON.stringify(oldParentCommitments))
    } else {
      ;({ parentCommitments: newParentCommitments } = JSON.parse(
        JSON.stringify(
          getters.parentCommitmentsByParent(state, newParent, newDeckIndex)
        )
      ))
    }

    newParentCommitments.splice(newPosition, 0, commitment)

    // //set the state
    // //need the commitments stack arrayIndexnewDeckIndex
    let oldCommitmentsStack = JSON.parse(
      JSON.stringify(state.decks[oldDeckIndex].deck)
    )

    if (newDeckIndex == oldDeckIndex) {
      let newCommitmentsStack = oldCommitmentsStack.map((item) => {
        if (oldParent._id == newParent._id) {
          if (item._id == newParent._id) {
            return {
              ...item,
              commitments: newParentCommitments.map((el) => {
                return { _id: el._id, type: originTypeEnum.todoCard }
              }),
            }
          }
        } else {
          if (item._id == oldParent._id) {
            return { ...item, commitments: oldParentCommitments }
          }
          if (item._id == newParent._id) {
            return {
              ...item,
              commitments: newParentCommitments.map((el) => {
                return { _id: el._id, type: originTypeEnum.todoCard }
              }),
            }
          }
        }

        return item
      })
      state.decks[oldDeckIndex].deck = newCommitmentsStack
    } else {
      let updatedOldCommitmentsStack = oldCommitmentsStack.map((item) => {
        if (item._id == oldParent._id) {
          return {
            ...item,
            commitments: oldParentCommitments.map((el) => {
              return { _id: el._id, type: originTypeEnum.todoCard }
            }),
          }
        }
        return item
      })

      let newCommitmentsStack = JSON.parse(
        JSON.stringify(state.decks[newDeckIndex].deck)
      )

      let updatedNewCommitmentsStack = newCommitmentsStack.map((item) => {
        if (item._id == newParent._id) {
          return {
            ...item,
            commitments: newParentCommitments.map((el) => {
              return { _id: el._id, type: originTypeEnum.todoCard }
            }),
          }
        }
        return item
      })

      //get all the decks
      let decks = JSON.parse(JSON.stringify(state.decks))
      state.decks = decks.map((item, element) => {
        if (element == newDeckIndex) {
          return { ...item, deck: updatedNewCommitmentsStack }
        } else if (element == oldDeckIndex) {
          return { ...item, deck: updatedOldCommitmentsStack }
        }
        return item
      })
    }
    state.moving.deckIndex = newDeckIndex
    //update the parent in the moving object
    state.moving.parent = JSON.parse(JSON.stringify(newParent))
  },

  SET_RANKS(state, { oldParent, newParent, oldDeckIndex, newDeckIndex }) {
    if (!oldDeckIndex) oldDeckIndex = 0
    if (!newDeckIndex) newDeckIndex = 0

    //get all of the commitments
    let allCommitments = state.commitments
    //get the commitments in the old and new parents
    let { parentCommitments: oldParentCommitments } =
      getters.parentCommitmentsByParent(state, oldParent, oldDeckIndex)
    let { parentCommitments: newParentCommitments } =
      getters.parentCommitmentsByParent(state, newParent, newDeckIndex)
    //map from the commitments to a new array
    const newlyRankedCommitments = allCommitments.map((item) => {
      //if it's in the new commitments or if it is the moving commitment then look in the newCommitments array
      if (
        item.parent._id == newParent._id ||
        item._id == state.moving.original._id
      ) {
        let newRank = newParentCommitments.findIndex((el) => el._id == item._id)
        return { ...item, rank: newRank, parent: newParent }
      } else if (item.parent._id == oldParent._id) {
        let newRank = oldParentCommitments.findIndex((el) => el._id == item._id)
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
    let ancestor = getters.commitmentById2(state, topParent._id)
    stackIds.unshift(ancestor)

    while (ancestor.parent._id != null) {
      ancestor = getters.commitmentById2(state, ancestor.parent._id)
      stackIds.unshift(ancestor)
    }

    //add the children of each parent as commitments
    const newStack = stackIds.map((item) => {
      //get the commitments from the current parent
      const commitmentsFromParent = state.commitments
        .filter((el) => {
          return item._id === el.parent._id
        })
        .sort((a, b) => a.rank - b.rank)
      // add them as the sub array
      const commitmentsToAdd = commitmentsFromParent.map((el) => {
        return { _id: el._id, type: originTypeEnum.todoCard }
      })
      return { _id: item._id, commitments: commitmentsToAdd }
    })
    //set the stack to be the new stack
    state.decks[0] = { deck: newStack, _id: uuidv4() }
  },
  //set a particular deck as only being one parent deep
  SET_DECK_AS_SINGLE_PARENT(state, { deckIndex, commitment }) {
    //add the children of the desired parent as subcommitments
    const commitments = JSON.parse(JSON.stringify(state.commitments))
    // console.log(commitments)
    const commitmentsFromParent = commitments
      .filter((el) => {
        return commitment._id === el.parent._id
      })
      .sort((a, b) => a.rank - b.rank)

    // add them as the sub array
    const commitmentsToAdd = commitmentsFromParent.map((el) => {
      return { _id: el._id, type: originTypeEnum.todoCard }
    })
    let newStack = [{ _id: commitment._id, commitments: commitmentsToAdd }]
    //set the stack to be the new stack
    state.decks[deckIndex] = { deck: newStack, _id: uuidv4() }
    // console.log(uuidv4()) //uncomment this line to get some uuids in the console!
  },

  SET_TOP_PARENT(state, newTopParent, deckIndex) {
    state.topParent[deckIndex] = getters.commitmentById2(state, newTopParent._id)
  },

  SET_AS_MOVING(state, { parent, original, position, deckIndex }) {
    //parent is the parent within the current deck that the task is displayed in
    //original is the commitment as it was when picked up (not sure if it is needed)
    if (!deckIndex) deckIndex = 0
    state.moving = {
      parent,
      original,
      position,
      deckIndex,
      type: movingEnum.todoCard,
    }
  },

  SET_PREREQUISITE_CIRCLE_AS_MOVING(state, { original, position }) {
    state.moving = { original, position, type: movingEnum.prerequisiteCircle }
  },

  UPDATE_DRAG_POSITION(state, { e }) {
    let { clientX, clientY } = e
    let position = state.moving.position
    state.moving.position = {
      ...position,
      x: clientX - position.dragStartX,
      y: clientY - position.dragStartY,
    }
  },

  STOP_MOVING(state) {
    state.moving.position.isDragging = false
    state.moving.position.dragStartX = null
    state.moving.position.dragStartY = null
  },

  ADD_PREREQUISITE(state, { commitment, prerequisite }) {
    state.prerequisites.push({
      _id: uuidv4(),
      commitmentId: commitment._id,
      prerequisiteId: prerequisite._id,
    })
  },

  SET_SCHEDULE(state, { schedule }) {
    state.schedule = schedule
  },

  SET_PREVIOUS_REARRANGE(state, { previousRearrange }) {
    state.previousRearrange = previousRearrange
  },

  ADD_TO_DONT_SCHEDULE_ARRAY(state, { time }) {
    state.dontScheduleAt.push({ _id: uuidv4(), time })
  },

  REMOVE_FROM_DONT_SCHEDULE_ARRAY(state, { index }) {
    state.dontScheduleAt.splice(index, 1)
  },

  SET_CROULEUR(state, {_id}){
    state.crouleur._id = _id
  },

  SET_COMMITMENTS(state, {commitments}){
    state.commitments = commitments
  }
}
