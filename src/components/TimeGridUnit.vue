<template>
  <div
    class="timesegment secondary-timesegment"
    :style="{ gridArea: gridarea[0] }"
  ></div>
  <div class="timesegment" :style="{ gridArea: gridarea[1] }"></div>
</template>

<script>
export default {
  name: 'TimeGridUnit',
  props: {
    gridarea: Array,
  },
}
</script>
