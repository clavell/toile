<template>
  <div
    :style="commitmentSideBarStyle"
    class="listEntrySideBar"
    :id="currentDisplayPosition"
  ></div>
  <div
    ref="el"
    class="listentry draggable grid grid-cols-todolistentry bg-pink-800"
    :style="[entryWidth, draggableStyle]"
    :id="currentDisplayPosition"
    @mousedown.prevent
    @touchmove.prevent
  >
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
  <div v-if="position.isDragging" :id="currentDisplayPosition"></div>
</template>

<script>
import { inject } from '@vue/runtime-core'
import { computed, ref } from 'vue'
import { makeDraggable } from '@/use/MakeDraggable.js'
import { useStore } from 'vuex'
import commitmentSideBarStyleReuse from '@/use/commitmentSideBarStyleReuse.js'
import currentDisplayPositionReuse from '@/use/currentDisplayPositionReuse.js'

const onMouseUpDetails = function ({ store, position }) {
  const leftSide = document.elementFromPoint(
    position.x - 1,
    position.y + position.height / 2
  )
  const rightSide = document.elementFromPoint(
    position.x + position.width + 1,
    position.y + position.height / 2
  )
  if (leftSide || rightSide) {
    if (
      (!isNaN(leftSide.id) && leftSide.id !== '') ||
      (!isNaN(rightSide.id) && rightSide.id !== '')
    ) {
      //     //assuming we didn't leave the current parent
      store.commit('SET_RANKS', { parent: store.state.topParent })
    } else {
      store.commit('UPDATE_DISPLAY')
    }
  }
}

const onMouseMoveDetails = function ({ store, props, position, mouseMoveArguments: {fullCommitment}}) {
  const leftSide = document.elementFromPoint(
    position.x - 1,
    position.y + position.height / 2
  )
  //action for changing the position in the display array

  if (leftSide) {
    if (!isNaN(leftSide.id) && leftSide.id !== '') {
      store.commit('UPDATE_DISPLAY_LIST_POSITIONS', {
        commitment: props.commitment,
        newPosition: leftSide.id,
        parent: store.getters.commitmentById(fullCommitment.value.parent.id)
      })
    }
  }
}

export default {
  name: 'TodoCard',
  props: {
    commitment: Object,
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
    const { position, draggableStyle } = makeDraggable({
      element: el,
      props,
      store,
      // onMouseDownDetails,
      mouseDownArguments: { fullCommitment },
      onMouseMoveDetails,
      mouseUpArguments: { fullCommitment },
      onMouseUpDetails,
      mouseMoveArguments: { fullCommitment }
    })
    const entryWidth = inject('entryWidth')

    //sidebar indicator for when the element is being dragged over a particular spot
    const { commitmentSideBarStyle } = commitmentSideBarStyleReuse()

    const { currentDisplayPosition } = currentDisplayPositionReuse(store, props,fullCommitment)

    //mark the entry as complete or not
    const checked = computed({
      get: () => {
        return store.getters.commitmentById(props.commitment.id).complete
      },
      set: () => {
        store.dispatch('setAsComplete', props.commitment.id)
      },
    })

    //when checked strikethrough the text
    const commitmentTextStyle = computed(() => {
      if (checked.value) {
        return {
          textDecoration: 'line-through',
          opacity: 0.3,
        }
      }
      return {}
    })

    return {
      entryWidth,
      commitmentTextStyle,
      el,
      draggableStyle,
      position,
      commitmentSideBarStyle,
      checked,
      fullCommitment,
      currentDisplayPosition,
    }
  },
}

//   complete: Boober,
</script>
