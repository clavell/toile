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
