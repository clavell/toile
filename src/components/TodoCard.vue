<template>
  <div class="listentry" :style="entryWidth">
    {{ entrytitle }}
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
  data() {
    return {
      commitment: {
        id: 123456,
        parent: 0,
        title: 'Make the template',
        complete: true,
        description: 'Make the template for the list',
        duration: 45,
      },
    }
  },
}
</script>
