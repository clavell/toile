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
import { makeDraggableOld } from '@/use/MakeDraggableOld.js'
import { computed, ref } from 'vue'
import { DateTime } from 'luxon'
import { useStore } from 'vuex'
import { onMouseUpDetails } from '@/use/OnMouseUpDetailsCalendarEntry.js'

export default {
  name: 'CalendarEntry',
  props: {
    scheduleEntry: Object,
  },
  setup(props) {
    const store = useStore()
    const el = ref(null)

    const commitment = computed(() => {
      return store.getters.commitmentById(props.scheduleEntry.commitmentId)
    })

    const { position, draggableStyle } = makeDraggableOld({
      element: el,
      props,
      store,
      onMouseUpDetails,
    })

    return {
      el,
      position,
      draggableStyle,
      commitment,
    }
  },
  computed: {
    gridSpot() {
      var startTime = DateTime.fromFormat(
        this.scheduleEntry.sessionStartTime,
        this.$store.state.timeFormat
      )
      var endTime = startTime.plus({
        minutes: this.scheduleEntry.sessionDuration,
      })
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
