import { DateTime } from 'luxon'

import { currentDateChangeEnum } from '@/use/enums.js'

import { getters } from '@/store/getters.js'
import { actions } from '@/store/actions.js'
import {
  generateNewCommitment,
  generateAlteredCommitment,
  generateState,
} from '@/store/stategenerator.js'
import { generateDummyDecks } from '../../src/store/stategenerator'
const {
  addCommitment,
  setAsComplete,
  updateCommitment,
  addPrerequisite,
  resetDecks,
  setCurrentDate,
} = actions

let state
let newCommitment
const commit = jest.fn()
const createCommitment = jest.fn()
const mixpanel = { track: jest.fn() }
const apolloUpdateCommitment = jest.fn()

describe('actions', () => {
  beforeEach(() => {
    //create a dummy state
    state = generateState()
    newCommitment = generateNewCommitment()
    commit.mockClear()
    createCommitment.mockClear()
    mixpanel.track.mockClear()
    apolloUpdateCommitment.mockClear()
  })
  it('commits new entry', () => {
    addCommitment(
      { state, getters },
      { newCommitment, createCommitment, mixpanel }
    )
    expect(createCommitment).toHaveBeenCalledTimes(1)
    // expect(commit).toHaveBeenCalledWith('ADD_COMMITMENT', newCommitment)
  })

  it('commits the SET_AS_COMPLETE mutation when complete is false', () => {
    setAsComplete({ commit }, newCommitment._id)
    expect(commit).toHaveBeenCalledWith('SET_AS_COMPLETE', newCommitment._id)
  })

  it('commits the SET_AS_COMPLETE mutation when complete is true', () => {
    newCommitment.complete = true
    setAsComplete({ commit }, newCommitment._id)
    expect(commit).toHaveBeenCalledWith('SET_AS_COMPLETE', newCommitment._id)
  })

  it('calls the apollo update commitment function when commitment has changed', () => {
    state.commitments.push(newCommitment)

    //create editted commitment to add in the orignal's place
    const edittedCommitment = generateAlteredCommitment(newCommitment)

    updateCommitment(
      { state },
      {
        updatedCommitment: edittedCommitment,
        updateCommitment: apolloUpdateCommitment,
      }
    )

    // const index = getters.indexFromStateArray(
    //   newCommitment._id,
    //   state,
    //   'commitments'
    // )
    expect(apolloUpdateCommitment).toHaveBeenCalledTimes(1)
  })

  it('does not call the apollo update commitment function when commitment has NOT changed', () => {
    state.commitments.push(newCommitment)

    updateCommitment(
      { state },
      {
        updatedCommitment: newCommitment,
        updateCommitment: apolloUpdateCommitment,
      }
    )

    expect(apolloUpdateCommitment).toHaveBeenCalledTimes(0)
  })

  it('commits the ADD_PREQUISITE mutation when the commitments are NOT decendents of one another', () => {
    //choose two commitments that are not directly related
    let commitment = state.commitments[1] // develop toile
    let prerequisite = state.commitments[6] // build hush box

    addPrerequisite({ state, commit }, { commitment, prerequisite, mixpanel })

    expect(commit).toHaveBeenCalledTimes(1)
    expect(commit).toHaveBeenCalledWith('ADD_PREREQUISITE', {
      commitment,
      prerequisite,
    })
  })

  it('does not commit the ADD_PREQUISITE mutation when the commitments ARE parents of one another', () => {
    let commitment = state.commitments[1] // develop toile
    let prerequisite = state.commitments[2] // bug fixes

    //try one way
    addPrerequisite({ state, commit }, { commitment, prerequisite, mixpanel })
    //try the other
    addPrerequisite({ state, commit }, { prerequisite, commitment, mixpanel })

    expect(commit).toHaveBeenCalledTimes(0)
  })

  it('does not commit the ADD_PREQUISITE mutation when the commitments ARE grandparents of one another', () => {
    //choose two commitments that are not directly related
    let commitment = state.commitments[0] // Projects (very bottom)
    let prerequisite = state.commitments[2] // bug fixes

    //try one way
    addPrerequisite({ state, commit }, { commitment, prerequisite, mixpanel })
    //try the other
    addPrerequisite({ state, commit }, { prerequisite, commitment, mixpanel })

    expect(commit).toHaveBeenCalledTimes(0)
  })

  it('does not commit the ADD_PREQUISITE mutation when the commitments ARE the same thing', () => {
    //choose two commitments that are not directly related
    let commitment = state.commitments[5] // setting up (very bottom task)
    let prerequisite = state.commitments[5] // watch videos ( grandchild of setting up)

    //try one way
    addPrerequisite({ state, commit }, { commitment, prerequisite, mixpanel })
    //try the other
    addPrerequisite({ state, commit }, { prerequisite, commitment, mixpanel })

    expect(commit).toHaveBeenCalledTimes(0)
  })

  it('fires the SET_DECK_AS_SINGLE_PARENT mutation the appropriate number of times when resetting the decks after non-drop area drop', () => {
    state.decks = generateDummyDecks()

    const numberOfFirings = state.decks.length

    //fire the action
    resetDecks({ state, commit })
    //check that the thing was fired the right number of times
    expect(commit).toHaveBeenCalledTimes(numberOfFirings)
    expect(commit).toHaveBeenLastCalledWith('SET_DECK_AS_SINGLE_PARENT', {
      deckIndex: numberOfFirings - 1,
      commitment: state.decks[numberOfFirings - 1].deck[0],
    })
  })

  it('commits the UPDATE_CURRENT_DATE mutation when the dateChangeEnum.forward with current date plus one', () => {
    const instruction = currentDateChangeEnum.forward

    const expectedNewCurrentDate = DateTime.fromFormat(
      state.currentDate,
      state.dateFormat
    )
      .plus({ day: 1 })
      .toFormat(state.dateFormat)

    //dispatch the action
    setCurrentDate({ state, commit }, { instruction })

    // expect(commit).toHaveBeenCalledTimes(1)
    expect(commit).toHaveBeenCalledWith('UPDATE_CURRENT_DATE', {
      newDate: expectedNewCurrentDate,
    })
  })

  it('commits the UPDATE_RANKS mutation when commitment order has changed', () => {
    //get the commitments from the current parent
    //get an _id of the moving thing
    //get the position of the blank space
  })

  it('commits the UPDATE_DISPLAY_POSITIONS mutation when commitment order has changed superficially (while still dragging)', () => {
    //get the commitments from the current parent
    //get an _id of the moving thing
  })
})
