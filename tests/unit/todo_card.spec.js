import { mount } from '@vue/test-utils'
import TodoCard from '@/components/TodoCard.vue'

describe('TodoCard',() =>{
    var props = {
            title: 'higibabalyee',
            duration: 45,
            complete: false
            }


    it('mounted todo shows the title, duration and whether it is complete',() => {
        const wrapper = mount(TodoCard,{props: props})
        expect(wrapper.html()).toContain(props.title)
    })
})
