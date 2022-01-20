<template>
  <button v-show="!isMoving" ref="el" class="circle draggable"></button>
</template>

<script>
import { makeDraggable, keyEnum } from '@/use/MakeDraggable.js'
import { useStore } from 'vuex'
import { movingEnum, classStringEnum } from '@/use/enums.js'
import { ref, computed } from 'vue'
import mixpanel from 'mixpanel-browser'

const key = keyEnum.shift
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
    mixpanel.track('attempted prereq set', { user: store.state.crouleur._id })
    if (leftSide || rightSide) {
      const listidRegex = new RegExp(listidString)
      const listIdStringFromDom = [...leftSide.classList].find((className) =>
        listidRegex.test(className)
      )

      if (listIdStringFromDom) {
        const listid = listIdStringFromDom.split('_')[1]

        store.dispatch('addPrerequisite', {
          commitment: { _id: listid },
          prerequisite: commitment,
          mixpanel,
        })
      }
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

    const handlers = {
      click: (e) => {
        e.stopPropagation()
        console.log('circle clicked')
        store.commit('SET_ENTRY_TO_EDIT', { entryToEdit: props.commitment })
        // console.log(store.state.entryToEdit)
      },
    }

    makeDraggable({
      handlers,
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
        store.state.moving.original._id == props.commitment._id &&
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
