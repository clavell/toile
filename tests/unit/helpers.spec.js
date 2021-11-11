import { generateScheduleOrder } from '@/store/helpers.js'
import { generateState } from '@/store/stategenerator.js'

describe('helpers', () => {
  it('generates the expected order of items to be scheduled', () => {
    let state = generateState()

    const expectedList = [
      { commitmentId: '7c7f45b0-4ee1-438c-9884-6f481ca39006', duration: 45 }, //Watch Videos 2
      { commitmentId: '1616ae3d-78be-4180-8870-2bd685b4e224', duration: 45 }, //Read docs 3
      { commitmentId: 'f44660e1-903e-4f5a-ba06-8b6df65bf20a', duration: 45 }, //Download 3
      { commitmentId: 'ab95afbb-da68-46bf-af93-3dcf94860078', duration: 45 }, //Install 3
      { commitmentId: '9f8161c0-5a9c-4eec-a9c8-19229fbfc8c9', duration: 0 }, //Install Vuex 2
      { commitmentId: '7ece7fc9-0a59-47b2-b87f-2e493bfb4d49', duration: 45 }, //Display Dummy Data in Calendar View PR
      { commitmentId: 'e9902504-737d-4195-9168-355d40cdb5b8', duration: 45 }, //Read docs (from make the store this time) 3
      { commitmentId: 'd4de237f-1f1b-4a8c-a9f2-6a3466e24157', duration: 45 }, //Make Task List 3
      { commitmentId: 'ebeab534-3364-4109-bd67-fe68bf6c5611', duration: 5 }, //Make Format String 3
      { commitmentId: '91f281f4-b8dc-429a-8e21-6b9d72ce8428', duration: 0 }, //Make The Store 2
      { commitmentId: '0766c8ed-4ab0-425a-8a88-02335ba51baa', duration: 0 }, //Set up Vuex 1
      { commitmentId: '9e734fe3-2920-4882-a346-e2b37df47c59', duration: 45 }, //Make Up Data 2
      { commitmentId: '516ffce2-4690-4028-89fa-77b9b8e744a3', duration: 45 }, //Add the Data 2
      { commitmentId: 'b018ade0-a120-4d59-8a72-92b2c5072411', duration: 0 }, //Add Dummy Data To Vuex 1
      { commitmentId: '601b550c-2c68-4cbe-85b6-a6a61563db1f', duration: 45 }, //Display Dummy Data in list view 1
      { commitmentId: 'a225c8ed-4ab0-425a-8a88-02335ba51baa', duration: 0 }, //scheduler app
      //now on to the machine learning project
      { commitmentId: 'a682a6fc-3dfb-4a14-a1b5-b7314c50640c', duration: 120 }, //Read relevant chapters 2
      { commitmentId: '529238bf-d5e1-401c-82ae-1ed24d441e88', duration: 60 }, //Do Keras Tutorial 2
      { commitmentId: '8e39051c-0a7b-4d5e-ab17-691ec7426374', duration: 120 }, //Decide on preliminary features 2
      { commitmentId: '584fe4b7-dc93-40b3-8b72-31cccd997df6', duration: 0 }, //Research 1
      { commitmentId: 'f9dbcdf3-48e9-4ebc-8822-d7991cbbeb4b', duration: 180 }, //Exploratory Analysis 1
      { commitmentId: '472aaa54-b1ab-4172-8a6a-437757025c64', duration: 180 }, //Engineer Features 1
      { commitmentId: '304c7cb5-41f8-403a-93be-ae3d927e2c23', duration: 240 }, //Train And Test Model 1
      { commitmentId: '39c34ba6-cff1-415b-af18-44d1e8455d7c', duration: 180 }, //Make Improvements 1
      { commitmentId: 'c1f48f53-82d8-48d6-bbae-02b0bec7036e', duration: 0 }, //special topics project
    ]

    const generatedList = generateScheduleOrder(state)

    expect(generatedList).toStrictEqual(expectedList)
  })
})
