<template>
  <div :style="buttonWidth" class="listentry" ref="el" @click="press">
    +
  </div>
</template>

<script>
import { inject } from '@vue/runtime-core'

export default {
  name: 'AddButton',
  setup(props,{ emit }) {
    const buttonWidth = inject('entryWidth')
    const press = (event) => {
      emit("press",event.target)
    }
    return { buttonWidth, press }
  },
}
</script>

<style scoped>
div {
  /* width: 80%; */
  height: var(--entry-size);
  opacity: 0.8;
  background-color: var(--entry-background-colour);
}
</style>
>
