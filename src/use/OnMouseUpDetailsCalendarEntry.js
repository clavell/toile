const onMouseUpDetails = function ({ store, position, props }) {
  const timeSegment = document.elementFromPoint(
    position.x + position.width / 2,
    position.y + 3
  )
  //update start time with the _id and the start time retrieved from the grid
  const newTime = timeSegment.style.gridArea.toString().substring(1, 13)
  store.dispatch('updateStartTime', {
    newStartTime: newTime,
    _id: props.scheduleEntry._id,
  })
}

export { onMouseUpDetails }
