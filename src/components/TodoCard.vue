<template>
  <div
    :style="commitmentSideBarStyle"
    class="listEntrySideBar"
    :id="currentDisplayPosition"
    :class="parent"
  ></div>
  <div
    ref="el"
    class="listentry draggable grid grid-cols-todolistentry bg-pink-800"
    :style="[entryWidth]"
    :id="currentDisplayPosition"
    @mousedown.prevent
    @touchmove.prevent
  >
  <!-- <div
    ref="el"
    class="listentry draggable grid grid-cols-todolistentry bg-pink-800"
    :style="[entryWidth, draggableStyle]"
    :id="currentDisplayPosition"
    @mousedown.prevent
    @touchmove.prevent
  > -->

    <div class="flex items-center justify-center">
      <input
        type="checkbox"
        :id="commitment.id"
        v-model="checked"
        :checked="checked"
      />
    </div>
    <div class="flex items-center" :style="commitmentTextStyle">
      <label @click.prevent :for="commitment.id">{{
        fullCommitment.entrytitle
      }}</label>
    </div>
  </div>
  <!-- <div v-if="position.isDragging" :id="currentDisplayPosition" :class="parent"></div> -->
</template>

<script>
import { inject } from '@vue/runtime-core'
import { computed, ref, watch } from 'vue'
// import { makeDraggable } from '@/use/MakeDraggable.js'
import { useStore } from 'vuex'
import commitmentSideBarStyleReuse from '@/use/commitmentSideBarStyleReuse.js'
import currentDisplayPositionReuse from '@/use/currentDisplayPositionReuse.js'
import checkedReuse from '@/use/checkedReuse.js'
import commitmentTextStyleReuse from '@/use/commitmentTextStyleReuse.js'

const makeListEntryDraggable = function ({
  fullCommitment,
  store,
  element,
  // onMouseDownDetails,
  // mouseDownArguments,
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
    store.commit("UPDATE_DRAG_POSITION",{e})

    let position = store.state.moving.position
    const leftSide = document.elementFromPoint(
    position.x - 1,
    position.y + position.height / 2
  )
  //action for changing the position in the display array
  if (leftSide) {
    if (!isNaN(leftSide.id) && leftSide.id !== '') {

      const parentRegex = new RegExp(parentString)
      const newParent = {
        id: [...leftSide.classList].filter((className) => parentRegex.test(className))[0].split('_')[1]
        }
        

      store.commit('UPDATE_DISPLAY_LIST_POSITIONS', {
        commitment: JSON.parse(JSON.stringify(store.state.moving.original)),
        newPosition: JSON.parse(JSON.stringify(leftSide.id)),
        newParent: JSON.parse(JSON.stringify(store.getters.commitmentById(newParent.id))),
        oldParent: JSON.parse(JSON.stringify(store.getters.commitmentById(store.state.moving.parent.id)))
      })
    }
  }
  
  }

  const onMouseDown = (e) => {
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

    //add the initial position information to the store
    store.commit('SET_AS_MOVING',{
      parent: store.getters.commitmentById(fullCommitment.value.parent.id),
      original:fullCommitment.value,
      position
      })

    // if (onMouseDownDetails) {
    //   onMouseDownDetails({ store, mouseDownArguments })
    // }
    document.addEventListener('pointermove', onMouseMove)

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
}

const parentString = 'parent'

// const onMouseDownDetails = function ({ store, mouseDownArguments:{fullCommitment} }) {
//   store.commit('SET_AS_MOVING',{parent: store.getters.commitmentById(fullCommitment.value.parent.id),original:fullCommitment.value})
  
// }

// const onMouseUpDetails = function ({ store, position }) {
//   const leftSide = document.elementFromPoint(
//     position.x - 1,
//     position.y + position.height / 2
//   )
//   const rightSide = document.elementFromPoint(
//     position.x + position.width + 1,
//     position.y + position.height / 2
//   )
//   if (leftSide || rightSide) {
//     if (
//       (!isNaN(leftSide.id) && leftSide.id !== '') ||
//       (!isNaN(rightSide.id) && rightSide.id !== '')
//     ) {
//       //     //assuming we didn't leave the current parent
//       store.commit('SET_RANKS', { parent: store.state.topParent })
//     } else {
//       store.commit('UPDATE_DISPLAY')
//     }
//   }
// }

// const onMouseMoveDetails = function ({ store, props, position, 
// // mouseMoveArguments: {fullCommitment}
// }) {
//   const leftSide = document.elementFromPoint(
//     position.x - 1,
//     position.y + position.height / 2
//   )
//   //action for changing the position in the display array
//   console.log(leftSide)
  // console.log(store.state.moving)
  // console.log(fullCommitment)
  
  // if (leftSide) {
  //   if (!isNaN(leftSide.id) && leftSide.id !== '') {

  //     const parentRegex = new RegExp(parentString)
  //     const newParent = {
  //       id: [...leftSide.classList].filter((className) => parentRegex.test(className))[0].split('_')[1]
  //       }



  //     store.commit('UPDATE_DISPLAY_LIST_POSITIONS', {
  //       commitment: props.commitment,
  //       newPosition: leftSide.id,
  //       newParent: store.getters.commitmentById(newParent.id),
  //       oldParent: store.getters.commitmentById(store.state.moving.parent.id)
  //     })
  //   }
  // }
// }

export default {
  name: 'TodoCard',
  props: {
    commitment: Object,
    parentCommitment: Object,
  },
  setup(props) {
    const store = useStore()
    //needed for attaching the mouseDown event for dragging
    const el = ref(null)

    //only get the id from the parent so need to get the full entry
    const fullCommitment = computed(() => {
      return store.getters.commitmentById(props.commitment.id)
    })
    //make the entry draggable
   makeListEntryDraggable({store,fullCommitment,element:el})
    // const { position, draggableStyle } = makeDraggable({
    //   element: el,
    //   props,
    //   store,
    //   onMouseDownDetails,
    //   mouseDownArguments: { fullCommitment },
    //   onMouseMoveDetails,
    //   mouseUpArguments: { fullCommitment },
    //   onMouseUpDetails,
    //   mouseMoveArguments: { fullCommitment }
    // })
    const entryWidth = inject('entryWidth')

    //sidebar indicator for when the element is being dragged over a particular spot
    const { commitmentSideBarStyle } = commitmentSideBarStyleReuse()

    const { currentDisplayPosition } = currentDisplayPositionReuse({store, props})

    const parent = computed(() => {
      return parentString + "_" + props.parentCommitment.id
    })

    //mark the entry as complete or not
    const {checked} = checkedReuse(store, props.commitment)

    //when checked strikethrough the text
    const commitmentTextStyle = commitmentTextStyleReuse(checked)

    return {
      entryWidth,
      commitmentTextStyle,
      el,
      // draggableStyle,
      // position,
      commitmentSideBarStyle,
      checked,
      fullCommitment,
      currentDisplayPosition,
      parent
    }
  },
}


  

  
//   complete: Boober,
</script>
