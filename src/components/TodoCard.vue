<template>
  <div
    class="listsidebar"
    :id="currentDisplayPosition"
    :class="[parent, deck]"
  ></div>
  <div
    ref="el"
    v-bind="$attrs"
    class="listentry draggable grid grid-cols-todolistentry"
    :style="[entryWidth]"
    :id="currentDisplayPosition"
    v-show="!isMoving"
    @mousedown.prevent
    @touchmove.prevent
  >
    <div class="flex items-center justify-center">
      <input
        type="checkbox"
        :id="commitment._id"
        v-model="checked"
        :checked="checked"
      />
    </div>
    <div class="flex items-center" :style="commitmentTextStyle">
      <label @click.prevent :for="commitment._id">{{
        fullCommitment.entrytitle
      }}</label>
    </div>
    <div class="flex items-center justify-center">
      <PrerequisiteCircle :commitment="fullCommitment" />
    </div>
  </div>
  <div
    v-if="isMoving"
    style="grid-row: auto / span 2"
    :id="currentDisplayPosition"
    :class="[parent, deck]"
  ></div>
</template>

<script>
import { inject } from '@vue/runtime-core'
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import currentDisplayPositionReuse from '@/use/currentDisplayPositionReuse.js'
import checkedReuse from '@/use/checkedReuse.js'
import commitmentTextStyleReuse from '@/use/commitmentTextStyleReuse.js'
import { navigateReuse } from '@/use/navigateReuse.js'
import { makeDraggable, keyEnum } from '@/use/MakeDraggable.js'
import PrerequisiteCircle from '@/components/PrerequisiteCircle.vue'
import { movingEnum, originTypeEnum, classStringEnum } from '@/use/enums.js'

const key = keyEnum.shift

//details for mouse down event when dragging particular to the list entry
function mouseDownDetails({
  store,
  detailArguments: { fullCommitment },
  position,
  props,
}) {
  const movingParent = JSON.parse(
    JSON.stringify(
      store.getters.commitmentById(fullCommitment.value.parent._id)
    )
  )

  const original = JSON.parse(JSON.stringify(fullCommitment.value))
  //add the initial position information to the store
  store.commit('SET_AS_MOVING', {
    parent: movingParent,
    original,
    position,
    deckIndex: props.deckIndex,
  })
}

//details for mouse move event when dragging particular to the list entry
function mouseMoveDetails({
  leftSide,
  detailArguments: { parentString, deckString },
  store,
}) {
  if (leftSide) {
    if (!isNaN(leftSide.id) && leftSide.id !== '') {
      const parentRegex = new RegExp(parentString)
      const newParent = {
        _id: [...leftSide.classList]
          .filter((className) => parentRegex.test(className))[0]
          .split('_')[1],
      }
      const deckRegex = new RegExp(deckString)
      const newDeckIndex = [...leftSide.classList]
        .filter((className) => deckRegex.test(className))[0]
        .split('_')[1]

      const oldParent = JSON.parse(
        JSON.stringify(
          store.getters.commitmentById(store.state.moving.parent._id)
        )
      )
      store.commit('UPDATE_DISPLAY_LIST_POSITIONS', {
        commitment: JSON.parse(JSON.stringify(store.state.moving.original)),
        newPosition: JSON.parse(JSON.stringify(leftSide.id)),
        newParent: JSON.parse(
          JSON.stringify(store.getters.commitmentById(newParent._id))
        ),
        oldParent,
        oldDeckIndex: store.state.moving.deckIndex,
        newDeckIndex,
      })
    }
  }
}
//details for mouse up event when dragging particular to the list entry
function mouseUpDetails({
  leftSide,
  rightSide,
  detailArguments: { parentString, deckString },
  store,
}) {
  if (leftSide || rightSide) {
    if (!isNaN(leftSide.id) && leftSide.id !== '') {
      //(!isNaN(rightSide.id) && rightSide.id !== '')
      const parentRegex = new RegExp(parentString)
      const newParent = {
        _id: [...leftSide.classList]
          .filter((className) => parentRegex.test(className))[0]
          .split('_')[1],
      }
      const deckRegex = new RegExp(deckString)
      const newDeckIndex = [...leftSide.classList]
        .filter((className) => deckRegex.test(className))[0]
        .split('_')[1]
      store.commit('SET_RANKS', {
        oldParent: store.state.moving.parent,
        newParent,
        oldDeckIndex: store.state.moving.deckIndex,
        newDeckIndex,
      })
    } else {
      store.dispatch('resetDecks')
    }
  }
  store.commit('STOP_MOVING')
}

let details = { mouseUpDetails, mouseMoveDetails, mouseDownDetails }
export default {
  name: 'TodoCard',
  props: {
    commitment: Object,
    parentCommitment: Object,
    deckIndex: Number,
  },
  components: {
    PrerequisiteCircle,
  },
  setup(props) {
    const store = useStore()
    //needed for attaching the mouseDown event for dragging
    const el = ref(null)

    //only get the _id from the parent so need to get the full entry
    const fullCommitment = computed(() => {
      return store.getters.commitmentById(props.commitment._id)
    })

    //make the entry draggable
    if (props.commitment.type == originTypeEnum.todoCard) {
      let handlers = {}
      handlers.click = navigateReuse({ store, props, fullCommitment })

      let detailArguments = {}
      detailArguments.deckString = classStringEnum.deck
      detailArguments.parentString = classStringEnum.parent
      detailArguments.fullCommitment = fullCommitment

      makeDraggable({
        store,
        element: el,
        props,
        handlers,
        key,
        details,
        detailArguments,
      })
    }

    const entryWidth = inject('entryWidth')

    //sidebar indicator for when the element is being dragged over a particular spot

    const { currentDisplayPosition } = currentDisplayPositionReuse({
      store,
      props,
    })

    const parent = computed(() => {
      return classStringEnum.parent + '_' + props.parentCommitment._id
    })

    const deck = computed(() => {
      return classStringEnum.deck + '_' + props.deckIndex
    })
    //mark the entry as complete or not
    const { checked } = checkedReuse(store, props.commitment)

    //when checked strikethrough the text
    const commitmentTextStyle = commitmentTextStyleReuse(checked)

    const isMoving = computed(() => {
      return (
        store.state.moving.type == movingEnum.todoCard &&
        store.state.moving.original._id == fullCommitment.value._id &&
        store.state.moving.position.isDragging
      )
    })

    return {
      entryWidth,
      commitmentTextStyle,
      el,
      checked,
      fullCommitment,
      currentDisplayPosition,
      parent,
      isMoving,
      deck,
    }
  },
}

//   complete: Boober,
</script>
<style scoped>
.listsidebar {
  background-color: var(--sidebar-color);
  border-radius: 3px;
  opacity: 0.2;
  grid-row: auto / span 2;
}
</style>
