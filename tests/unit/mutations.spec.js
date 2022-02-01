import { mutations } from '@/store/mutations.js'
import { getters } from '@/store/getters.js'
import { originTypeEnum } from '@/use/enums.js'
import {
  generateCommitments,
  generateNewCommitment,
  generateAlteredCommitment,
  generateState,
  generateDummySchedule,
  generateDummyDecks,
  generateDummyAlteredDecks,
  generateDecks_CommitmentMovedBetweenDecks,
} from '@/store/stategenerator.js'
const {
  UPDATE_CURRENT_DATE,
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
//this function should return the commitment at the old position based on the parent _id
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
    state.commitments = generateCommitments()
    newCommitment = generateNewCommitment()
  })

  it('adds item to store', () => {
    ADD_COMMITMENT(state, newCommitment)
    expect(state.commitments[state.commitments.length - 1]).toBe(newCommitment)
  })

  it('sets item as complete', () => {
    //have the commitment already be in the state object
    state.commitments.push(newCommitment)
    SET_AS_COMPLETE(state, newCommitment._id)
    expect(state.commitments[state.commitments.length - 1].complete).toBe(true)
  })

  it('sets item as not complete', () => {
    // put a complete commitment into the state
    newCommitment.complete = true
    state.commitments.push(newCommitment)

    //run the mutation
    SET_AS_COMPLETE(state, newCommitment._id)
    expect(state.commitments[state.commitments.length - 1].complete).toBe(false)
  })

  it('updates start time', () => {
    // first generate the schedule and put it in the state
    state.schedule = generateDummySchedule()

    // let's change the first schedule entry
    const entryIndex = 0
    const newStartTime = '202506201630'
    const expectedScheduleEntry = {
      ...state.schedule[entryIndex],
      sessionStartTime: newStartTime,
    }

    UPDATE_START_TIME(state, { newStartTime, _id: expectedScheduleEntry._id })

    expect(state.schedule[entryIndex]).toStrictEqual(expectedScheduleEntry)
  })

  it('updates the chosen commitment ', () => {
    // ensure the new commitment is in the array
    state.commitments.push(newCommitment)

    //new data to overwrite the new commitment

    const edittedCommitment = generateAlteredCommitment()

    const index = getters.indexFromStateArray(
      newCommitment._id,
      state,
      'commitments'
    )
    UPDATE_COMMITMENT(state, { newInfo: edittedCommitment, index: index })

    //expect there to be only one of the editted commitment
    expect(
      state.commitments.filter((el) => el._id === edittedCommitment._id)
        .length === 1
    )

    //expect the updated commitment to be in the same place as the old one
    expect(state.commitments[index]).toBe(edittedCommitment)
  })

  it.skip('updates the decks array', () => {
    //tests a currently unused mutation
    //the entry in the commitmentsdisplayorder will be slightly different
    const expectedEntry = {
      _id: newCommitment._id,
      type: originTypeEnum.todoCard,
    }

    //add a new commitment with that parent _id
    state.commitments.push(newCommitment)

    //run the mutation
    UPDATE_DISPLAY(state)
    //does the new display array contain the new element?

    const newTopParentDisplay = state.decks[0].deck.filter((el) => {
      return el._id === state.topParent[0]._id && typeof el._id !== 'undefined'
    })[0].commitments
    expect(newTopParentDisplay[newTopParentDisplay.length - 1]).toStrictEqual(
      expectedEntry
    )
  })

  it('sets the rank of the commitment', () => {
    //choose a new rank to set
    const newRank = 10
    const commitmentPosition = 1
    const _id = state.commitments[commitmentPosition]._id

    //set the rank
    SET_RANK(state, _id, newRank)

    //expect it to be change in the state
    expect(state.commitments[commitmentPosition].rank).toBe(newRank)
  })

  //UPDATE_DISPLAY_LIST
  it('updates the display list order when the new position is below the old one', () => {

    state.decks = generateDummyDecks()
    //choose an _id from the list to move
    const oldPosition = 0
    //choose a place to move it to
    let newPositionIdentifier = 2
    const parent = state.decks[0].deck[0]

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

      //expect the commitment _id to be at the new position
      expect(
        state.decks[0].deck[0].commitments.findIndex((el) => {
          return el._id === commitment._id
        })
      ).toBe(newPosition)
  })

  it('updates the display list order when the new position is above the old one (and first in the list)', () => {

    state.decks = generateDummyDecks()
    //choose an _id from the list to move
    const oldPosition = 2
    //choose a place to move it to
    let newPositionIdentifier = 0
    const parent = state.decks[0].deck[0]
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

    //get the list and expect the commitment _id to be at the new position
   
    expect(
      state.decks[0].deck[0].commitments.findIndex((el) => {
        return el._id === commitment._id
      })
    ).toBe(newPosition)
  })

  it('updates the display list order when the new position is at the end of the list', () => {

    state.decks = generateDummyDecks()

    //choose an _id from the list to move
    const oldPosition = 2
    //choose a place to move it to
    let newPositionIdentifier = -1
    const parent = state.decks[0].deck[0]
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

    //expect the commitment _id to be at the new position
   
    expect(
      state.decks[0].deck[0].commitments.findIndex((el) => {
        return el._id === commitment._id
      })
    ).toBe(newPosition)
  })

  it.skip('updates the display list order when the list is not the top parent', () => {
    //skipped because currently irrelevant
    //will need to update the stack.. need a expectedStack Generator function maybe?
    const expectedStack = [
      {
        _id: 'a225c8ed-4ab0-425a-8a88-02335ba51baa',
        commitments: [
          {
            _id: '0766c8ed-4ab0-425a-8a88-02335ba51baa',
            type: originTypeEnum.todoCard,
          },
          {
            _id: '601b550c-2c68-4cbe-85b6-a6a61563db1f',
            type: originTypeEnum.todoCard,
          },
          {
            _id: 'b018ade0-a120-4d59-8a72-92b2c5072411',
            type: originTypeEnum.todoCard,
          },
          {
            _id: '7ece7fc9-0a59-47b2-b87f-2e493bfb4d49',
            type: originTypeEnum.todoCard,
          },
        ],
      },
      {
        _id: '0766c8ed-4ab0-425a-8a88-02335ba51baa',
        commitments: [
          {
            _id: '7c7f45b0-4ee1-438c-9884-6f481ca39006',
            type: originTypeEnum.todoCard,
          },
          {
            _id: '9f8161c0-5a9c-4eec-a9c8-19229fbfc8c9',
            type: originTypeEnum.todoCard,
          },
          {
            _id: '91f281f4-b8dc-429a-8e21-6b9d72ce8428',
            type: originTypeEnum.todoCard,
          },
        ],
      },
      {
        _id: '91f281f4-b8dc-429a-8e21-6b9d72ce8428',
        commitments: [
          {
            _id: 'e9902504-737d-4195-9168-355d40cdb5b8',
            type: originTypeEnum.todoCard,
          },
          {
            _id: 'd4de237f-1f1b-4a8c-a9f2-6a3466e24157',
            type: originTypeEnum.todoCard,
          },
          {
            _id: 'ebeab534-3364-4109-bd67-fe68bf6c5611',
            type: originTypeEnum.todoCard,
          },
        ],
      },
    ]
    //create the desired stack
    state.topParent[0] = { _id: '91f281f4-b8dc-429a-8e21-6b9d72ce8428' }
    ADD_ANCESTORS_TO_STACK(state)

    //choose an _id from the list to move
    const oldPosition = 2
    // //choose a place to move it to
    let newPositionIdentifier = 1
    const parent = {
      _id: 'a225c8ed-4ab0-425a-8a88-02335ba51baa',
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

  it.skip('updates the ranks of the commitments when they changed in the top parent', () => {
    // not currently using the top parent for moving commitments
    //get the display array for the current parent
    //choose an _id from the list to move
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
    //get the list and expect the commitment _id to be at the new position
    const { topParentCommitments: updatedTopParentCommitments } =
      getters.topParentCommitments(state)
    expect(
      updatedTopParentCommitments.findIndex((el) => {
        return el._id === commitment._id
      })
    ).toBe(newPosition)
    //now if the user were to let go we would want these to be recorded in the state
    SET_RANKS(state, {
      newParent: state.topParent[0],
      oldParent: state.topParent[0],
    })

    const fullCommitments = state.commitments.filter((el) => {
      return el.parent._id == state.topParent[0]._id
    })
    expect(
      fullCommitments.filter((el) => el._id == commitment._id)[0].rank
    ).toBe(newPosition)
  })

  it.skip('updates the ranks of the commitments when they are in different parents of the same deck', () => {
    //this test is currently irrelevant for functioning of the app
    //get the display array for the current parent
    //choose an _id from the list to move
    //move from "Make the store" the first entry to one level up to "set up vuex"

    //first make the deck
    SET_TOP_PARENT(
      state,
      {
        _id: '91f281f4-b8dc-429a-8e21-6b9d72ce8428',
      },
      0
    )
    ADD_ANCESTORS_TO_STACK(state)
    const oldParent = {
      entrytitle: 'Make the Store',
      duedate: '21/07/2021',
      duration: 45,
      parent: { _id: '0766c8ed-4ab0-425a-8a88-02335ba51baa' },
      _id: '91f281f4-b8dc-429a-8e21-6b9d72ce8428',
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
      _id: '0766c8ed-4ab0-425a-8a88-02335ba51baa',
      entrytitle: 'set up vuex',
      startTime: '202106201330',
      duration: 45,
      complete: false,
      parent: { _id: 'a225c8ed-4ab0-425a-8a88-02335ba51baa' },
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
    //get the list and expect the commitment _id to be at the new position
    // const { parentCommitments: updatedOldParentCommitments } =
    //   getters.parentCommitmentsByParent(state,oldParent)

    const { parentCommitments: updatedNewParentCommitments } =
      getters.parentCommitmentsByParent(state, newParent)

    expect(
      updatedNewParentCommitments.findIndex((el) => {
        return el._id === commitment._id
      })
    ).toBe(newPosition)
    //now if the user were to let go we would want these to be recorded in the state
    SET_RANKS(state, { oldParent, newParent })

    const fullNewParentCommitments = state.commitments.filter((el) => {
      return el.parent._id == newParent._id
    })

    //expect the commitment that was in that place to be one down from where it was
    expect(
      fullNewParentCommitments.filter(
        (el) => el._id == commitmentmentToBeUnderNewPostion._id
      )[0].rank
    ).toBe(newPosition + 1)
    //expect the commitment that was below the moved commitment in the old position to be where the moved commitment used to be
    const fullOldParentCommitments = state.commitments.filter((el) => {
      return el.parent._id == oldParent._id
    })
    expect(
      fullOldParentCommitments.filter(
        (el) => el._id == commitmentExpectedToBeInOldPosition._id
      )[0].rank
    ).toBe(oldPosition)
    // expect the moved commitment to be in the new postion in the new parent
    expect(
      fullNewParentCommitments.filter((el) => el._id == commitment._id)[0].rank
    ).toBe(newPosition)
  })

  it.skip('adds ancestors to stack (2 ancestors)', () => {
    //currently irrelevant
    const expectedStack = [
      {
        _id: 'a225c8ed-4ab0-425a-8a88-02335ba51baa',
        commitments: [
          {
            _id: '0766c8ed-4ab0-425a-8a88-02335ba51baa',
            type: originTypeEnum.todoCard,
          },
          {
            _id: 'b018ade0-a120-4d59-8a72-92b2c5072411',
            type: originTypeEnum.todoCard,
          },
          {
            _id: '601b550c-2c68-4cbe-85b6-a6a61563db1f',
            type: originTypeEnum.todoCard,
          },
          {
            _id: '7ece7fc9-0a59-47b2-b87f-2e493bfb4d49',
            type: originTypeEnum.todoCard,
          },
        ],
      },
      {
        _id: '0766c8ed-4ab0-425a-8a88-02335ba51baa',
        commitments: [
          {
            _id: '7c7f45b0-4ee1-438c-9884-6f481ca39006',
            type: originTypeEnum.todoCard,
          },
          {
            _id: '9f8161c0-5a9c-4eec-a9c8-19229fbfc8c9',
            type: originTypeEnum.todoCard,
          },
          {
            _id: '91f281f4-b8dc-429a-8e21-6b9d72ce8428',
            type: originTypeEnum.todoCard,
          },
        ],
      },
      {
        _id: '91f281f4-b8dc-429a-8e21-6b9d72ce8428',
        commitments: [
          {
            _id: 'e9902504-737d-4195-9168-355d40cdb5b8',
            type: originTypeEnum.todoCard,
          },
          {
            _id: 'd4de237f-1f1b-4a8c-a9f2-6a3466e24157',
            type: originTypeEnum.todoCard,
          },
          {
            _id: 'ebeab534-3364-4109-bd67-fe68bf6c5611',
            type: originTypeEnum.todoCard,
          },
        ],
      },
    ]
    //set the top parent
    state.topParent[0] = { _id: '91f281f4-b8dc-429a-8e21-6b9d72ce8428' }
    ADD_ANCESTORS_TO_STACK(state)
    expect(JSON.stringify(state.decks[0].deck)).toBe(
      JSON.stringify(expectedStack)
    )
    // expect(state.decks).toBe(expectedStack)
  })

  it.skip('adds the task to a parent other than the top one when being moved through the deck', () => {
    //this needs to be rewritten and not currently relevant
    const expectedStack = [
      {
        _id: 'a225c8ed-4ab0-425a-8a88-02335ba51baa',
        commitments: [
          {
            _id: '0766c8ed-4ab0-425a-8a88-02335ba51baa',
            type: originTypeEnum.todoCard,
          },
          // { _id: 'b018ade0-a120-4d59-8a72-92b2c5072411', type: originTypeEnum.todoCard },//move this one
          {
            _id: '601b550c-2c68-4cbe-85b6-a6a61563db1f',
            type: originTypeEnum.todoCard,
          },
          {
            _id: '7ece7fc9-0a59-47b2-b87f-2e493bfb4d49',
            type: originTypeEnum.todoCard,
          },
        ],
      },
      {
        _id: '0766c8ed-4ab0-425a-8a88-02335ba51baa',
        commitments: [
          {
            _id: '7c7f45b0-4ee1-438c-9884-6f481ca39006',
            type: originTypeEnum.todoCard,
          },
          {
            _id: '9f8161c0-5a9c-4eec-a9c8-19229fbfc8c9',
            type: originTypeEnum.todoCard,
          },
          {
            _id: '91f281f4-b8dc-429a-8e21-6b9d72ce8428',
            type: originTypeEnum.todoCard,
          },
        ],
      },
      {
        _id: '91f281f4-b8dc-429a-8e21-6b9d72ce8428',
        commitments: [
          {
            _id: 'e9902504-737d-4195-9168-355d40cdb5b8',
            type: originTypeEnum.todoCard,
          },
          {
            _id: 'd4de237f-1f1b-4a8c-a9f2-6a3466e24157',
            type: originTypeEnum.todoCard,
          },
          {
            _id: 'b018ade0-a120-4d59-8a72-92b2c5072411',
            type: originTypeEnum.todoCard,
          }, //final spot
          {
            _id: 'ebeab534-3364-4109-bd67-fe68bf6c5611',
            type: originTypeEnum.todoCard,
          },
        ],
      },
    ]
    //create the desired stack
    state.topParent[0] = { _id: '91f281f4-b8dc-429a-8e21-6b9d72ce8428' }
    ADD_ANCESTORS_TO_STACK(state)

    //choose an _id from the list to move
    const oldPosition = 1
    const oldParent = {
      _id: 'a225c8ed-4ab0-425a-8a88-02335ba51baa',
    }
    // //choose a place to move it to
    let newPositionIdentifier = 2
    const newParent = {
      _id: '91f281f4-b8dc-429a-8e21-6b9d72ce8428',
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
    // generate the rearranged decks (after moving the commitment)
    // - use the app to generate it
    // - create a function in stategenerator that creates this altered deck
    //
    const expectedDecks = generateDecks_CommitmentMovedBetweenDecks()

    //create the desired stack
    state.decks = generateDummyDecks()

    //choose an _id from the list to move
    const oldPosition = 2
    const oldDeckIndex = 1
    const oldParent = state.decks[oldDeckIndex].deck[0]

    // //choose a place to move it to
    let newPositionIdentifier = 3
    const newDeckIndex = 2
    const newParent = state.decks[newDeckIndex].deck[0]

    const commitment = oldParent.commitments[oldPosition]

    // // perform the mutation
    UPDATE_DISPLAY_LIST_POSITIONS(state, {
      commitment,
      newPosition: newPositionIdentifier,
      oldParent,
      newParent,
      oldDeckIndex,
      newDeckIndex,
    })

    expect(JSON.stringify(state.decks[0].deck)).toBe(
      JSON.stringify(expectedDecks[0].deck)
    )
    expect(JSON.stringify(state.decks[1].deck)).toBe(
      JSON.stringify(expectedDecks[1].deck)
    )
    expect(JSON.stringify(state.decks[2].deck)).toBe(
      JSON.stringify(expectedDecks[2].deck)
    )
  })

  it('sets the zeroth deck as the desired deck', () => {
    //generate a dummy deck
    state.decks = generateDummyDecks()
    //set the commitment that is to be the root of the current deck
    const commitment = state.commitments[1] //this should be the develop toile commitment ('318007304478786128')
    const deckIndex = 0
    const expectedDecks = generateDummyAlteredDecks()
    //set the commitment
    SET_DECK_AS_SINGLE_PARENT(state, { deckIndex, commitment })
    expect(state.decks[deckIndex].deck[0].commitments).toStrictEqual(
      expectedDecks[deckIndex].deck[0].commitments
    )
    expect(state.decks[deckIndex]._id).toBeDefined()
  })

  it('changes the currentDate state variable to specified value', () => {
    const newDate = '20210623'

    //commit the mutation
    UPDATE_CURRENT_DATE(state, { newDate })

    //expect the currentDate to be the newDate
    expect(state.currentDate).toBe(newDate)
  })
})
