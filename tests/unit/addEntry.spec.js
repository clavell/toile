import { mount } from '@vue/test-utils'
import AddEntry from '@/components/AddEntry.vue'

describe.skip('Add Entry', () => {
  const wrapper = mount(AddEntry)
  const wrapperHtml = wrapper.html()
  it(`renders the form`, () => {
    expect(wrapperHtml).toContain('<form>')
  })

  it(`submits form with correct payload`, async () => {
    // const wrapper = mount(AddEntry)
    //find the inputs and put data in them
    // const inputs = wrapper.findAll('input')
    // expect(inputs.length).toBe(3)
    // const fields = generateEntry()
    // const fieldsArray = Object.values(fields)
    // for(let i=0; i<inputs.length; i++) {
    //   await inputs[i].setValue(fieldsArray[i])
    // }
    // expect(inputs[0].element.value).toBe(fieldsArray[0])
    // await wrapper.find('form').trigger('submit.prevent')
    // expect(wrapper.emitted().submitted).toHaveLength(0)
  })
})
