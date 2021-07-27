import { reactive, computed, watch } from 'vue'

const makeDraggable = function (element, props, store) {
  const position = reactive({
    init: false,
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    isDragging: false,
    dragStartX: null,
    dragStartY: null,
  })

  const style = computed(() => {
    if (position.init) {
      return {
        position: position.isDragging ? 'fixed' : '',
        left: position.x + 'px',
        top: position.y + 'px',
        width: position.width + 'px',
        height: position.height + 'px',
        'box-shadow': position.isDragging
          ? '3px 6px 16px rgba(0, 0, 0, 0.15)'
          : '',
        //   "transform": position.isDragging ? "translate(-3px, -6px)" : "",
        cursor: position.isDragging ? 'grabbing' : 'grab',
      }
    }
    return {}
  })

  const onMouseDown = (e) => {
    e.stopPropagation()
    let moving = e.target
    while (moving.className !== 'entry') {
      moving = moving.parentNode
    }
    let clientX = e.clientX
    let clientY = e.clientY
    const shiftX = e.clientX - moving.getBoundingClientRect().left
    const shiftY = e.clientY - moving.getBoundingClientRect().top
    position.x = clientX - shiftX - 7
    position.y = clientY - shiftY - 7

    position.dragStartX = clientX - position.x
    position.dragStartY = clientY - position.y

    position.isDragging = true

    document.addEventListener('pointerup', onMouseUp)
    document.addEventListener('pointermove', onMouseMove)
  }

  const onMouseMove = (e) => {
    e.stopPropagation()
    let { clientX, clientY } = e
    position.x = clientX - position.dragStartX
    position.y = clientY - position.dragStartY
  }

  const onMouseUp = (e) => {
    e.stopPropagation()

    const timeSegment = document.elementFromPoint(
      position.x + position.width / 2,
      position.y + 3
    )
    //update start time with the id and the start time retrieved from the grid
    const newTime = timeSegment.style.gridArea.toString().substring(1, 13)
    store.dispatch('updateStartTime', {
      newStartTime: newTime,
      id: props.entry.id,
    })

    position.isDragging = false
    position.dragStartX = null
    position.dragStartY = null
    document.removeEventListener('pointerup', onMouseUp)
    document.removeEventListener('pointermove', onMouseMove)
  }

  watch(element, (element) => {
    // if (!element instanceof HTMLElement) return;
    let rect = element.getBoundingClientRect(element)
    position.init = true
    position.x = Math.round(rect.x)
    position.y = Math.round(rect.y)
    position.width = Math.round(rect.width)
    position.height = Math.round(rect.height)

    element.addEventListener('pointerdown', onMouseDown)
  })

  return {
    position,
    style,
  }
}

export { makeDraggable }
