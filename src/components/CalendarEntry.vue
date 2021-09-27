<template>
  <div
    ref="el"
    class="commitment draggable"
    :style="[draggableStyle, gridSpot]"
    @touchstart.prevent
    @mousedown.prevent
  >
    <div></div>
    <span>{{ commitment.entrytitle }}</span>
  </div>
</template>

<script>
import { makeDraggable } from '@/use/MakeDraggable.js'
import { ref } from 'vue'
import { DateTime } from 'luxon'
import { useStore } from 'vuex'
import { onMouseUpDetails } from '@/use/OnMouseUpDetailsCalendarEntry.js'

export default {
  name: 'CalendarEntry',
  props: {
    commitment: Object,
  },
  setup(props) {
    const store = useStore()
    const el = ref(null)
    const { position, draggableStyle } = makeDraggable(el, props, store,onMouseUpDetails)

    return {
      el,
      position,
      draggableStyle,
    }
  },
  computed: {
    gridSpot() {
      var startTime = DateTime.fromFormat(
        this.commitment.startTime,
        this.$store.state.timeFormat
      )
      var endTime = startTime.plus({ minutes: this.commitment.duration })
      return {
        gridRow: `d${startTime.toFormat(
          this.$store.state.timeFormat
        )} / d${endTime.toFormat(this.$store.state.timeFormat)}`,
      }
    },
  },
}
</script>
<style scoped>
div {
  /* using tailwind classes will cause the drag and drop to stop working */
  background-color: theme('colors.pink.900');
}
</style>
