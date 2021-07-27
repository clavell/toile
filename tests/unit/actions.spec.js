import { actions } from '@/store/index.js'

const { addCommitment, setAsComplete } = actions

let newCommitment;
const commit = jest.fn()

describe('actions', () => {
  beforeEach(() => {
    newCommitment = {
      id: '0766c8ed-4ab0-425a-8a88-02335ba51baa',
      entrytitle: 'set up vuex',
      startTime: '202106201330',
      duration: 45,
    }
    commit.mockClear()
  })
  it('commits new entry', () => {
    addCommitment({ commit }, newCommitment)
    expect(commit).toHaveBeenCalledWith('ADD_COMMITMENT', newCommitment)
  })

  it('commits the SET_AS_COMPLETE mutation', () => {
    setAsComplete({ commit } , newCommitment.id)
    expect(commit).toHaveBeenCalledWith('SET_AS_COMPLETE', newCommitment.id)
  })
})
