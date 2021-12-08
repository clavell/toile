<template>
  <!--   :style="[draggableStyle, gridSpot, blankSpaceStyle]" -->
  <div
    ref="el"
    class="commitment draggable"
    :style="[gridSpot, blankSpaceStyle]"
    @touchstart.prevent
    @mousedown.prevent
    @click="handleClick"
  >
    <div></div>
    <ul v-if="scheduleEntry.type == calendarEntryTypeEnum.CalendarEntry">
      <li v-for="commitment in commitments" :key="commitment._id">
        {{ commitment.entrytitle }}
      </li>
    </ul>
  </div>
</template>

<script>
// import { makeDraggableOld } from '@/use/MakeDraggableOld.js'
import { computed, ref } from 'vue'
import { DateTime } from 'luxon'
import { useStore } from 'vuex'
// import { onMouseUpDetails } from '@/use/OnMouseUpDetailsCalendarEntry.js'
import { calendarEntryTypeEnum } from '@/use/enums.js'

export default {
  name: 'CalendarEntry',
  props: {
    scheduleEntry: Object,
  },
  setup(props) {
    const store = useStore()
    const el = ref(null)

    const commitments = computed(() => {
      return store.getters.commitmentsByScheduleSessionId(
        props.scheduleEntry._id
      )
    })

    // const { position, draggableStyle } = makeDraggableOld({
    //   element: el,
    //   props,
    //   store,
    //   onMouseUpDetails,
    // })

    const blankSpaceStyle = computed(() => {
      if (props.scheduleEntry.type !== calendarEntryTypeEnum.CalendarEntry) {
        return { opacity: 0.1 }
      }

      return {}
    })

    const handleClick = () => {
      if (props.scheduleEntry.type == calendarEntryTypeEnum.CalendarEntry) {
        console.log('cal')
        store.commit('ADD_TO_DONT_SCHEDULE_ARRAY', {
          time: props.scheduleEntry.sessionStartTime,
        })
        store.dispatch('setSchedule', { rearrange: false })
      } else {
        console.log('blank')
        store.dispatch('removeFromDontScheduleAtArray', {
          time: props.scheduleEntry.sessionStartTime,
        })
        store.dispatch('setSchedule', { rearrange: false })
      }
    }

    return {
      el,
      // position,
      // draggableStyle,
      commitments,
      calendarEntryTypeEnum,
      blankSpaceStyle,
      handleClick,
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
blankSpace {
}

div {
  /* using tailwind classes will cause the drag and drop to stop working */
  background-color: theme('colors.pink.900');
}
</style>
