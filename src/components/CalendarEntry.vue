<template>
  <div
    class="entry"
    :style="[style, gridSpot, movingStyle]"
    @mousedown="pickup($event)"
    @onmouseup="drop($event)"
    @mousemove="move($event)"
  >
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
  data() {
    return {
      moving: null,
      left: null,
      top: null,
    }
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
    movingStyle() {
      if (this.moving && this.moving != null) {
        console.log(this.left)
        return {
          height: this.moving.clientHeight + 'px',
          width: this.moving.clientWidth + 'px',
          position: 'fixed',
          // left: this.left,
          // top: this.top,
        }
      }
      return {}
    },
  },

  methods: {
    pickup(event) {
      this.moving = event.target
      while (this.moving.className !== 'entry') {
        this.moving = this.moving.parentNode
      }
    },
    drop(event) {
      console.log(event)
      this.moving = null
    },
    move(event) {
      if (this.moving) {
        if (event.clientX) {
          // mousemove
          this.left = event.clientX - this.moving.clientWidth / 2
          this.top = event.clientY - this.moving.clientHeight / 2
        } else {
          // touchmove - assuming a single touchpoint
          this.left =
            event.changedTouches[0].clientX - this.moving.clientWidth / 2
          this.top =
            event.changedTouches[0].clientY - this.moving.clientHeight / 2
        }
      }
    },
  },
}
</script>
