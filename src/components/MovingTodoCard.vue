<template>
  <div
    v-if="movingTask.position.isDragging"
    ref="el"
    class="grid grid-cols-todolistentry"
    :class="appearance"
    :style="[draggableStyle]"
    @mousedown.prevent
    @touchmove.prevent
  >
    <div
      v-if="movingTask.type == movingEnum.todoCard"
      class="flex items-center justify-center"
    >
      <input
        type="checkbox"
        :id="movingTask.original.id"
        v-model="checked"
        :checked="checked"
      />
    </div>
    <div
      v-if="movingTask.type == movingEnum.todoCard"
      class="flex items-center"
      :style="commitmentTextStyle"
    >
      <label @click.prevent :for="movingTask.original.id">{{
        movingTask.original.entrytitle
      }}</label>
    </div>
  </div>
</template>

<script>
import { computed, watch } from 'vue'
import { useStore } from 'vuex'
import checkedReuse from '@/use/checkedReuse.js'
import commitmentTextStyleReuse from '@/use/commitmentTextStyleReuse.js'
import { movingEnum } from '@/use/enums.js'

export default {
  name: 'MovingTodoCard',
  setup() {
    const store = useStore()
    const movingTask = computed(() => store.state.moving)
    const draggableStyle = computed(() => {
      if (movingTask.value.position.init) {
        return {
          position: movingTask.value.position.isDragging ? 'fixed' : '',
          left: movingTask.value.position.x + 'px',
          top: movingTask.value.position.y + 'px',
          width: movingTask.value.position.width + 'px',
          height: movingTask.value.position.height + 'px',
          'box-shadow': movingTask.value.position.isDragging
            ? '3px 6px 16px rgba(0, 0, 0, 0.15)'
            : '',
          //   "transform": movingTask.value.position.isDragging ? "translate(-3px, -6px)" : "",
          cursor: movingTask.value.position.isDragging ? 'grabbing' : 'grab',
        }
      }
      return {}
    })
    const appearance = computed(() => {
      let result
      switch (store.state.moving.type) {
        case movingEnum.prerequisiteCircle:
          result = 'circle'
          break
        case movingEnum.todoCard:
          result = 'listentry'
          break
      }
      return result
    })
    //seems to be tied to the value of the checked thing in the stategenerator
    //maybe something to do with all of the proxies etc..
    const { checked } = checkedReuse(store, movingTask.value.original)
    //this doesn't work for some reason can't get the text to be crossed out..
    const { commitmentTextStyle } = commitmentTextStyleReuse(checked)
    watch(checked, (task) => task)

    return {
      draggableStyle,
      movingTask,
      checked,
      commitmentTextStyle,
      appearance,
      movingEnum,
    }
  },
}
</script>
