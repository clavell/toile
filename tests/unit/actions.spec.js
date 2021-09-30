import { getters } from '@/store/getters.js'
import { actions } from '@/store/actions.js'
import {
  generateNewCommitment,
  generateAlteredCommitment,
  generateState,
} from '@/store/stategenerator.js'
const { addCommitment, setAsComplete, updateCommitment } = actions

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
