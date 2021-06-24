<template>
  <div class="entry" :style="[style, gridSpot]" @dragstart="drag($event)">
    <div :style="style"></div>
    <span>{{ entry.entrytitle }}</span>
  </div>
</template>

<script>
import { DateTime } from 'luxon'

export default {
  name: 'CalendarEntry',
  props: {
    entry: Object,
  },
  computed: {
    style() {
      return { backgroundColor: 'var(--list-background-colour)' }
    },
    gridSpot() {
      var startTime = DateTime.fromFormat(
        this.entry.startTime,
        this.$store.state.timeFormat
      )
      var endTime = startTime.plus({ minutes: this.entry.duration })
      return {
        gridRow: `d${startTime.toFormat(
          this.$store.state.timeFormat
        )} / d${endTime.toFormat(this.$store.state.timeFormat)}`,
      }
    },
  },
  methods:{
    drag(evt){
      evt.dataTransfer.dropEffect = 'move'
      evt.dataTransfer.effectAllowed = 'move'
      evt.dataTransfer.setData('commitmentId', this.entry.id)
    },
    
    }
  }
</script>
