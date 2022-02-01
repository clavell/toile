import { mount } from '@vue/test-utils'
import AddEntry from '@/components/AddEntry.vue'
import { createStore } from '@/store'
import { generateState,generateCommitments } from '@/store/stategenerator.js'

const mountAddEntryForm = ({commitmentIndex, parentIndex}, override = {}) => {
  const state = generateState()
  state.commitments = generateCommitments()

  const store = createStore({state})

  const parent = store.state.commitments[parentIndex]
  const entryToEdit = commitmentIndex ? store.state.commitments[commitmentIndex] : {}

  return {
    wrapper: mount(AddEntry, {
      props:{
        parent,
        entryToEdit,
        ...override,
      },
      global: {
          plugins: [store]
      }
    }),
    entryToEdit,
    parent,
  }
}

describe('Add Entry', () => {
  it(`renders the form`, () => {
    const {wrapper} = mountAddEntryForm({parentIndex:1})
    
  
    const wrapperHtml = wrapper.html()
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

describe('Editting a commitment', () => {
  it(`populates form fields correctly when duration is set`,() => {
    const {wrapper,entryToEdit} = mountAddEntryForm({parentIndex:2,commitmentIndex:3})
    const title = wrapper.find('[data-testid=title]')
    expect(title.element.value).toBe(entryToEdit.entrytitle)
    const duration = wrapper.find('[data-testid=duration]')
    expect(parseInt(duration.element.value)).toBe(entryToEdit.duration)
    const duedate = wrapper.find('[data-testid=duedate]')
    expect(duedate.element.value).toBe(entryToEdit.duedate)
  })

  it(`populates form fields correctly when duration is NOT set`,() => {
    const {wrapper,entryToEdit} = mountAddEntryForm({parentIndex:1,commitmentIndex:2})
    const title = wrapper.find('[data-testid=title]')
    expect(title.element.value).toBe(entryToEdit.entrytitle)
    const duration = wrapper.find('[data-testid=duration]')
    expect(duration.element.value).toBe('')
    const duedate = wrapper.find('[data-testid=duedate]')
    expect(duedate.element.value).toBe(entryToEdit.duedate)
    
  })
})
