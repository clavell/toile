import { computed } from 'vue'

const commitmentSideBarStyle = computed(() => {
  return {
    backgroundColor: 'purple',
  }
})
export default function () {
  return {
    commitmentSideBarStyle,
  }
}
