<template>
  <div class="container">
    <div class="top">
      <div class="left-sidebar top-left"></div>
      <div class="midheader">
        <span id="topspan"></span>
        <span id="span1"></span>
        <span id="span2"></span>
      </div>
      <div class="right-sidebar"></div>
    </div>
    <div class="info">
      <div id="times-sidebar" class="left-sidebar">
        <div class="half-time"></div>
        <SidebarTime v-for="time in times" :key="time" :timetext="time" />
        <div class="half-time"></div>
      </div>
      <div class="cal" :style="{ gridTemplateRows: gridTemplateRows }">
        <TimeGridUnit
          v-for="row in gridRows"
          :key="row"
          :rowDelimeters="row"
          @dragover.prevent
          @dragenter.prevent
        />
        <CalendarEntry
          v-for="scheduleEntry in todaysScheduleEntries"
          :key="scheduleEntry.id"
          :scheduleEntry="scheduleEntry"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { DateTime } from 'luxon'

import SidebarTime from '@/components/SidebarTime.vue'
import TimeGridUnit from '@/components/TimeGridUnit.vue'
import CalendarEntry from '@/components/CalendarEntry.vue'

export default {
  name: 'Calendar',
  components: {
    SidebarTime,
    TimeGridUnit,
    CalendarEntry,
  },
  data() {
    //make the times on the sidebar
    var meridiemIndicator = ['AM', 'PM']
    var times = []
    for (var t = 0; t < meridiemIndicator.length; t++) {
      for (var i of Array(11)
        .fill()
        .map((element, index) => index)) {
        times.push(i + 1 + ' ' + meridiemIndicator[t])
      }
      if (t === 0) {
        times.push('12 PM')
      }
    }

    return {
      times,
    }
  },
  computed: {
    lineNames() {
      var lineNames = []
      var dt = DateTime.fromFormat(this.$store.state.currentDate, 'yyyyMMdd')
      var endDt = dt.plus({ days: 1 })
      var x = 0
      while (dt < endDt) {
        lineNames.push(dt.toFormat(this.$store.state.timeFormat))

        dt = dt.plus({ minute: 15 })

        //here to keep runaway while loops at bay
        x++
        if (x > 200) {
          console.log(
            `limit of ${x} grid lines reached. stopping grid declaration`
          )
          break
        }
      }
      lineNames.push(endDt.toFormat(this.$store.state.timeFormat))
      return lineNames
    },
    gridTemplateRows() {
      //this names the rows in the upper level calendar grid
      var rowLinesStyle = ''
      for (var lineName of this.lineNames) {
        rowLinesStyle += `[d${lineName}] 1fr `
      }
      return rowLinesStyle
    },
    gridRows() {
      //this gives all of the time grid elements start and end lines in the grid defined in gredtemplateRows()
      var rows = []
      for (var i = 0; i < this.lineNames.length - 1; i++) {
        rows.push({
          rowStart: this.lineNames[i],
          rowEnd: this.lineNames[i + 1],
        })
      }
      return rows
    },
    todaysScheduleEntries() {
      return this.$store.getters.commitmentsOnCurrentDate
    },
  },
}
</script>

<style>
.container {
  background-color: #101010;
  border-radius: var(--border-radius);
  padding-top: 1px;
}

.top {
  display: flex;
  width: auto;
  flex-direction: row;
  height: var(--top-thickness);
}

.top-left {
  border-radius: var(--border-radius) 0 0 0;
}

.left-sidebar {
  background-color: var(--sidebar-color);
  width: var(--sidebar-width);
}

.right-sidebar {
  background-color: var(--sidebar-color);
  border-radius: 0 var(--border-radius) 0 0;
  width: var(--scroll-bar-width);
}

.midheader {
  background-color: var(--top-colour, black);
  flex: 26;
  display: flex;
  flex-direction: column;
}
/* these spans are inside the middle of the header to provide a separator */
#topspan {
  height: 2px;
  background-color: var(--sidebar-color);
}

#span1 {
  flex: 1;
  border: var(--timesegment-separator-thickness) solid
    var(--secondary-timesegment-separator-colour, gray);
}

#span2 {
  background-color: var(--secondary-timesegment-separator-colour);
  height: 4px;
}

.timesegment {
  background-color: var(--timesegment-colour);
  grid-row: span 2;
  width: auto;
  border-bottom: var(--timesegment-separator-thickness) solid
    var(--timesegment-separator-colour, gray);
  border-left: var(--timesegment-separator-thickness) solid
    var(--secondary-timesegment-separator-colour, gray);
  border-right: var(--timesegment-separator-thickness) solid
    var(--secondary-timesegment-separator-colour, gray);
}

.secondary-timesegment {
  border-bottom: var(--timesegment-separator-thickness) solid
    var(--secondary-timesegment-separator-colour);
}

.info {
  display: flex;
  overflow-y: auto;
  height: var(--calendar-height);
}

.cal {
  flex: 1;
  /* position: relative; */
  display: grid;
  grid-template-rows: repeat(96, 1fr);
  grid-template-columns: 2fr;
  height: calc(
    48 * (var(--timesegment-height) + var(--timesegment-separator-thickness))
  );
  width: 400px;
}

body {
  background-color: var(--body-color);
  font-size: 12px;
  font-family: Arial, Helvetica, sans-serif;
  color: var(--sidebar-text-colour);
}

.time {
  padding-right: 10px;
  display: flex;
  height: calc(2 * var(--timesegment-height) + 1px);
  justify-content: flex-end;
  align-items: center;

  border-bottom: var(--timesegment-separator-thickness) solid transparent;
}

#times-sidebar {
  flex-direction: column;
  height: calc(
    48 * (var(--timesegment-height) + var(--timesegment-separator-thickness))
  );
}

.half-time {
  height: var(--timesegment-height);
  flex: 1;
  border-bottom: var(--timesegment-separator-thickness) solid
    var(--sidebar-color);
}

.commitment {
  /* grid-row: 9 / span 3; */
  background-color: #02494d;
  /* height: calc(var(--timesegment-height) - 4px); */
  width: 98%;
  margin: 4px auto;
  /* top:calc(6 * (var(--timesegment-height) + var(--timesegment-separator-thickness)) + 1px); */
  left: 5px;
  /* padding: 5px 0 0 5px; */
  border-radius: 5px;
  font-weight: bold;
  border: 0.5px solid #ffffff;
  display: flex;
  opacity: 0.7;
  grid-area: 25 / 1 / 30 / 2;
  color: white;
}

.commitment > div {
  width: 6px;
  background-color: #5d7778;
  margin-right: 3px;
  border-radius: 5px 0 0 5px;
  justify-self: flex-start;
  opacity: 0.2;
}

.commitment > span {
  padding: 3px;
}
</style>
