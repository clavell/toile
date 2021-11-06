<template>
  <div v-show="!isMoving" ref="el" class="circle draggable"></div>
</template>

<script>
import { makeDraggable, keyEnum } from '@/use/MakeDraggable.js'
import { useStore } from 'vuex'
import { movingEnum } from '@/use/enums.js'
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
      detailArguments: { commitment: props.commitment },
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
