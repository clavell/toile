<template>
  <div class="Lists">
    <Calendar/>
    <List 
      v-for="list in lists"
      :key="list.id"
      :listInfo="list"
    />
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
  // setup(){
  //   const lists = computed(() => {
      
  //   })
  //   return { lists, }
  // }
computed: {
    lists() {
      return this.$store.state.currentCommitmentStackDisplayOrder
    }   
  }
}

</script>

<style>
.Lists {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap:30px;
}
</style>