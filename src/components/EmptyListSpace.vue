<template>
  <div :style="commitmentSideBarStyle" :id="currentDisplayPosition"></div>
  <div :id="currentDisplayPosition"></div>
</template>

<script>
import commitmentSideBarStyleReuse from '@/use/commitmentSideBarStyleReuse.js'
import currentDisplayPositionReuse from '@/use/currentDisplayPositionReuse.js'

import { useStore } from 'vuex'


export default {
  name: 'EmptyListSpace',
  props:{
    commitment: Object
  },
  setup(props) {
    const store = useStore()
    const { commitmentSideBarStyle } = commitmentSideBarStyleReuse()

    const { currentDisplayPosition } = currentDisplayPositionReuse(store, props)
    return { currentDisplayPosition, commitmentSideBarStyle }
  }
}
</script>

<style>

</style>