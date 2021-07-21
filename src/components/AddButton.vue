<template>
  <div :style="buttonWidth" class="listentry" ref="el" @pointerup="press">
    +
  </div>
</template>

<script>
import { inject } from '@vue/runtime-core'

export default {
  name: 'AddButton',
  setup() {
    const buttonWidth = inject('entryWidth')

    return { buttonWidth, press }
  },
}

function press() {
  // addingEntry.value=true
  // document.addEventListener('pointerdown',(event) => {
  //   var x = event.clientX, y = event.clientY,
  //   elementMouseIsOver = document.elementFromPoint(x, y);
  //   if(elementMouseIsOver.classList.contains('overlay')){
  //     console.log('you clicked on overlay')
  //     addingEntry.value=false;
  //   }
  // })
  console.log('add button pressed')
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
