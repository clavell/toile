import { getters } from '@/store/getters.js'
import { actions } from '@/store/actions.js'
import {
  generateNewCommitment,
  generateAlteredCommitment,
  generateState,
} from '@/store/stategenerator.js'
const {
  addCommitment,
  setAsComplete,
  updateCommitment,
  addPrerequisite,
  resetDecks,
} = actions

let state
let newCommitment
const commit = jest.fn()

describe('actions', () => {
  beforeEach(() => {
    //create a dummy state
    state = generateState()
    newCommitment = generateNewCommitment()
    commit.mockClear()
  })
  it('commits new entry', () => {
    addCommitment({ commit }, newCommitment)
    expect(commit).toHaveBeenCalledWith('ADD_COMMITMENT', newCommitment)
  })

  it('commits the SET_AS_COMPLETE mutation when complete is false', () => {
    setAsComplete({ commit }, newCommitment.id)
    expect(commit).toHaveBeenCalledWith('SET_AS_COMPLETE', newCommitment.id)
  })

  it('commits the SET_AS_COMPLETE mutation when complete is true', () => {
    newCommitment.complete = true
    setAsComplete({ commit }, newCommitment.id)
    expect(commit).toHaveBeenCalledWith('SET_AS_COMPLETE', newCommitment.id)
  })

  it('commits the UPDATE_COMMITMENT mutation when commitment has changed', () => {
    state.commitments.push(newCommitment)

    //create editted commitment to add in the orignal's place
    const edittedCommitment = generateAlteredCommitment()

    updateCommitment(
      { state, commit },
      { newCommitment: edittedCommitment, oldCommitment: newCommitment }
    )

    const index = getters.indexFromStateArray(
      newCommitment.id,
      state,
      'commitments'
    )
    expect(commit).toHaveBeenCalledWith('UPDATE_COMMITMENT', {
      newCommitment: edittedCommitment,
      index: index,
    })
  })

  it('does not commit the UPDATE_COMMITMENT mutation when commitment has NOT changed', () => {
    state.commitments.push(newCommitment)

    updateCommitment(
      { state, commit },
      { newCommitment: newCommitment, oldCommitment: newCommitment }
    )

    expect(commit).toHaveBeenCalledTimes(0)
  })

  it('commits the ADD_PREQUISITE mutation when the commitments are NOT decendents of one another', () => {
    //choose two commitments that are not directly related
    let commitment = state.commitments[1] // set up vuex
    let prerequisite = state.commitments[2] // add dummy data to vuex

    addPrerequisite({ state, commit }, { commitment, prerequisite })

    expect(commit).toHaveBeenCalledTimes(1)
    expect(commit).toHaveBeenCalledWith('ADD_PREREQUISITE', {
      commitment,
      prerequisite,
    })
  })

  it('does not commit the ADD_PREQUISITE mutation when the commitments ARE parents of one another', () => {
    //choose two commitments that are not directly related
    let commitment = state.commitments[1] // set up vuex
    let prerequisite = state.commitments[5] // watch videos (direct decendent of set up vuex)

    //try one way
    addPrerequisite({ state, commit }, { commitment, prerequisite })
    //try the other
    addPrerequisite({ state, commit }, { prerequisite, commitment })

    expect(commit).toHaveBeenCalledTimes(0)
  })

  it('does not commit the ADD_PREQUISITE mutation when the commitments ARE grandparents of one another', () => {
    //choose two commitments that are not directly related
    let commitment = state.commitments[0] // setting up (very bottom task)
    let prerequisite = state.commitments[5] // watch videos ( grandchild of setting up)

    //try one way
    addPrerequisite({ state, commit }, { commitment, prerequisite })
    //try the other
    addPrerequisite({ state, commit }, { prerequisite, commitment })

    expect(commit).toHaveBeenCalledTimes(0)
  })

  it('fires the SET_DECK_AS_SINGLE_PARENT mutation the appropriate number of times when resetting the decks after non-drop area drop', () => {
    const numberOfFirings = state.decks.length

    //fire the action
    resetDecks({ state, commit })
    //check that the thing was fired the right number of times
    expect(commit).toHaveBeenCalledTimes(numberOfFirings)
    expect(commit).toHaveBeenLastCalledWith('SET_DECK_AS_SINGLE_PARENT', {
      deckIndex: numberOfFirings - 1,
      commitment: state.decks[numberOfFirings - 1].deck,
    })
  })

  it('commits the UPDATE_RANKS mutation when commitment order has changed', () => {
    //get the commitments from the current parent
    //get an id of the moving thing
    //get the position of the blank space
  })

  it('commits the UPDATE_DISPLAY_POSITIONS mutation when commitment order has changed superficially (while still dragging)', () => {
    //get the commitments from the current parent
    //get an id of the moving thing
  })
})
