<template>
  <div class="time">{{ timetext }}</div>
</template>

<script>
export default {
  name: 'SidebarTime',
  props: {
    timetext: String,
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
