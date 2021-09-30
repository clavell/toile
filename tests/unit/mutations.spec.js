import { mutations,findIndex } from '@/store/index.js'
import { generateNewCommitment,generateAlteredCommitment, generateState } from '@/store/stategenerator.js'
const { ADD_COMMITMENT, SET_AS_COMPLETE, UPDATE_START_TIME, UPDATE_COMMITMENT, ADD_BLANK_SPACE_TO_LIST, MOVE_BLANK_SPACE_TO_NEW_POSITION, UPDATE_DISPLAY,SET_RANK } = mutations

let state
let newCommitment
let parentIndex

describe('mutations', () => {
  beforeEach(() => {
    state = generateState()
    newCommitment = generateNewCommitment()
    parentIndex = findIndex(state.topParent.id,state, 'currentCommitmentStackDisplayOrder')
  })

  it('adds item to store', () => {
    ADD_COMMITMENT(state, newCommitment)
    expect(state.commitments[state.commitments.length-1]).toBe(newCommitment)
  })

  it('sets item as complete',() => {
    //have the commitment already be in the state object
    state.commitments.push(newCommitment)
    SET_AS_COMPLETE(state, newCommitment.id)
    expect(state.commitments[state.commitments.length-1].complete).toBe(true)
    
  })
  
  it('sets item as not complete', () => {
    // put a complete commitment into the state
    newCommitment.complete = true
    state.commitments.push(newCommitment)
    
    //run the mutation
    SET_AS_COMPLETE(state, newCommitment.id)
    expect(state.commitments[state.commitments.length-1].complete).toBe(false)
  })

  it('updates start time', () => {
    //have the commitment already be in the state object
    state.commitments.push(newCommitment)

    const id = newCommitment.id
    const newStartTime = '202506201630'

    UPDATE_START_TIME(state, {newStartTime, id})

    expect(state.commitments[state.commitments.length-1].startTime).toBe(newStartTime)
  })

  it('updates the chosen commitment ', () => {
    // ensure the new commitment is in the array
    state.commitments.push(newCommitment)

    //new data to overwrite the new commitment
    
    const edittedCommitment = generateAlteredCommitment()
    
    const index = findIndex(newCommitment.id, state,'commitments')
    UPDATE_COMMITMENT(state, {newInfo:edittedCommitment, index: index})

    //expect there to be only one of the editted commitment
    expect(state.commitments.filter((el) => el.id === edittedCommitment.id).length === 1)

    //expect the updated commitment to be in the same place as the old one
    expect(state.commitments[index]).toBe(edittedCommitment)
  })

  it('adds a blank space to the currentDisplayOrder',() => {
    const rankToAddBlank = 2

    ADD_BLANK_SPACE_TO_LIST(state, rankToAddBlank)

    expect(state.currentCommitmentStackDisplayOrder[parentIndex].commitments[rankToAddBlank].type).toBe('EmptyListSpace')

    expect(state.blankSpacePosition).toBe(rankToAddBlank)
  })

  it('moves the blank space to the new spot',() => {
    const rankToAddBlank = 2
    const rankToMoveBlank = 4

    ADD_BLANK_SPACE_TO_LIST(state, rankToAddBlank)

    expect(state.currentCommitmentStackDisplayOrder[parentIndex].commitments[rankToAddBlank].type).toBe('EmptyListSpace')

    MOVE_BLANK_SPACE_TO_NEW_POSITION(state, rankToMoveBlank)

    expect(state.currentCommitmentStackDisplayOrder[parentIndex].commitments[rankToMoveBlank].type).toBe('EmptyListSpace') 
    expect(state.blankSpacePosition).toBe(rankToMoveBlank)

  })

  it('updates the currentCommitmentStackDisplayOrder array',() => {
   

    //the entry in the commitmentsdisplayorder will be slightly different
    const expectedEntry = {id:newCommitment.id, type:'TodoCard'}

    //add a new commitment with that parent id
    state.commitments.push(newCommitment)

    //run the mutation
    UPDATE_DISPLAY(state)
    //does the new display array contain the new element?
    const newTopParentDisplay = state.currentCommitmentStackDisplayOrder.filter((el) => {
      return el.id === state.topParent.id
    })[0].commitments
    expect(newTopParentDisplay[newTopParentDisplay.length-1]).toStrictEqual(expectedEntry)

  })

  it('sets the rank of the commitment',() => {
    //choose a new rank to set
    const newRank = 10
    const commitmentPosition = 1
    const id = state.commitments[commitmentPosition].id
    console.log(id)

    //set the rank
    SET_RANK(state, id, newRank)

    //expect it to be change in the state
    expect(state.commitments[commitmentPosition].rank).toBe(newRank)

  })

})
