<template>
  <div :style="commitmentSideBarStyle" :id="currentDisplayPosition"></div>
  <div :id="currentDisplayPosition"></div>
</template>

<script>
import currentDisplayPositionReuse from '@/use/currentDisplayPositionReuse.js'

import { useStore } from 'vuex'

export default {
  name: 'EmptyListSpace',
  props: {
    commitment: Object,
  },
  setup(props) {
    const store = useStore()

    const { currentDisplayPosition } = currentDisplayPositionReuse(store, props)
    return { currentDisplayPosition }
  },
}
</script>

<style></style>
