import { mutations } from '@/store/index.js'

const { ADD_COMMITMENT, SET_AS_COMPLETE, UPDATE_START_TIME } = mutations

let state;
let newCommitment;
describe('mutations', () => {
  beforeEach(() => {
    state = {commitments: []}
    newCommitment = {
      id: '0766c8ed-4ab0-425a-8a88-02335ba51baa',
      entrytitle: 'set up vuex',
      startTime: '202106201330',
      duration: 45,
    }
  })

  it('adds item to store', () => {
    ADD_COMMITMENT(state, newCommitment)
    expect(state.commitments[0]).toBe(newCommitment)
  })

  it('sets item as complete',() => {
    //have the commitment already be in the state object
    state.commitments.push(newCommitment)

    SET_AS_COMPLETE(state, state.commitments[0].id)
    expect(state.commitments[0].complete).toBe(true)

  })

  it('updates start time', () => {
    //have the commitment already be in the state object
    state.commitments.push(newCommitment)

    const id = newCommitment.id
    const newStartTime = '202506201630'

    UPDATE_START_TIME(state, {newStartTime, id})

    expect(state.commitments[0].startTime).toBe(newStartTime)
  })

})
