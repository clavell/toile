import { getters } from '@/store/getters.js'
import { generateState } from '@/store/stategenerator.js'
import { originTypeEnum } from '@/use/enums'

const { commitmentsSortedByCompletedStatus } = getters
let state
describe('getters', () => {
  beforeEach(() => {
    state = generateState()
  })

  it('returns a sorted list based on whether task is completed or not', () => {
    //set the first element to
    state.commitments[0].complete = true
    expect(state.commitments[0].complete).toBe(true)
    //return the sorted commitments
    let sortedCommitments = commitmentsSortedByCompletedStatus(state)
    //check to see that the final commitment is in fact true
    expect(sortedCommitments[sortedCommitments.length - 1].complete).toBe(true)
  })

  it('returns the prerequisites of the specified id', () => {
    //getter should return an array of commitments. there should be one entry in the array and it should be the "display dummy data in calendar view"
    const expectedCommitment = {
      id: '7ece7fc9-0a59-47b2-b87f-2e493bfb4d49',
      entrytitle: 'display dummy data in calendar view',
      startTime: '202106201630',
      duration: 45,
      complete: false,
      parent: { id: 'a225c8ed-4ab0-425a-8a88-02335ba51baa' },
      rank: 3,
      type: originTypeEnum.prerequisite,
    }

    const id = '91f281f4-b8dc-429a-8e21-6b9d72ce8428' //this is the make the store id

    //run the getter and hope for the best
    const prereqs = getters.prerequisitesById2(state, id)

    expect(prereqs[0]).toStrictEqual(expectedCommitment)
  })
})
