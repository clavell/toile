<template>
  <div class="entry">
    <div></div>
    <span>{{ entrytitle }}</span>
  </div>
</template>

<script>
export default {
  name: 'CalendarEntry',
  props: {
    entrytitle: String
  },
}
</script>
