import { getters } from '@/store/getters.js'

export const blankSpace = {
  id: '',
  type: 'EmptyListSpace',
}

export function removeBlankHelper(state) {
  let { topParentCommitments, parentIndex } =
    getters.topParentCommitments(state)
  //set the type of the former blank space to old
  let oldBlankPosition = topParentCommitments.findIndex(
    (el) => el.type === 'EmptyListSpace'
  )
  topParentCommitments.splice(oldBlankPosition, 1, {
    ...blankSpace,
    type: 'old',
  })
  //remove the blank from the old position
  oldBlankPosition = topParentCommitments.findIndex((el) => el.type === 'old')
  topParentCommitments.splice(oldBlankPosition, 1)
  return { parentIndex, topParentCommitments }
}
