import { getters } from '@/store/getters.js'
import { DateTime } from 'luxon'

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

export function generateScheduleOrder(state) {
  //first order elements by their due dates
  const commitmentsWithDueDatesInOrder = state.commitments
    .filter((el) => {
      return el.duedate
    })
    .sort((a, b) => {
      const aDate = DateTime.fromFormat(a.duedate, state.dateFormat)
      const bDate = DateTime.fromFormat(b.duedate, state.dateFormat)
      return aDate.startOf('day') >= bDate.startOf('day')
    })
    .map((element) => {
      return { ...element, commitmentId: element.id }
    })

  let scheduleList = []

  commitmentsWithDueDatesInOrder.forEach((element) => {
    recursiveScheduleOrderer({ state, scheduleList, commitment: element })
  })

  return scheduleList
}

function recursiveScheduleOrderer({
  state,
  scheduleList,
  commitment,
  parentDuration,
}) {
  //if the item is already in the list do nothing
  if (
    scheduleList.find((element) => {
      return element.commitmentId === commitment.commitmentId
    })
  ) {
    return
  }
  //if there are prerequisites add them to the list
  const fullPrereqs = getters.prerequisitesById2(state, commitment.commitmentId)
  if (fullPrereqs.length !== 0) {
    const prereqs = fullPrereqs.map((commitment) => {
      return { ...commitment, commitmentId: commitment.id }
    })
    prereqs.forEach((prereq) => {
      recursiveScheduleOrderer({ state, scheduleList, commitment: prereq })
    })
  }
  //if there are subtasks add them to the list
  const fullSubTasks = getters.subTasks(state, commitment)
  let totalSubtaskDuration = 0
  if (fullSubTasks.length !== 0) {
    const subTasks = fullSubTasks.map((commitment) => {
      return { ...commitment, commitmentId: commitment.id }
    })
    subTasks.forEach((subTask) => {
      if (subTask.duration && subTask.duration !== '') {
        totalSubtaskDuration += subTask.duration
      }
      totalSubtaskDuration += recursiveScheduleOrderer({
        state,
        scheduleList,
        commitment: subTask,
      })
    })
  }
  let duration = 0
  let totalTaskDuration
  if (commitment.duration >= totalSubtaskDuration) {
    duration = commitment.duration - totalSubtaskDuration
    totalTaskDuration = commitment.duration
  }
  if (commitment.duration < totalSubtaskDuration) {
    totalTaskDuration = totalSubtaskDuration
  }

  scheduleList.push({ commitmentId: commitment.commitmentId, duration })
  return totalTaskDuration
}
