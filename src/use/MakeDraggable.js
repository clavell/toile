import { watch } from 'vue'

const keyEnum = Object.freeze({ shift: 'shift', none: 'none' })

const makeDraggable = function ({
  store,
  element,
  props,
  handlers,
  key,
  details,
  detailArguments,
}) {
  const position = {
    init: false,
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    isDragging: false,
    dragStartX: null,
    dragStartY: null,
  }

  const onMouseMove = (e) => {
    e.stopPropagation()
    store.commit('UPDATE_DRAG_POSITION', { e })

    let position = store.state.moving.position
    const leftSide = document.elementFromPoint(
      position.x - 1,
      position.y + position.height / 2
    )
    //action for changing the position in the display array
    if (details && details.mouseMoveDetails) {
      details.mouseMoveDetails({ leftSide, detailArguments, store })
    }
  }
  const onMouseUp = (e) => {
    e.preventDefault()
    e.stopPropagation()
    // if (onMouseUpDetails) {
    //   onMouseUpDetails({ store, position, props, mouseUpArguments })
    // }
    const position = JSON.parse(JSON.stringify(store.state.moving.position))
    const leftSide = document.elementFromPoint(
      position.x - 1,
      position.y + position.height / 2
    )
    const rightSide = document.elementFromPoint(
      position.x + position.width + 1,
      position.y + position.height / 2
    )

    if (details && details.mouseUpDetails) {
      details.mouseUpDetails({ leftSide, rightSide, detailArguments, store })
    }
    document.removeEventListener('pointerup', onMouseUp)
    document.removeEventListener('pointermove', onMouseMove)
  }

  const onMouseDown = (e) => {
    let keyDown
    switch (key) {
      case keyEnum.shift:
        keyDown = e.shiftKey
        break
      default:
        keyDown = true
        break
    }

    if (keyDown) {
      e.stopPropagation()
      //if clicking on a checkbox don't drag
      if (e.target.type == 'checkbox') {
        return
      }
      e.preventDefault()
      //get the right element to be moved
      let moving = e.target
      while (!moving.classList.contains('draggable')) {
        moving = moving.parentNode
      }

      //get the initial size and position
      let clientX = e.clientX
      let clientY = e.clientY
      const shiftX = e.clientX - moving.getBoundingClientRect().left
      const shiftY = e.clientY - moving.getBoundingClientRect().top
      position.x = clientX - shiftX - 7
      position.y = clientY - shiftY - 7

      position.dragStartX = clientX - position.x
      position.dragStartY = clientY - position.y
      position.isDragging = true

      if (details && details.mouseDownDetails) {
        details.mouseDownDetails({ store, detailArguments, position, props })
      }

      document.addEventListener('pointermove', onMouseMove)
      document.addEventListener('pointerup', onMouseUp)
    }
  }

  //when the element appears then add the event listeners and find the size of the shape
  watch(element, (element) => {
    // if (!element instanceof HTMLElement) return;
    let rect = element.getBoundingClientRect(element)
    //setting the position here below affects the position in the store, I believe. This is not what we want, but it works for now...
    position.init = true
    // position.x = Math.round(rect.x)
    // position.y = Math.round(rect.y)
    position.width = Math.round(rect.width)
    position.height = Math.round(rect.height)
    if (handlers && handlers.click) {
      element.addEventListener('click', handlers.click)
    }
    element.addEventListener('pointerdown', onMouseDown)
  })
}

export { makeDraggable, keyEnum }
