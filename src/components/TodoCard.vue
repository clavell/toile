<template>
  <div class="entry">
    {{ event }}
  </div>
</template>

<script>
export default {
  name: 'TodoCard',
  props: {
  //   parent: Number,
    event: String,
  //   complete: Boolean,
  //   description: String,
  //   duration: Number,
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
      }
    }
  } 
}
</script>
