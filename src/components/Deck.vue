<template>
  <!-- <div class="Lists"> -->
  <List
    v-for="list in lists"
    :key="list._id"
    :listInfo="list"
    :deckIndex="deckIndex"
  />
  <!-- </div> -->
</template>

<script>
// @ is an alias to /src
import List from '@/components/List.vue'
import { useStore } from 'vuex'
import { computed } from 'vue'
export default {
  props: {
    deckIndex: Number,
  },
  name: 'Deck',
  components: {
    List,
  },
  setup(props) {
    const store = useStore()

    const lists = computed(() => store.state.decks[props.deckIndex].deck)

    return { lists }
  },
}
</script>
