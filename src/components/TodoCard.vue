<template>
  <div v-if="!position.isDragging" :style="commitmentSideBarStyle" class="listEntrySideBar" :id="currentDisplayPosition"></div>
  <div ref="el" class="listentry draggable grid grid-cols-todolistentry bg-pink-800" :style="[entryWidth,draggableStyle]" :id="currentDisplayPosition"
  @mousedown.prevent
  @touchmove.prevent
  >
    <!-- <div class="flex flex-col justify-center items-center">
      <div class="rounded-full h-5 w-5 flex items-center justify-center bg-pink-900 hover:bg-pink-700 transform active:scale-90 scale-75 hover:scale-100 transition duration-200 ease-in-out active:duration-100 cursor-pointer"
       @click='markAsComplete' @touchstart.prevent='markAsComplete' >
       </div>
    </div> -->
      <div class="flex items-center justify-center"><input type="checkbox" :id="commitment.id" v-model="checked" :checked="checked"/></div>
      <div class="flex items-center" :style="commitmentTextStyle" >
        <label 
        @click.prevent
        :for="commitment.id">{{ fullCommitment.entrytitle }}</label> 
      </div>
  </div>
</template>


<script>
import { inject } from '@vue/runtime-core'
import { computed, ref} from 'vue'
import { makeDraggable } from '@/use/MakeDraggable.js'
import { useStore } from 'vuex'
import commitmentSideBarStyleReuse from '@/use/commitmentSideBarStyleReuse.js'
import currentDisplayPositionReuse from '@/use/currentDisplayPositionReuse.js'

const onMouseUpDetails = function({store, position, mouseUpArguments:{fullCommitment}}){
  const leftSide = document.elementFromPoint(
  position.x - 1 ,
  position.y + position.height/2
  )
  
  if(leftSide){
    if(!isNaN(leftSide.id) && leftSide.id !== "") {
      //assuming we didn't leave the current parent
      //if the id is equal to the initial rank then we remove the blank from the display array
      console.log(leftSide.id, fullCommitment.value.rank,leftSide.id == fullCommitment.value.rank)
      if(leftSide.id == fullCommitment.value.rank){
        store.commit("REMOVE_BLANK_FROM_LIST")
      } else {
        const currentDisplay = store.state.currentCommitmentStackDisplayOrder.filter((el) => {
          return el.id === store.state.topParent.id
        })[0].commitments
        for(let i=0; i<currentDisplay.length; i++){
          // console.log(currentDisplay[i].id)
          // store.commit('SET_RANK',{id:currentDisplay[i].id, rank:i})
        }
      }
    } else {
      store.commit("REMOVE_BLANK_FROM_LIST")
    }

  }
}

const onMouseDownDetails = function({store, mouseDownArguments:{fullCommitment}}) {
  //want to check where in the display array is the card that's being moved
  //put a blank space in the array at that position
  store.commit('ADD_BLANK_SPACE_TO_LIST', fullCommitment.value.rank)
}

const onMouseMoveDetails = function({store, position, }){
  
  const leftSide = document.elementFromPoint(
    position.x - 1 ,
    position.y + position.height/2
  )
  console.log(leftSide.id, store.state.blankSpacePosition)
  if(leftSide){
    if((!isNaN(leftSide.id) && leftSide.id !== "") && parseInt(leftSide.id) !== store.state.blankSpacePosition) {
      store.commit('MOVE_BLANK_SPACE_TO_NEW_POSITION', parseInt(leftSide.id)) 
    }
  }
}

export default {
  name: 'TodoCard',
  props: {
    commitment: Object,
  },
  setup(props) {
    const store = useStore()
    //needed for attaching the mouseDown event for dragging
    const el = ref(null)
    
    //only get the id from the parent so need to get the full entry
    const fullCommitment = computed(() => {
      return store.getters.commitmentById(props.commitment.id)
    })
    //make the entry draggable
    const { position, draggableStyle } = makeDraggable({element:el, props, store, onMouseDownDetails, mouseDownArguments:{fullCommitment},onMouseMoveDetails, mouseUpArguments:{fullCommitment}, onMouseUpDetails})
    const entryWidth = inject('entryWidth')
    
    //sidebar indicator for when the element is being dragged over a particular spot
    const { commitmentSideBarStyle } = commitmentSideBarStyleReuse()

    const { currentDisplayPosition } = currentDisplayPositionReuse(store, props)
    
    //mark the entry as complete or not
    const checked = computed({
      get: () => {
        return store.getters.commitmentById(props.commitment.id).complete;
      },
      set: () => {
        store.dispatch('setAsComplete', props.commitment.id);
      },
    })

    //when checked strikethrough the text
    const commitmentTextStyle = computed(() => {
      if (checked.value) {
        return {
          textDecoration: 'line-through',
          opacity: 0.3,
        }
      }
      return {}
    })

    

    return { entryWidth,commitmentTextStyle, el, draggableStyle,position, commitmentSideBarStyle, checked,fullCommitment,currentDisplayPosition}
},
}

//   complete: Boober,
</script>
