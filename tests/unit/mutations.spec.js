import { mutations,findIndex } from '@/store/index.js'
import { generateNewCommitment,generateAlteredCommitment, generateState } from '@/store/stategenerator.js'
const { ADD_COMMITMENT, SET_AS_COMPLETE, UPDATE_START_TIME, UPDATE_COMMITMENT } = mutations

let state
let newCommitment;
describe('mutations', () => {
  beforeEach(() => {
    state = generateState()
    newCommitment = generateNewCommitment()
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
    
    const index = findIndex(newCommitment.id, state)
    UPDATE_COMMITMENT(state, {newInfo:edittedCommitment, index: index})

    //expect there to be only one of the editted commitment
    expect(state.commitments.filter((el) => el.id === edittedCommitment.id).length === 1)

    //expect the updated commitment to be in the same place as the old one
    expect(state.commitments[index]).toBe(edittedCommitment)
  })

})
