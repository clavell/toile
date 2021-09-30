//to make an element draggable, the element needs the following: 
// - a ref tag in the template
// - imported store with useStore() from vuex
// - an addition to the class list named draggable (hopefully don't have that as a css tag already)
// - an addition to the style list of draggableStyle
// to be added - change the onMouseUp function so that what the function checks for is modular

import { reactive, computed, watch } from 'vue'



const makeDraggable = function ({element, props, store, onMouseUpDetails,mouseUpArguments,onMouseDownDetails, mouseDownArguments,onMouseMoveDetails,mouseMoveArguments}) {
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

  const draggableStyle = computed(() => {
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
    //if clicking on a checkbox don't drag
    if(e.target.type=="checkbox"){
      return
    }
    e.preventDefault()
    let moving = e.target
    while (!moving.classList.contains('draggable')) {
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
    if(onMouseDownDetails){
      onMouseDownDetails({store, mouseDownArguments})
    }
    document.addEventListener('pointerup', onMouseUp)
    document.addEventListener('pointermove', onMouseMove)
  }

  const onMouseMove = (e) => {
    e.stopPropagation()
    if(onMouseMoveDetails){
      onMouseMoveDetails({store, position, mouseMoveArguments})
    }
    let { clientX, clientY } = e
    position.x = clientX - position.dragStartX
    position.y = clientY - position.dragStartY
  }

  const onMouseUp = (e) => {
    e.stopPropagation()
    store
    props
    if(onMouseUpDetails) {
      onMouseUpDetails({store,position,props,mouseUpArguments})
    }

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
    // position.x = Math.round(rect.x)
    // position.y = Math.round(rect.y)
    position.width = Math.round(rect.width)
    position.height = Math.round(rect.height)

    element.addEventListener('pointerdown', onMouseDown)
  })

  return {
    position,
    draggableStyle,
  }
}

export { makeDraggable }
