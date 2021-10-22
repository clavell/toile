import { computed } from 'vue'

export default function (checked) {
  return computed(() => {
    if (checked.value) {
      return {
        textDecoration: 'line-through',
        opacity: 0.3,
      }
    }
    return {}
  })
}
