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
  UPDATE_DISPLAY,
  SET_RANK,
  UPDATE_DISPLAY_LIST_POSITIONS,
  SET_RANKS,
  ADD_ANCESTORS_TO_STACK,
  SET_TOP_PARENT,
  SET_DECK_AS_SINGLE_PARENT,
} = mutations

let state
let newCommitment
//this function should return the commitment at the old position based on the parent id
function setup_UPDATE_DISPLAY_LIST_test_reuse(
  oldPosition,
  newPosition,
  parent,
  deckIndex
) {
  let { parentCommitments } = getters.parentCommitmentsByParent(
    state,
    parent,
    deckIndex
  )
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

  it('updates the decks array', () => {
    //the entry in the commitmentsdisplayorder will be slightly different
    const expectedEntry = { id: newCommitment.id, type: 'TodoCard' }

    //add a new commitment with that parent id
    state.commitments.push(newCommitment)

    //run the mutation
    UPDATE_DISPLAY(state)
    //does the new display array contain the new element?

    const newTopParentDisplay = state.decks[0].deck.filter((el) => {
      return el.id === state.topParent[0].id && typeof el.id !== 'undefined'
    })[0].commitments
    expect(newTopParentDisplay[newTopParentDisplay.length - 1]).toStrictEqual(
      expectedEntry
    )
  })

  it('updates the decks array', () => {
    //the entry in the commitmentsdisplayorder will be slightly different
    const expectedEntry = { id: newCommitment.id, type: 'TodoCard' }

    //add a new commitment with that parent id
    state.commitments.push(newCommitment)

    //run the mutation
    UPDATE_DISPLAY(state)
    //does the new display array contain the new element?

    const newTopParentDisplay = state.decks[0].deck.filter((el) => {
      return el.id === state.topParent[0].id && typeof el.id !== 'undefined'
    })[0].commitments
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
    const parent = state.topParent[0]
    let { commitment, newPosition } = setup_UPDATE_DISPLAY_LIST_test_reuse(
      oldPosition,
      newPositionIdentifier,
      parent
    )

    //perform the mutation
    UPDATE_DISPLAY_LIST_POSITIONS(state, {
      commitment,
      newPosition,
      oldParent: parent,
      newParent: parent,
    })

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
    const parent = state.topParent[0]
    let { commitment, newPosition } = setup_UPDATE_DISPLAY_LIST_test_reuse(
      oldPosition,
      newPositionIdentifier,
      parent
    )

    //perform the mutation
    UPDATE_DISPLAY_LIST_POSITIONS(state, {
      commitment,
      newPosition,
      oldParent: parent,
      newParent: parent,
    })

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
    const parent = state.topParent[0]
    let { commitment, newPosition } = setup_UPDATE_DISPLAY_LIST_test_reuse(
      oldPosition,
      newPositionIdentifier,
      parent
    )
    //perform the mutation
    UPDATE_DISPLAY_LIST_POSITIONS(state, {
      commitment,
      newPosition,
      oldParent: parent,
      newParent: parent,
    })

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
    state.topParent[0] = { id: '91f281f4-b8dc-429a-8e21-6b9d72ce8428' }
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
    UPDATE_DISPLAY_LIST_POSITIONS(state, {
      commitment,
      newPosition,
      oldParent: parent,
      newParent: parent,
    })

    const newStack = state.decks[0].deck
    expect(JSON.stringify(newStack)).toBe(JSON.stringify(expectedStack))
  })

  it('updates the ranks of the commitments when they changed in the top parent', () => {
    //get the display array for the current parent
    //choose an id from the list to move
    const oldPosition = 2
    let { topParentCommitments } = getters.topParentCommitments(state)
    const commitment = topParentCommitments[oldPosition]
    //choose a place to move it to
    const newPosition = 1
    //modify the order of the elements
    //perform the mutation
    UPDATE_DISPLAY_LIST_POSITIONS(state, {
      commitment,
      newPosition,
      oldParent: state.topParent[0],
      newParent: state.topParent[0],
    })
    //get the list and expect the commitment id to be at the new position
    const { topParentCommitments: updatedTopParentCommitments } =
      getters.topParentCommitments(state)
    expect(
      updatedTopParentCommitments.findIndex((el) => {
        return el.id === commitment.id
      })
    ).toBe(newPosition)
    //now if the user were to let go we would want these to be recorded in the state
    SET_RANKS(state, {
      newParent: state.topParent[0],
      oldParent: state.topParent[0],
    })

    const fullCommitments = state.commitments.filter((el) => {
      return el.parent.id == state.topParent[0].id
    })
    expect(fullCommitments.filter((el) => el.id == commitment.id)[0].rank).toBe(
      newPosition
    )
  })

  it('updates the ranks of the commitments when they are in different parents of the same deck', () => {
    //get the display array for the current parent
    //choose an id from the list to move
    //move from "Make the store" the first entry to one level up to "set up vuex"

    //first make the deck
    SET_TOP_PARENT(
      state,
      {
        id: '91f281f4-b8dc-429a-8e21-6b9d72ce8428',
      },
      0
    )
    ADD_ANCESTORS_TO_STACK(state)
    const oldParent = {
      entrytitle: 'Make the Store',
      duedate: '21/07/2021',
      duration: 45,
      parent: { id: '0766c8ed-4ab0-425a-8a88-02335ba51baa' },
      id: '91f281f4-b8dc-429a-8e21-6b9d72ce8428',
      complete: false,
      rank: 2,
    }
    const oldPosition = 0
    let { parentCommitments: oldParentCommitments } =
      getters.parentCommitmentsByParent(state, oldParent)
    const commitment = oldParentCommitments[oldPosition]
    //after moving the commitment this one will be at the oldPosition
    const commitmentExpectedToBeInOldPosition =
      oldParentCommitments[oldPosition + 1]

    //choose a place to move it to (up one level)
    const newParent = {
      id: '0766c8ed-4ab0-425a-8a88-02335ba51baa',
      entrytitle: 'set up vuex',
      startTime: '202106201330',
      duration: 45,
      complete: false,
      parent: { id: 'a225c8ed-4ab0-425a-8a88-02335ba51baa' },
      rank: 0,
    }
    const newPosition = 1
    //set the moving object to be correct
    state.moving = { parent: newParent, original: commitment }

    let { parentCommitments: newParentCommitments } =
      getters.parentCommitmentsByParent(state, newParent)
    const commitmentmentToBeUnderNewPostion = newParentCommitments[newPosition]
    //modify the order of the elements
    //perform the mutation
    UPDATE_DISPLAY_LIST_POSITIONS(state, {
      commitment,
      newPosition,
      oldParent,
      newParent,
    })
    //get the list and expect the commitment id to be at the new position
    // const { parentCommitments: updatedOldParentCommitments } =
    //   getters.parentCommitmentsByParent(state,oldParent)

    const { parentCommitments: updatedNewParentCommitments } =
      getters.parentCommitmentsByParent(state, newParent)

    expect(
      updatedNewParentCommitments.findIndex((el) => {
        return el.id === commitment.id
      })
    ).toBe(newPosition)
    //now if the user were to let go we would want these to be recorded in the state
    SET_RANKS(state, { oldParent, newParent })

    const fullNewParentCommitments = state.commitments.filter((el) => {
      return el.parent.id == newParent.id
    })

    //expect the commitment that was in that place to be one down from where it was
    expect(
      fullNewParentCommitments.filter(
        (el) => el.id == commitmentmentToBeUnderNewPostion.id
      )[0].rank
    ).toBe(newPosition + 1)
    //expect the commitment that was below the moved commitment in the old position to be where the moved commitment used to be
    const fullOldParentCommitments = state.commitments.filter((el) => {
      return el.parent.id == oldParent.id
    })
    expect(
      fullOldParentCommitments.filter(
        (el) => el.id == commitmentExpectedToBeInOldPosition.id
      )[0].rank
    ).toBe(oldPosition)
    // expect the moved commitment to be in the new postion in the new parent
    expect(
      fullNewParentCommitments.filter((el) => el.id == commitment.id)[0].rank
    ).toBe(newPosition)
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
    state.topParent[0] = { id: '91f281f4-b8dc-429a-8e21-6b9d72ce8428' }
    ADD_ANCESTORS_TO_STACK(state)
    expect(JSON.stringify(state.decks[0].deck)).toBe(
      JSON.stringify(expectedStack)
    )
    // expect(state.decks).toBe(expectedStack)
  })

  it('adds the task to a parent other than the top one when being moved through the deck', () => {
    const expectedStack = [
      {
        id: 'a225c8ed-4ab0-425a-8a88-02335ba51baa',
        commitments: [
          { id: '0766c8ed-4ab0-425a-8a88-02335ba51baa', type: 'TodoCard' },
          // { id: 'b018ade0-a120-4d59-8a72-92b2c5072411', type: 'TodoCard' },//move this one
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
          { id: 'b018ade0-a120-4d59-8a72-92b2c5072411', type: 'TodoCard' }, //final spot
          { id: 'ebeab534-3364-4109-bd67-fe68bf6c5611', type: 'TodoCard' },
        ],
      },
    ]
    //create the desired stack
    state.topParent[0] = { id: '91f281f4-b8dc-429a-8e21-6b9d72ce8428' }
    ADD_ANCESTORS_TO_STACK(state)

    //choose an id from the list to move
    const oldPosition = 1
    const oldParent = {
      id: 'a225c8ed-4ab0-425a-8a88-02335ba51baa',
    }
    // //choose a place to move it to
    let newPositionIdentifier = 2
    const newParent = {
      id: '91f281f4-b8dc-429a-8e21-6b9d72ce8428',
    }
    //get the commitment based on the parent and which position it was at
    let { commitment, newPosition } = setup_UPDATE_DISPLAY_LIST_test_reuse(
      oldPosition,
      newPositionIdentifier,
      oldParent
    )
    // perform the mutation
    UPDATE_DISPLAY_LIST_POSITIONS(state, {
      commitment,
      newPosition,
      oldParent,
      newParent,
    })

    const newStack = state.decks[0].deck
    expect(JSON.stringify(newStack)).toBe(JSON.stringify(expectedStack))
  })

  it('moves task between decks that are one commitment deep', () => {
    //still need to update this
    const expectedDecks = [
      {
        deck: [
          {
            id: '91f281f4-b8dc-429a-8e21-6b9d72ce8428',
            commitments: [
              { id: 'e9902504-737d-4195-9168-355d40cdb5b8', type: 'TodoCard' },
              { id: 'd4de237f-1f1b-4a8c-a9f2-6a3466e24157', type: 'TodoCard' },
              { id: 'ebeab534-3364-4109-bd67-fe68bf6c5611', type: 'TodoCard' },
            ],
          },
        ],
        id: 'db32e04b-d336-4b67-8b47-a24328a3630b',
      },
      {
        deck: [
          {
            id: '0766c8ed-4ab0-425a-8a88-02335ba51baa',
            commitments: [
              // { id: '7c7f45b0-4ee1-438c-9884-6f481ca39006', type: 'TodoCard' },//this one is moving
              { id: '9f8161c0-5a9c-4eec-a9c8-19229fbfc8c9', type: 'TodoCard' },
              { id: '91f281f4-b8dc-429a-8e21-6b9d72ce8428', type: 'TodoCard' },
            ],
          },
        ],
        id: '5c3be2e4-3c32-4de7-abb6-b577caadc124',
      },
      {
        deck: [
          {
            id: '91f281f4-b8dc-429a-8e21-6b9d72ce8428',
            commitments: [
              { id: 'e9902504-737d-4195-9168-355d40cdb5b8', type: 'TodoCard' },
              { id: '7c7f45b0-4ee1-438c-9884-6f481ca39006', type: 'TodoCard' }, //to here
              { id: 'd4de237f-1f1b-4a8c-a9f2-6a3466e24157', type: 'TodoCard' },
              { id: 'ebeab534-3364-4109-bd67-fe68bf6c5611', type: 'TodoCard' },
            ],
          },
        ],
        id: '96ad71ce-e1b3-4859-815f-415fe199a67f',
      },
    ]

    // const deckParents = [
    //   { id: '91f281f4-b8dc-429a-8e21-6b9d72ce8428' },
    //   { id: '0766c8ed-4ab0-425a-8a88-02335ba51baa' },
    //   { id: '91f281f4-b8dc-429a-8e21-6b9d72ce8428' },
    // ]

    //create the desired stack
    SET_DECK_AS_SINGLE_PARENT(state, {
      commitment: { id: '91f281f4-b8dc-429a-8e21-6b9d72ce8428' },
      deckIndex: 0,
    })
    SET_DECK_AS_SINGLE_PARENT(state, {
      commitment: { id: '0766c8ed-4ab0-425a-8a88-02335ba51baa' },
      deckIndex: 1,
    })
    SET_DECK_AS_SINGLE_PARENT(state, {
      commitment: { id: '91f281f4-b8dc-429a-8e21-6b9d72ce8428' },
      deckIndex: 2,
    })

    //choose an id from the list to move
    const oldPosition = 0
    const oldParent = {
      id: '0766c8ed-4ab0-425a-8a88-02335ba51baa',
    }
    const oldDeckIndex = 1

    // //choose a place to move it to
    let newPositionIdentifier = 1
    const newParent = {
      id: '91f281f4-b8dc-429a-8e21-6b9d72ce8428',
    }
    const newDeckIndex = 2

    //get the commitment based on the parent and which position it was at
    let { commitment, newPosition } = setup_UPDATE_DISPLAY_LIST_test_reuse(
      oldPosition,
      newPositionIdentifier,
      oldParent,
      oldDeckIndex
    )
    // // perform the mutation
    UPDATE_DISPLAY_LIST_POSITIONS(state, {
      commitment,
      newPosition,
      oldParent,
      newParent,
      oldDeckIndex,
      newDeckIndex,
    })

  
    expect(JSON.stringify(state.decks[0].deck)).toBe(JSON.stringify(expectedDecks[0].deck))
    expect(JSON.stringify(state.decks[1].deck)).toBe(JSON.stringify(expectedDecks[1].deck))
    expect(JSON.stringify(state.decks[2].deck)).toBe(JSON.stringify(expectedDecks[2].deck))

  })

  it('sets the zeroth deck as the desired deck', () => {
    const commitment = { id: '91f281f4-b8dc-429a-8e21-6b9d72ce8428' }
    const deckIndex = 0
    const expectedStack = [
      {
        ...commitment,
        commitments: [
          { id: 'e9902504-737d-4195-9168-355d40cdb5b8', type: 'TodoCard' },
          { id: 'd4de237f-1f1b-4a8c-a9f2-6a3466e24157', type: 'TodoCard' },
          { id: 'ebeab534-3364-4109-bd67-fe68bf6c5611', type: 'TodoCard' },
        ],
      },
    ]
    //set the commitment
    SET_DECK_AS_SINGLE_PARENT(state, { deckIndex, commitment })
    expect(JSON.stringify(state.decks[deckIndex].deck)).toBe(
      JSON.stringify(expectedStack)
    )
    expect(state.decks[deckIndex].id).toBeDefined()
  })
})
