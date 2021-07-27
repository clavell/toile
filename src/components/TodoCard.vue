<template>
  <div class="listentry grid grid-cols-todolistentry bg-pink-800" :style="[entryWidth,]">
    <div class="flex flex-col justify-center items-center">
      <div class="rounded-full h-5 w-5 flex items-center justify-center bg-pink-900 hover:bg-pink-700 transform active:scale-90 scale-75 hover:scale-100 transition duration-200 ease-in-out active:duration-100 cursor-pointer"></div>
    </div>
    <div class="flex items-center" >{{ entrytitle }}</div>
  </div>
</template>

<script>
import { inject } from '@vue/runtime-core'
export default {
  name: 'TodoCard',
  props: {
    //   parent: Number,
    entrytitle: String,
    //   complete: Boolean,
    //   description: String,
    //   duration: Number,
  },
  setup() {
    const entryWidth = inject('entryWidth')
    return { entryWidth }
  },
}
</script>
