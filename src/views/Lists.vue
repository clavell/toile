<template>
  <div class="Lists">
    <Calendar />
    <List />
  </div>
</template>

<script>
// @ is an alias to /src
import List from '@/components/List.vue'
import Calendar from '@/components/Calendar.vue'

export default {
  name: 'Lists',
  components: {
    List,
    Calendar,
  },
}
</script>

<style>
.Lists {
  display: flex;
  justify-content: space-evenly;
}
</style>
