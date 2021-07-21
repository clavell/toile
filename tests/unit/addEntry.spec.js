import { mount } from '@vue/test-utils' // we'll use this soon!
import AddEntry from '@/components/AddEntry.vue'

describe('Add Entry', () => {
  const wrapper = mount(AddEntry)
  const wrapperHtml = wrapper.html()
  it(`renders the form correctly`, () => {
    // const event = {
    //   id: 1,
    //   time: '12:00PM',
    //   date: 'September 29th, 2022',
    //   title: 'Coaching Little League'
    // }
    expect(wrapperHtml).toContain('<form>')
    // expect(wrapperHtml).toContain(event.time)
    // expect(wrapperHtml).toContain(event.title)
  })
})
