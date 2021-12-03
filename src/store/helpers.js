import { getters } from '@/store/getters.js'
import { DateTime } from 'luxon'
import { v4 as uuidv4 } from 'uuid'
import { calendarEntryTypeEnum } from '@/use/enums.js'

export const blankSpace = {
  _id: '',
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

  let sessionDuration = 30
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
  let noOfSchedulingTimesPerDay = state.scheduleTimes.length
  let noOfDelayOffsets = 0

  const schedule = orderedSessions.map((el, index) => {
    let dayOffSet = Math.floor(
      (index + firstTimeToScheduleIndex + noOfDelayOffsets) /
        noOfSchedulingTimesPerDay
    )
    let timeIndex =
      (index + firstTimeToScheduleIndex + noOfDelayOffsets) %
      noOfSchedulingTimesPerDay

    let timeOfCallObjectCurrent = timeOfCallObject.plus({ days: dayOffSet })
    let currentDateString = timeOfCallObjectCurrent.toFormat(state.dateFormat)
    let startTime = currentDateString + state.scheduleTimes[timeIndex]

    //while there are times that shouldn't be scheduled at push back the start time
    while (
      state.dontScheduleAt.find((el) => {
        return el.time == startTime
      })
    ) {
      noOfDelayOffsets++
      dayOffSet = Math.floor(
        (index + firstTimeToScheduleIndex + noOfDelayOffsets) /
          noOfSchedulingTimesPerDay
      )
      timeIndex =
        (index + firstTimeToScheduleIndex + noOfDelayOffsets) %
        noOfSchedulingTimesPerDay

      timeOfCallObjectCurrent = timeOfCallObject.plus({ days: dayOffSet })
      currentDateString = timeOfCallObjectCurrent.toFormat(state.dateFormat)
      startTime = currentDateString + state.scheduleTimes[timeIndex]
    }

    return {
      ...el,
      sessionStartTime: startTime,
      sessionDuration,
      _id: uuidv4(),
      type: calendarEntryTypeEnum.CalendarEntry,
    }
  })

  const blankSpaces = state.dontScheduleAt.map((el) => {
    return {
      ...el,
      sessionStartTime: el.time,
      sessionDuration,
      _id: uuidv4(),
      type: calendarEntryTypeEnum.BlankEntry,
    }
  })

  return schedule.concat(blankSpaces)
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
        orderedSessions[j] = { _id: uuidv4(), commitments: [] }
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
    if (previousRearrange._id) {
      const previousRearrangeIndex = commitmentsWithDueDatesInOrder.findIndex(
        (el) => {
          return el._id == previousRearrange._id
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
    if (previousRearrange._id) {
      const shouldBeFirstIndex = commitmentsWithDueDatesInOrder.findIndex(
        (el) => {
          return el._id == previousRearrange._id
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
    return element.commitmentId === commitment._id
  })
  if (existingEntry) {
    // return 0
    return existingEntry.totalTaskDuration
  }
  //if there are prerequisites add them to the list
  const prereqs = getters.prerequisitesById2(state, commitment._id)
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
    commitmentId: commitment._id,
    duration,
    totalTaskDuration,
  })
  return totalTaskDuration
}
