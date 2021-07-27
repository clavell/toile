<template>
  <div class="listentry grid grid-cols-todolistentry bg-pink-800" :style="[entryWidth,]">
    <div class="flex flex-col justify-center items-center">
      <div class="rounded-full h-5 w-5 flex items-center justify-center bg-pink-900 hover:bg-pink-700 transform active:scale-90 scale-75 hover:scale-100 transition duration-200 ease-in-out active:duration-100 cursor-pointer" @pointerup='markAsComplete'></div>
    </div>
    <div class="flex items-center" >{{ commitment.entrytitle }}</div>
  </div>
</template>

<script>
import { inject } from '@vue/runtime-core'
export default {
  name: 'TodoCard',
  props: {
    commitment: Object,
    //   complete: Boober,
  },
  setup() {
    const entryWidth = inject('entryWidth')
    return { entryWidth }
  },
  methods:{
    markAsComplete(){
      this.$store.dispatch('setAsComplete', this.commitment.id)
    }
  }
}
</script>
