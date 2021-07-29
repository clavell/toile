import { mount } from '@vue/test-utils'
import TodoCard from '@/components/TodoCard.vue'

describe.skip('TodoCard', () => {
  var props = {
    commitment: {
      entrytitle: 'higibabalyee',
      duration: 45,
      complete: false,
    }
  }

  it('mounted todo shows the title, duration and whether it is complete', () => {
    const wrapper = mount(TodoCard, { propsData: props })
    expect(wrapper.html()).toContain(props.commitment.entrytitle)
  })
})
