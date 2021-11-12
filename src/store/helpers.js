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

export function createSchedule({
  state,
  orderedSessions,
  timeOfCallToSchedule,
}) {
  //determine first time to schedule at
  let timeOfCallObject = DateTime.fromFormat(
    timeOfCallToSchedule,
    state.timeFormat
  )
  const dayOfCall = timeOfCallObject.toFormat(state.dateFormat)
  const possibleTimesObjects = state.scheduleTimes.map((el) => {
    return DateTime.fromFormat(dayOfCall + el, state.timeFormat)
  })

  let firstTimeToScheduleIndex
  for (let i = 0; i < possibleTimesObjects.length; i++) {
    if (possibleTimesObjects[i] > timeOfCallObject) {
      firstTimeToScheduleIndex = i
      break
    }
  }

  //if no times work then schedule for the next day (schedule set after work day)
  if (firstTimeToScheduleIndex == undefined) {
    timeOfCallObject = timeOfCallObject.plus({
      days: 1,
    })

    firstTimeToScheduleIndex = 0
  }

  //while there are still ordered sessions to schedule keep cycling through the sessions and adding them to the final array with start times and durations of 30 minutes
  const schedule = orderedSessions.map((el, index) => {
    let dayOffSet = Math.floor((index + firstTimeToScheduleIndex) / 15)

    let timeIndex = (index + firstTimeToScheduleIndex) % 15

    let timeOfCallObjectCurrent = timeOfCallObject.plus({ days: dayOffSet })

    let startTime =
      timeOfCallObjectCurrent.toFormat(state.dateFormat) +
      state.scheduleTimes[timeIndex]

    return {
      ...el,
      sessionStartTime: startTime,
      sessionDuration: 30,
      id: uuidv4(),
    }
  })

  return schedule
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
      //if there is no time in the item then continue
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

export function generateScheduleOrder({ state, rearrange, commit }) {
  const orderByDueDate = (a, b) => {
    const aDate = DateTime.fromFormat(a.duedate, state.dateFormat)
    const bDate = DateTime.fromFormat(b.duedate, state.dateFormat)
    return aDate.startOf('day') >= bDate.startOf('day')
  }
  //first order elements by their due dates
  const commitmentsWithDueDatesInOrder = state.commitments
    .filter((el) => {
      return el.duedate //if it has a due date then it is returned
    })
    .sort(orderByDueDate)

  const previousRearrange = state.previousRearrange
  if (rearrange) {
    //if there was a previously rearranged thing then find its index in the commitments list (ordered by due date)
    if (previousRearrange.id) {
      const previousRearrangeIndex = commitmentsWithDueDatesInOrder.findIndex(
        (el) => {
          return el.id == previousRearrange.id
        }
      )
      //increment it by one
      const newRearrangeIndex = previousRearrangeIndex + 1
      //if the new rearrange index isn't out of bounds and the element is still in the list then get it from where it is and put it at the front
      if (
        previousRearrangeIndex >= 0 &&
        newRearrangeIndex < commitmentsWithDueDatesInOrder.length
      ) {
        moveElementToFront(newRearrangeIndex)
      } else if (
        previousRearrangeIndex >= 0 &&
        newRearrangeIndex <= commitmentsWithDueDatesInOrder.length
      ) {
        commitmentsWithDueDatesInOrder.sort(orderByDueDate)
        commit('SET_PREVIOUS_REARRANGE', {
          previousRearrange: commitmentsWithDueDatesInOrder[0],
        })
      } else {
        //if there isn't a previous rearrange (was removed) or the new rearrange index would be out of bounds then just swap in the second element
        moveElementToFront(1)
      }
    } else {
      moveElementToFront(1)
    }
  } else {
    if (previousRearrange.id) {
      const shouldBeFirstIndex = commitmentsWithDueDatesInOrder.findIndex(
        (el) => {
          return el.id == previousRearrange.id
        }
      )
      moveElementToFront(shouldBeFirstIndex)
    }
  }

  let itemsToSchedule = []

  commitmentsWithDueDatesInOrder.forEach((element) => {
    recursiveScheduleOrderer({ state, itemsToSchedule, commitment: element })
  })

  return itemsToSchedule

  function moveElementToFront(newRearrangeIndex) {
    const newRearrange = commitmentsWithDueDatesInOrder[newRearrangeIndex]
    commitmentsWithDueDatesInOrder.splice(newRearrange, 1)
    commitmentsWithDueDatesInOrder.unshift(newRearrange)
    commit('SET_PREVIOUS_REARRANGE', { previousRearrange: newRearrange })
  }
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
