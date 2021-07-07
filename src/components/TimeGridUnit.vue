<template>
  <div
    class="timesegment"
    :style="[gridRow, borderStyle]"
    @drop="onDrop($event)"
  ></div>
</template>

<script>
export default {
  name: 'TimeGridUnit',
  props: {
    rowDelimeters: Object,
  },
  computed: {
    gridRow() {
      return {
        gridArea: `d${this.rowDelimeters.rowStart} / 1 / d${this.rowDelimeters.rowEnd} / 2`,
      }
    },
    borderStyle() {
      var rowEnd = this.rowDelimeters.rowEnd
      if (rowEnd.substring(rowEnd.length - 1, rowEnd.length) === '5') {
        return { borderBottomStyle: 'none' }
      } else if (rowEnd.substring(rowEnd.length - 2, rowEnd.length) === '30') {
        return {
          borderBottom:
            'var(--timesegment-separator-thickness) solid var(--secondary-timesegment-separator-colour)',
        }
      } else {
        return {}
      }
    },
  },
  methods: {
    onDrop(evt) {
      var newStartTime = this.rowDelimeters.rowStart
      var id = evt.dataTransfer.getData('commitmentId')
      this.$store.dispatch('updateStartTime', { newStartTime, id })
    },
  },
}
</script>
