import { state, getters } from '@/store/index.js'

const { commitmentsSortedByCompletedStatus } = getters
let teststate
describe('getters', () => {
  beforeEach(() => {
    teststate = state
  })

  it('returns a sorted list based on whether task is completed or not', () => {
    //set the first element to
    teststate.commitments[0].complete = true
    expect(teststate.commitments[0].complete).toBe(true)
    //return the sorted commitments
    let sortedCommitments = commitmentsSortedByCompletedStatus(teststate)
    //check to see that the final commitment is in fact true
    expect(sortedCommitments[sortedCommitments.length-1].complete).toBe(true)
  })
})