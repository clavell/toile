<template>
  <div v-show="!isMoving" ref="el" class="circle draggable"></div>
</template>

<script>
import { makeDraggable, keyEnum } from '@/use/MakeDraggable.js'
import { useStore } from 'vuex'
import { movingEnum, classStringEnum } from '@/use/enums.js'
import { ref, computed } from 'vue'

const key = keyEnum.none
let details = {
  mouseDownDetails: function ({
    store,
    detailArguments: { commitment },
    position,
  }) {
    store.commit('SET_PREREQUISITE_CIRCLE_AS_MOVING', {
      original: commitment,
      position,
    })
  },
  mouseUpDetails: function ({
    leftSide,
    rightSide,
    detailArguments: { listidString, commitment },
    store,
  }) {
    if (leftSide || rightSide) {
      const listidRegex = new RegExp(listidString)
      const listIdStringFromDom = [...leftSide.classList].find((className) =>
        listidRegex.test(className)
      )

      if (listIdStringFromDom) {
        const listid = listIdStringFromDom.split('_')[1]

        store.dispatch('addPrerequisite', {
          commitment: { id: listid },
          prerequisite: commitment,
        })
      }
      // store.commit('SET_RANKS', {
      //   oldParent: store.state.moving.parent,
      //   newParent,
      //   oldDeckIndex: store.state.moving.deckIndex,
      //   newDeckIndex,
      // })
    }

    store.commit('STOP_MOVING')
  },
}

export default {
  name: 'PrerequisiteCircle',
  props: {
    commitment: Object,
  },
  setup(props) {
    const store = useStore()
    const el = ref(null)
    makeDraggable({
      store,
      element: el,
      props,
      key,
      details,
      detailArguments: {
        commitment: props.commitment,
        listidString: classStringEnum.listid,
      },
    })
    const isMoving = computed(() => {
      return (
        store.state.moving.type == movingEnum.prerequisiteCircle &&
        store.state.moving.original.id == props.commitment.id &&
        store.state.moving.position.isDragging
      )
    })
    return { el, isMoving }
  },
}
</script>

<style>
.circle {
  height: 25px;
  width: 25px;
  border-radius: 50%;
  display: inline-block;
  background-color: theme('colors.pink.700');
}
</style>
