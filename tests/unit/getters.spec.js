import { getters } from '@/store/index.js'
import {generateState} from '@/store/stategenerator.js'
const { commitmentsSortedByCompletedStatus } = getters
let state
describe('getters', () => {
  beforeEach(() => {
    state =  generateState()
  })

  it('returns a sorted list based on whether task is completed or not', () => {
    //set the first element to
    state.commitments[0].complete = true
    expect(state.commitments[0].complete).toBe(true)
    //return the sorted commitments
    let sortedCommitments = commitmentsSortedByCompletedStatus(state)
    //check to see that the final commitment is in fact true
    expect(sortedCommitments[sortedCommitments.length-1].complete).toBe(true)
  })
})