<template>
  <div ref="el" class="listentry draggable grid grid-cols-todolistentry bg-pink-800" :style="[entryWidth,draggableStyle]">
    <!-- <div class="flex flex-col justify-center items-center">
      <div class="rounded-full h-5 w-5 flex items-center justify-center bg-pink-900 hover:bg-pink-700 transform active:scale-90 scale-75 hover:scale-100 transition duration-200 ease-in-out active:duration-100 cursor-pointer"
       @click='markAsComplete' @touchstart.prevent='markAsComplete' >
       </div>
    </div> -->
      <div class="flex items-center justify-center"><input type="checkbox" :id="commitment.id" v-model="checked" :checked="checked"/></div>
      <div class="flex items-center" :style="style" >
        <label :for="commitment.id">{{ commitment.entrytitle }}</label> 
      </div>
  </div>
</template>


<script>
import { inject } from '@vue/runtime-core'
import { computed, ref} from 'vue'
import { makeDraggable } from '@/use/MakeDraggable.js'
import { useStore } from 'vuex'


export default {
  name: 'TodoCard',
  props: {
    commitment: Object,
  },
  setup(props) {

    const store = useStore()
    const el = ref(null)
    const { position, draggableStyle } = makeDraggable(el, props, store)
    const entryWidth = inject('entryWidth')
     
    const style = computed(() => {
    if (props.commitment.complete) {
      return {
        textDecoration: 'line-through',
        opacity: 0.3,
      }
    }
    return {}
  })

    return { entryWidth,style, el, draggableStyle,position}
},
  computed: {
    checked: {
      get() {
        return this.$store.getters.commitmentById(this.commitment.id).complete;
      },
      set() {
        this.$store.dispatch('setAsComplete', this.commitment.id);
      },
    },
  }
}

//   complete: Boober,
</script>
