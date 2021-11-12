import { getters } from '@/store/getters.js'
import { DateTime } from 'luxon'
import { v4 as uuidv4 } from 'uuid'

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

export function createScheduleSessions({
  orderedItemsToSchedule,
  sessionLength,
  // breakLength,
}) {
  let orderedSessions = []
  let j = 0

  for (let i = 0; i < orderedItemsToSchedule.length; i++) {
    let timeLeftToScheduleInItem = orderedItemsToSchedule[i].duration

    do {
      if (orderedSessions[j] == undefined) {
        orderedSessions[j] = { id: uuidv4(), commitments: [] }
      }

      // const sessionsContainingCurrentItem = orderedSessions.filter((el) => {
      //   let t = el.commitments.filter((el) => {
      //     return el.commitmentId === orderedItemsToSchedule[i].commitmentId
      //   })
      //   return t.length
      // })

      // let durationOfCurrentItemScheduled = 0

      // if(sessionsContainingCurrentItem.length > 0){
      //   durationOfCurrentItemScheduled = sessionsContainingCurrentItem.map((el) => {
      //     return el.duration
      //   }).reduce((a,b) => a + b)
      // }

      //if there is no time in the item then continue
      // timeLeftToScheduleInItem = timeLeftToScheduleInItem - durationOfCurrentItemScheduled
      if (timeLeftToScheduleInItem == 0) continue

      let timeScheduledInCurrentSession = 0
      if (orderedSessions[j].commitments.length > 0) {
        timeScheduledInCurrentSession = orderedSessions[j].commitments
          .map((el) => {
            return el.duration
          })
          .reduce((a, b) => a + b)
      }
      let timeLeftInCurrentSession =
        sessionLength - timeScheduledInCurrentSession
      if (timeLeftToScheduleInItem >= timeLeftInCurrentSession) {
        orderedSessions[j].commitments.push({
          commitmentId: orderedItemsToSchedule[i].commitmentId,
          duration: timeLeftInCurrentSession,
        })
        timeLeftToScheduleInItem -= timeLeftInCurrentSession
        j++
      } else {
        orderedSessions[j].commitments.push({
          commitmentId: orderedItemsToSchedule[i].commitmentId,
          duration: timeLeftToScheduleInItem,
        })
        timeLeftToScheduleInItem = 0
      }
    } while (timeLeftToScheduleInItem > 0)
  }
  return orderedSessions
}

export function generateScheduleOrder(state) {
  //first order elements by their due dates
  const commitmentsWithDueDatesInOrder = state.commitments
    .filter((el) => {
      return el.duedate //if it has a due date then it is returned
    })
    .sort((a, b) => {
      const aDate = DateTime.fromFormat(a.duedate, state.dateFormat)
      const bDate = DateTime.fromFormat(b.duedate, state.dateFormat)
      return aDate.startOf('day') >= bDate.startOf('day')
    })

  let itemsToSchedule = []

  commitmentsWithDueDatesInOrder.forEach((element) => {
    recursiveScheduleOrderer({ state, itemsToSchedule, commitment: element })
  })

  return itemsToSchedule
}

function recursiveScheduleOrderer({ state, itemsToSchedule, commitment }) {
  //if the item is already in the list do nothing
  const existingEntry = itemsToSchedule.find((element) => {
    return element.commitmentId === commitment.id
  })
  if (existingEntry) {
    // return 0
    return existingEntry.totalTaskDuration
  }
  //if there are prerequisites add them to the list
  const prereqs = getters.prerequisitesById2(state, commitment.id)
  if (prereqs.length !== 0) {
    prereqs.forEach((prereq) => {
      recursiveScheduleOrderer({ state, itemsToSchedule, commitment: prereq })
    })
  }
  //if there are subtasks add them to the list
  const subTasks = getters.subTasks(state, commitment)
  let totalSubtaskDuration = 0
  if (subTasks.length !== 0) {
    subTasks.forEach((subTask) => {
      totalSubtaskDuration += recursiveScheduleOrderer({
        state,
        itemsToSchedule,
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
  if (!commitment.duration || commitment.duration < totalSubtaskDuration) {
    totalTaskDuration = totalSubtaskDuration
  }
  // if(!commitment.duration){
  //   totalTaskDuration = totalSubtaskDuration
  // }

  itemsToSchedule.push({
    commitmentId: commitment.id,
    duration,
    totalTaskDuration,
  })
  return totalTaskDuration
}
