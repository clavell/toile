import { actions } from '@/store/index.js'

const { addCommitment } = actions

describe('actions', () => {
  it('commits new entry', () => {
    const commit = jest.fn()
    const newCommitment = { title: 'lovely' }
    addCommitment({ commit }, newCommitment)
    expect(commit).toHaveBeenCalledWith('ADD_COMMITMENT', newCommitment)
  })
})
