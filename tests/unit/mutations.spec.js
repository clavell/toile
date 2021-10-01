import { mutations } from '@/store/mutations.js'
import { getters } from '@/store/getters.js'
import {
  generateNewCommitment,
  generateAlteredCommitment,
  generateState,
} from '@/store/stategenerator.js'
const {
  ADD_COMMITMENT,
  SET_AS_COMPLETE,
  UPDATE_START_TIME,
  UPDATE_COMMITMENT,
  ADD_BLANK_SPACE_TO_LIST,
  MOVE_BLANK_SPACE_TO_NEW_POSITION,
  UPDATE_DISPLAY,
  SET_RANK,
  UPDATE_DISPLAY_LIST_POSITIONS,
  SET_RANKS,
  ADD_ANCESTORS_TO_STACK,
} = mutations

let state
let newCommitment
let parentIndex

function setup_UPDATE_DISPLAY_LIST_test_reuse(
  oldPosition,
  newPosition,
  parent
) {
  let {parentCommitments} = getters.parentCommitmentsByParent2(state, parent)
  //get a commitment to move
  const commitment = parentCommitments[oldPosition]
  if (newPosition == -1) {
    newPosition = parentCommitments.length - 1
  }

  return { commitment, newPosition }
}

describe('mutations', () => {
  beforeEach(() => {
    state = generateState()
    newCommitment = generateNewCommitment()
    parentIndex = getters.indexFromStateArray(
      state.topParent.id,
      state,
      'currentCommitmentStackDisplayOrder'
    )
  })

  it('adds item to store', () => {
    ADD_COMMITMENT(state, newCommitment)
    expect(state.commitments[state.commitments.length - 1]).toBe(newCommitment)
  })

  it('sets item as complete', () => {
    //have the commitment already be in the state object
    state.commitments.push(newCommitment)
    SET_AS_COMPLETE(state, newCommitment.id)
    expect(state.commitments[state.commitments.length - 1].complete).toBe(true)
  })

  it('sets item as not complete', () => {
    // put a complete commitment into the state
    newCommitment.complete = true
    state.commitments.push(newCommitment)

    //run the mutation
    SET_AS_COMPLETE(state, newCommitment.id)
    expect(state.commitments[state.commitments.length - 1].complete).toBe(false)
  })

  it('updates start time', () => {
    //have the commitment already be in the state object
    state.commitments.push(newCommitment)

    const id = newCommitment.id
    const newStartTime = '202506201630'

    UPDATE_START_TIME(state, { newStartTime, id })

    expect(state.commitments[state.commitments.length - 1].startTime).toBe(
      newStartTime
    )
  })

  it('updates the chosen commitment ', () => {
    // ensure the new commitment is in the array
    state.commitments.push(newCommitment)

    //new data to overwrite the new commitment

    const edittedCommitment = generateAlteredCommitment()

    const index = getters.indexFromStateArray(
      newCommitment.id,
      state,
      'commitments'
    )
    UPDATE_COMMITMENT(state, { newInfo: edittedCommitment, index: index })

    //expect there to be only one of the editted commitment
    expect(
      state.commitments.filter((el) => el.id === edittedCommitment.id)
        .length === 1
    )

    //expect the updated commitment to be in the same place as the old one
    expect(state.commitments[index]).toBe(edittedCommitment)
  })

  it('adds a blank space to the currentDisplayOrder', () => {
    const rankToAddBlank = 2

    ADD_BLANK_SPACE_TO_LIST(state, rankToAddBlank)

    expect(
      state.currentCommitmentStackDisplayOrder[parentIndex].commitments[
        rankToAddBlank
      ].type
    ).toBe('EmptyListSpace')

    expect(state.blankSpacePosition).toBe(rankToAddBlank)
  })

  it('moves the blank space to the new spot', () => {
    const rankToAddBlank = 2
    const rankToMoveBlank = 4

    ADD_BLANK_SPACE_TO_LIST(state, rankToAddBlank)

    expect(
      state.currentCommitmentStackDisplayOrder[parentIndex].commitments[
        rankToAddBlank
      ].type
    ).toBe('EmptyListSpace')

    MOVE_BLANK_SPACE_TO_NEW_POSITION(state, rankToMoveBlank)

    expect(
      state.currentCommitmentStackDisplayOrder[parentIndex].commitments[
        rankToMoveBlank
      ].type
    ).toBe('EmptyListSpace')
    expect(state.blankSpacePosition).toBe(rankToMoveBlank)
  })

  it('updates the currentCommitmentStackDisplayOrder array', () => {
    //the entry in the commitmentsdisplayorder will be slightly different
    const expectedEntry = { id: newCommitment.id, type: 'TodoCard' }

    //add a new commitment with that parent id
    state.commitments.push(newCommitment)

    //run the mutation
    UPDATE_DISPLAY(state)
    //does the new display array contain the new element?
    const newTopParentDisplay = state.currentCommitmentStackDisplayOrder.filter(
      (el) => {
        return el.id === state.topParent.id
      }
    )[0].commitments
    expect(newTopParentDisplay[newTopParentDisplay.length - 1]).toStrictEqual(
      expectedEntry
    )
  })

  it('sets the rank of the commitment', () => {
    //choose a new rank to set
    const newRank = 10
    const commitmentPosition = 1
    const id = state.commitments[commitmentPosition].id

    //set the rank
    SET_RANK(state, id, newRank)

    //expect it to be change in the state
    expect(state.commitments[commitmentPosition].rank).toBe(newRank)
  })

  //UPDATE_DISPLAY_LIST
  it('updates the display list order when the new position is below the old one', () => {
    //choose an id from the list to move
    const oldPosition = 0
    //choose a place to move it to
    let newPositionIdentifier = 2
    const parent = state.topParent
    let { commitment, newPosition } = setup_UPDATE_DISPLAY_LIST_test_reuse(
      oldPosition,
      newPositionIdentifier,
      parent
    )
    //perform the mutation
    UPDATE_DISPLAY_LIST_POSITIONS(state, { commitment, newPosition, parent })

    //get the list and expect the commitment id to be at the new position
    const { topParentCommitments: updatedTopParentCommitments } =
      getters.topParentCommitments(state)
    expect(
      updatedTopParentCommitments.findIndex((el) => {
        return el.id === commitment.id
      })
    ).toBe(newPosition)
  })

  it('updates the display list order when the new position is above the old one (and first in the list)', () => {
    //choose an id from the list to move
    const oldPosition = 2
    //choose a place to move it to
    let newPositionIdentifier = 0
    const parent = state.topParent
    let { commitment, newPosition } = setup_UPDATE_DISPLAY_LIST_test_reuse(
      oldPosition,
      newPositionIdentifier,
      parent
    )

    //perform the mutation
    UPDATE_DISPLAY_LIST_POSITIONS(state, { commitment, newPosition, parent })

    //get the list and expect the commitment id to be at the new position
    const { topParentCommitments: updatedTopParentCommitments } =
      getters.topParentCommitments(state)
    expect(
      updatedTopParentCommitments.findIndex((el) => {
        return el.id === commitment.id
      })
    ).toBe(newPosition)
  })

  it('updates the display list order when the new position is at the end of the list', () => {
    //choose an id from the list to move
    const oldPosition = 2
    //choose a place to move it to
    let newPositionIdentifier = -1
    const parent = state.topParent
    let { commitment, newPosition } = setup_UPDATE_DISPLAY_LIST_test_reuse(
      oldPosition,
      newPositionIdentifier,
      parent
    )
    //perform the mutation
    UPDATE_DISPLAY_LIST_POSITIONS(state, { commitment, newPosition, parent })

    //get the list and expect the commitment id to be at the new position
    const { topParentCommitments: updatedTopParentCommitments } =
      getters.topParentCommitments(state)
    expect(
      updatedTopParentCommitments.findIndex((el) => {
        return el.id === commitment.id
      })
    ).toBe(newPosition)
  })

  it('updates the display list order when the list is not the top parent', () => {
    
    // console.log(JSON.stringify(state.currentCommitmentStackDisplayOrder))
    const expectedStack = [
      {
        id: 'a225c8ed-4ab0-425a-8a88-02335ba51baa',
        commitments: [
          { id: '0766c8ed-4ab0-425a-8a88-02335ba51baa', type: 'TodoCard' },
          { id: '601b550c-2c68-4cbe-85b6-a6a61563db1f', type: 'TodoCard' },
          { id: 'b018ade0-a120-4d59-8a72-92b2c5072411', type: 'TodoCard' },
          { id: '7ece7fc9-0a59-47b2-b87f-2e493bfb4d49', type: 'TodoCard' },
        ],
      },
      {
        id: '0766c8ed-4ab0-425a-8a88-02335ba51baa',
        commitments: [
          { id: '7c7f45b0-4ee1-438c-9884-6f481ca39006', type: 'TodoCard' },
          { id: '9f8161c0-5a9c-4eec-a9c8-19229fbfc8c9', type: 'TodoCard' },
          { id: '91f281f4-b8dc-429a-8e21-6b9d72ce8428', type: 'TodoCard' },
        ],
      },
      {
        id: '91f281f4-b8dc-429a-8e21-6b9d72ce8428',
        commitments: [
          { id: 'e9902504-737d-4195-9168-355d40cdb5b8', type: 'TodoCard' },
          { id: 'd4de237f-1f1b-4a8c-a9f2-6a3466e24157', type: 'TodoCard' },
          { id: 'ebeab534-3364-4109-bd67-fe68bf6c5611', type: 'TodoCard' },
        ],
      },
    ]
    //create the desired stack
    state.topParent = { id: '91f281f4-b8dc-429a-8e21-6b9d72ce8428' }
    ADD_ANCESTORS_TO_STACK(state)

    //choose an id from the list to move
    const oldPosition = 2
    // //choose a place to move it to
    let newPositionIdentifier = 1
    const parent = {
      id: 'a225c8ed-4ab0-425a-8a88-02335ba51baa',
    }
    //get the commitment based on the parent and which position it was at
    let { commitment, newPosition } = setup_UPDATE_DISPLAY_LIST_test_reuse(
      oldPosition,
      newPositionIdentifier,
      parent
    )
    // perform the mutation
    UPDATE_DISPLAY_LIST_POSITIONS(state, { commitment, newPosition, parent,})

    const newStack = state.currentCommitmentStackDisplayOrder
    expect(JSON.stringify(newStack)).toBe(JSON.stringify(expectedStack))
  })

  it('updates the ranks of the commitments', () => {
    //get the display array for the current parent
    //choose an id from the list to move
    const oldPosition = 2
    let { topParentCommitments } = getters.topParentCommitments(state)
    const commitment = topParentCommitments[oldPosition]
    //choose a place to move it to
    const newPosition = 1
    //modify the order of the elements
    //perform the mutation
    UPDATE_DISPLAY_LIST_POSITIONS(state, { commitment, newPosition,  })
    //get the list and expect the commitment id to be at the new position
    const { topParentCommitments: updatedTopParentCommitments } =
      getters.topParentCommitments(state)
    expect(
      updatedTopParentCommitments.findIndex((el) => {
        return el.id === commitment.id
      })
    ).toBe(newPosition)
    //now if the user were to let go we would want these to be recorded in the state
    SET_RANKS(state, { parent: state.topParent })

    const fullCommitments = state.commitments.filter((el) => {
      return el.parent.id == state.topParent.id
    })
    expect(fullCommitments.filter((el) => el.id == commitment.id)[0].rank).toBe(
      newPosition
    )
  })

  it('adds ancestors to stack (2 ancestors)', () => {
    const expectedStack = [
      {
        id: 'a225c8ed-4ab0-425a-8a88-02335ba51baa',
        commitments: [
          { id: '0766c8ed-4ab0-425a-8a88-02335ba51baa', type: 'TodoCard' },
          { id: 'b018ade0-a120-4d59-8a72-92b2c5072411', type: 'TodoCard' },
          { id: '601b550c-2c68-4cbe-85b6-a6a61563db1f', type: 'TodoCard' },
          { id: '7ece7fc9-0a59-47b2-b87f-2e493bfb4d49', type: 'TodoCard' },
        ],
      },
      {
        id: '0766c8ed-4ab0-425a-8a88-02335ba51baa',
        commitments: [
          { id: '7c7f45b0-4ee1-438c-9884-6f481ca39006', type: 'TodoCard' },
          { id: '9f8161c0-5a9c-4eec-a9c8-19229fbfc8c9', type: 'TodoCard' },
          { id: '91f281f4-b8dc-429a-8e21-6b9d72ce8428', type: 'TodoCard' },
        ],
      },
      {
        id: '91f281f4-b8dc-429a-8e21-6b9d72ce8428',
        commitments: [
          { id: 'e9902504-737d-4195-9168-355d40cdb5b8', type: 'TodoCard' },
          { id: 'd4de237f-1f1b-4a8c-a9f2-6a3466e24157', type: 'TodoCard' },
          { id: 'ebeab534-3364-4109-bd67-fe68bf6c5611', type: 'TodoCard' },
        ],
      },
    ]
    //set the top parent
    state.topParent = { id: '91f281f4-b8dc-429a-8e21-6b9d72ce8428' }
    ADD_ANCESTORS_TO_STACK(state)
    expect(JSON.stringify(state.currentCommitmentStackDisplayOrder)).toBe(
      JSON.stringify(expectedStack)
    )
    // expect(state.currentCommitmentStackDisplayOrder).toBe(expectedStack)
  })
})
