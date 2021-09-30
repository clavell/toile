const onMouseUpDetails = function ({ store, position, props }) {
  const timeSegment = document.elementFromPoint(
    position.x + position.width / 2,
    position.y + 3
  )
  //update start time with the id and the start time retrieved from the grid
  const newTime = timeSegment.style.gridArea.toString().substring(1, 13)
  store.dispatch('updateStartTime', {
    newStartTime: newTime,
    id: props.commitment.id,
  })
}

export { onMouseUpDetails }
