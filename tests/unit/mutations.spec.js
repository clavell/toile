import { mutations } from '@/store/index.js'

const { ADD_COMMITMENT } = mutations

describe('mutations', () => {
  it('add task adds task to store', () => {
    const newCommitment = {
      id: '0766c8ed-4ab0-425a-8a88-02335ba51baa',
      entrytitle: 'set up vuex',
      startTime: '202106201330',
      duration: 45,
    }
    const state = { commitments: [] }
    ADD_COMMITMENT(state, newCommitment)
    expect(state.commitments[0]).toBe(newCommitment)
  })
})
