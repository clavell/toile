import { getters } from '@/store/getters.js'
import {
  generateState,
  generateDummySchedule,
  generateCommitments,
} from '@/store/stategenerator.js'
import { originTypeEnum } from '@/use/enums'

const { commitmentsSortedByCompletedStatus, commitmentsOnCurrentDate } = getters
let state
describe('getters', () => {
  beforeEach(() => {
    state = generateState()
    state.commitments = generateCommitments()
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

  it('returns the prerequisites of the specified _id', () => {
    //getter should return an array of commitments. there should be one entry in the array and it should be the "display dummy data in calendar view"
    const expectedCommitment = {
      ...state.commitments[14],
      type: originTypeEnum.prerequisite,
    } //this should be the display dummy data in calendar view commitment

    const _id = '319821440143589970' //this is the make the store _id

    //run the getter and hope for the best
    const prereqs = getters.prerequisitesById2(state, _id)

    expect(prereqs[0]).toStrictEqual(expectedCommitment)
  })

  it('gets the schedule entries from the current date', () => {
    state.currentDate = '20220119'
    //get some dummy schedule data
    state.schedule = generateDummySchedule()

    const expectedSchedule = state.schedule.slice(0, 14) //the first fourteen entries happen to be on the date in the generated state.

    //get the schedule entries from the date
    let scheduleEntries = commitmentsOnCurrentDate(state)

    expect(scheduleEntries).toStrictEqual(expectedSchedule)
  })
})
