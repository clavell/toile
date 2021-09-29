<template>
  <div :style="commitmentSideBarStyle"></div>
  <div></div>
</template>

<script>
import commitmentSideBarStyleReuse from '@/use/commitmentSideBarStyleReuse.js'

export default {
  name: 'EmptyListSpace',
  setup() {
     return commitmentSideBarStyleReuse()
  }
}
</script>

<style>

</style>