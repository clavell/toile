<template>
  <div
    ref="el"
    class="entry"
    :style="[style, gridSpot, movingStyle]"
    @touchstart.prevent
    @mousedown.prevent
  >
    <div></div>
    <span>{{ entry.entrytitle }}</span>
  </div>
</template>

<script>
import { makeDraggable } from '@/use/MakeDraggable.js'
import { ref } from 'vue'
import { DateTime } from 'luxon'
import { useStore } from 'vuex'

export default {
  name: 'CalendarEntry',
  props: {
    entry: Object,
  },
  setup(props){
    const store = useStore()
     const el = ref(null);
      const {
        position,
        style,
      } = makeDraggable(el,props,store);

      return {
        el,
        position,
        style,
      };
  },
  data() {
    return {
      moving: null,
      left: null,
      top: null,
      shiftX: null,
      shiftY:null,
    }
  },
  computed: {
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
      if (this.moving) {
        return {
          height: this.moving.clientHeight + 'px',
          width: this.moving.clientWidth + 'px',
          position: 'fixed',
          left: this.left +'px',
          top: this.top + 'px',
        }
      }
      return {}
    },
  },
}
</script>
<style scoped>
div{
  background-color: var(--list-background-colour);
}
</style>