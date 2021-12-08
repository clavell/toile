import {
  generateScheduleOrder,
  createScheduleSessions,
  createSchedule,
} from '@/store/helpers.js'
import { generateState } from '@/store/stategenerator.js'

let state

describe('helpers', () => {
  beforeEach(() => {
    //create a dummy state
    state = generateState()
  })

  it('generates the expected order of items to be scheduled', () => {
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

    const generatedListBeforeChange = [
      {
        commitmentId: '7c7f45b0-4ee1-438c-9884-6f481ca39006',
        duration: 45,
        totalTaskDuration: 45,
      },
      {
        commitmentId: '1616ae3d-78be-4180-8870-2bd685b4e224',
        duration: 45,
        totalTaskDuration: 45,
      },
      {
        commitmentId: 'f44660e1-903e-4f5a-ba06-8b6df65bf20a',
        duration: 45,
        totalTaskDuration: 45,
      },
      {
        commitmentId: 'ab95afbb-da68-46bf-af93-3dcf94860078',
        duration: 45,
        totalTaskDuration: 45,
      },
      {
        commitmentId: '9f8161c0-5a9c-4eec-a9c8-19229fbfc8c9',
        duration: 0,
        totalTaskDuration: 135,
      },
      {
        commitmentId: '7ece7fc9-0a59-47b2-b87f-2e493bfb4d49',
        duration: 45,
        totalTaskDuration: 45,
      },
      {
        commitmentId: 'e9902504-737d-4195-9168-355d40cdb5b8',
        duration: 45,
        totalTaskDuration: 45,
      },
      {
        commitmentId: 'd4de237f-1f1b-4a8c-a9f2-6a3466e24157',
        duration: 45,
        totalTaskDuration: 45,
      },
      {
        commitmentId: 'ebeab534-3364-4109-bd67-fe68bf6c5611',
        duration: 5,
        totalTaskDuration: 5,
      },
      {
        commitmentId: '91f281f4-b8dc-429a-8e21-6b9d72ce8428',
        duration: 0,
        totalTaskDuration: 95,
      },
      {
        commitmentId: '0766c8ed-4ab0-425a-8a88-02335ba51baa',
        duration: 0,
        totalTaskDuration: 275,
      },
      {
        commitmentId: '9e734fe3-2920-4882-a346-e2b37df47c59',
        duration: 45,
        totalTaskDuration: 45,
      },
      {
        commitmentId: '516ffce2-4690-4028-89fa-77b9b8e744a3',
        duration: 45,
        totalTaskDuration: 45,
      },
      {
        commitmentId: 'b018ade0-a120-4d59-8a72-92b2c5072411',
        duration: 0,
        totalTaskDuration: 90,
      },
      {
        commitmentId: '601b550c-2c68-4cbe-85b6-a6a61563db1f',
        duration: 45,
        totalTaskDuration: 45,
      },
      {
        commitmentId: 'a225c8ed-4ab0-425a-8a88-02335ba51baa',
        duration: 0,
        totalTaskDuration: 410,
      }, //this should have a totalTaskDuration of 455 due to the display data in calendar view being a prerequisite of something else.
      {
        commitmentId: 'a682a6fc-3dfb-4a14-a1b5-b7314c50640c',
        duration: 120,
        totalTaskDuration: 120,
      },

      {
        commitmentId: '529238bf-d5e1-401c-82ae-1ed24d441e88',
        duration: 60,
        totalTaskDuration: 60,
      },
      {
        commitmentId: '8e39051c-0a7b-4d5e-ab17-691ec7426374',
        duration: 120,
        totalTaskDuration: 120,
      },
      {
        commitmentId: '584fe4b7-dc93-40b3-8b72-31cccd997df6',
        duration: 0,
        totalTaskDuration: 300,
      },
      {
        commitmentId: 'f9dbcdf3-48e9-4ebc-8822-d7991cbbeb4b',
        duration: 180,
        totalTaskDuration: 180,
      },
      {
        commitmentId: '472aaa54-b1ab-4172-8a6a-437757025c64',
        duration: 180,
        totalTaskDuration: 180,
      },

      {
        commitmentId: '304c7cb5-41f8-403a-93be-ae3d927e2c23',
        duration: 240,
        totalTaskDuration: 240,
      },
      {
        commitmentId: '39c34ba6-cff1-415b-af18-44d1e8455d7c',
        duration: 180,
        totalTaskDuration: 180,
      },
      {
        commitmentId: 'c1f48f53-82d8-48d6-bbae-02b0bec7036e',
        duration: 0,
        totalTaskDuration: 1080,
      },
    ]
    generatedListBeforeChange //put this here so can keep this documentation without errors in linter, etc.
    const generatedList = generateScheduleOrder({ state })

    for (let i = 0; i < generatedList.length; i++) {
      expect(generatedList[i].commitmentId === expectedList[i].commitmentId)
      expect(generatedList[i].duration === expectedList[i].duration)
    }
    // expect(generatedList).toStrictEqual(generatedListBeforeChange)
    const schedulerAppEntry = generatedList.find((el) => {
      return el.commitmentId === 'a225c8ed-4ab0-425a-8a88-02335ba51baa'
    })
    expect(schedulerAppEntry.totalTaskDuration).toBe(455)
  })

  it('generates the appropriate scheduled bins', () => {
    const listFromGenerateScheduleOrder = [
      {
        commitmentId: '7c7f45b0-4ee1-438c-9884-6f481ca39006',
        duration: 45,
        totalTaskDuration: 45,
      },
      {
        commitmentId: '1616ae3d-78be-4180-8870-2bd685b4e224',
        duration: 45,
        totalTaskDuration: 45,
      },
      {
        commitmentId: 'f44660e1-903e-4f5a-ba06-8b6df65bf20a',
        duration: 45,
        totalTaskDuration: 45,
      },
      {
        commitmentId: 'ab95afbb-da68-46bf-af93-3dcf94860078',
        duration: 45,
        totalTaskDuration: 45,
      },
      {
        commitmentId: '9f8161c0-5a9c-4eec-a9c8-19229fbfc8c9',
        duration: 0,
        totalTaskDuration: 135,
      },
      {
        commitmentId: '7ece7fc9-0a59-47b2-b87f-2e493bfb4d49',
        duration: 45,
        totalTaskDuration: 45,
      },
      {
        commitmentId: 'e9902504-737d-4195-9168-355d40cdb5b8',
        duration: 45,
        totalTaskDuration: 45,
      },
      {
        commitmentId: 'd4de237f-1f1b-4a8c-a9f2-6a3466e24157',
        duration: 45,
        totalTaskDuration: 45,
      },
      {
        commitmentId: 'ebeab534-3364-4109-bd67-fe68bf6c5611',
        duration: 5,
        totalTaskDuration: 5,
      },
      {
        commitmentId: '91f281f4-b8dc-429a-8e21-6b9d72ce8428',
        duration: 0,
        totalTaskDuration: 95,
      },
      {
        commitmentId: '0766c8ed-4ab0-425a-8a88-02335ba51baa',
        duration: 0,
        totalTaskDuration: 275,
      },
      {
        commitmentId: '9e734fe3-2920-4882-a346-e2b37df47c59',
        duration: 45,
        totalTaskDuration: 45,
      },
      {
        commitmentId: '516ffce2-4690-4028-89fa-77b9b8e744a3',
        duration: 45,
        totalTaskDuration: 45,
      },
      {
        commitmentId: 'b018ade0-a120-4d59-8a72-92b2c5072411',
        duration: 0,
        totalTaskDuration: 90,
      },
      {
        commitmentId: '601b550c-2c68-4cbe-85b6-a6a61563db1f',
        duration: 45,
        totalTaskDuration: 45,
      },
      {
        commitmentId: 'a225c8ed-4ab0-425a-8a88-02335ba51baa',
        duration: 0,
        totalTaskDuration: 455,
      },
      {
        commitmentId: 'a682a6fc-3dfb-4a14-a1b5-b7314c50640c',
        duration: 120,
        totalTaskDuration: 120,
      },
      {
        commitmentId: '529238bf-d5e1-401c-82ae-1ed24d441e88',
        duration: 60,
        totalTaskDuration: 60,
      },
      {
        commitmentId: '8e39051c-0a7b-4d5e-ab17-691ec7426374',
        duration: 120,
        totalTaskDuration: 120,
      },
      {
        commitmentId: '584fe4b7-dc93-40b3-8b72-31cccd997df6',
        duration: 0,
        totalTaskDuration: 300,
      },
      {
        commitmentId: 'f9dbcdf3-48e9-4ebc-8822-d7991cbbeb4b',
        duration: 180,
        totalTaskDuration: 180,
      },
      {
        commitmentId: '472aaa54-b1ab-4172-8a6a-437757025c64',
        duration: 180,
        totalTaskDuration: 180,
      },
      {
        commitmentId: '304c7cb5-41f8-403a-93be-ae3d927e2c23',
        duration: 240,
        totalTaskDuration: 240,
      },
      {
        commitmentId: '39c34ba6-cff1-415b-af18-44d1e8455d7c',
        duration: 180,
        totalTaskDuration: 180,
      },
      {
        commitmentId: 'c1f48f53-82d8-48d6-bbae-02b0bec7036e',
        duration: 0,
        totalTaskDuration: 1080,
      },
    ]
    const ListToFeedIn = listFromGenerateScheduleOrder.slice(0, 2)

    const expectedOrderedSessions = [
      {
        commitments: [
          {
            commitmentId: '7c7f45b0-4ee1-438c-9884-6f481ca39006',
            duration: 25,
          },
        ],
      },
      {
        commitments: [
          {
            commitmentId: '7c7f45b0-4ee1-438c-9884-6f481ca39006',
            duration: 20,
          },
          { commitmentId: '1616ae3d-78be-4180-8870-2bd685b4e224', duration: 5 },
        ],
      },
      {
        commitments: [
          {
            commitmentId: '1616ae3d-78be-4180-8870-2bd685b4e224',
            duration: 25,
          },
        ],
      },
      {
        commitments: [
          {
            commitmentId: '1616ae3d-78be-4180-8870-2bd685b4e224',
            duration: 15,
          },
        ],
      },
    ]
    const orderedSessions = createScheduleSessions({
      orderedItemsToSchedule: ListToFeedIn,
      sessionLength: 25,
    })

    for (let i = 0; i < orderedSessions.length; i++) {
      expect(orderedSessions[i].commitments).toStrictEqual(
        expectedOrderedSessions[i].commitments
      )
    }
  })

  it('prints the whole session order to the console', () => {
    const listFromConsole = [
      {
        _id: 'b5a22384-63f1-4325-9a91-3edd63bf9252',
        commitments: [
          {
            commitmentId: '7c7f45b0-4ee1-438c-9884-6f481ca39006',
            duration: 25,
          },
        ],
      },
      {
        _id: '53f1662c-46cb-454a-aa1e-0fa7325bf694',
        commitments: [
          {
            commitmentId: '7c7f45b0-4ee1-438c-9884-6f481ca39006',
            duration: 20,
          },
          { commitmentId: '1616ae3d-78be-4180-8870-2bd685b4e224', duration: 5 },
        ],
      },
      {
        _id: '0e5e4e8d-284a-4d66-a467-df6eb332ad80',
        commitments: [
          {
            commitmentId: '1616ae3d-78be-4180-8870-2bd685b4e224',
            duration: 25,
          },
        ],
      },
      {
        _id: 'd8f71e89-82ab-4a35-bb84-5914492deaf2',
        commitments: [
          {
            commitmentId: '1616ae3d-78be-4180-8870-2bd685b4e224',
            duration: 15,
          },
          {
            commitmentId: 'f44660e1-903e-4f5a-ba06-8b6df65bf20a',
            duration: 10,
          },
        ],
      },
      {
        _id: 'cf27710c-eeb5-43c5-8a15-ce8f9e85b34d',
        commitments: [
          {
            commitmentId: 'f44660e1-903e-4f5a-ba06-8b6df65bf20a',
            duration: 25,
          },
        ],
      },
      {
        _id: '90879f6b-8fcc-4dfd-a39b-0a28e1b00918',
        commitments: [
          {
            commitmentId: 'f44660e1-903e-4f5a-ba06-8b6df65bf20a',
            duration: 10,
          },
          {
            commitmentId: 'ab95afbb-da68-46bf-af93-3dcf94860078',
            duration: 15,
          },
        ],
      },
      {
        _id: 'e617bdf5-4741-4123-84d9-1fdc22c60b9c',
        commitments: [
          {
            commitmentId: 'ab95afbb-da68-46bf-af93-3dcf94860078',
            duration: 25,
          },
        ],
      },
      {
        _id: '2c9b3dc0-21f2-42b6-99d4-4082d9809c5a',
        commitments: [
          { commitmentId: 'ab95afbb-da68-46bf-af93-3dcf94860078', duration: 5 },
          {
            commitmentId: '7ece7fc9-0a59-47b2-b87f-2e493bfb4d49',
            duration: 20,
          },
        ],
      },
      {
        _id: 'f250e346-e4a5-4ec9-9ace-02cd2d9ed487',
        commitments: [
          {
            commitmentId: '7ece7fc9-0a59-47b2-b87f-2e493bfb4d49',
            duration: 25,
          },
        ],
      },
      {
        _id: '43c583bc-2ca6-46f6-b826-9895f2ae5bcc',
        commitments: [
          {
            commitmentId: 'e9902504-737d-4195-9168-355d40cdb5b8',
            duration: 25,
          },
        ],
      },
      {
        _id: '63317b3e-4e95-42f8-ada5-67f61bb94fee',
        commitments: [
          {
            commitmentId: 'e9902504-737d-4195-9168-355d40cdb5b8',
            duration: 20,
          },
          { commitmentId: 'd4de237f-1f1b-4a8c-a9f2-6a3466e24157', duration: 5 },
        ],
      },
      {
        _id: '8466f6a3-7375-4871-baab-fb5160706373',
        commitments: [
          {
            commitmentId: 'd4de237f-1f1b-4a8c-a9f2-6a3466e24157',
            duration: 25,
          },
        ],
      },
      {
        _id: '326ec2b3-13e1-4c88-b4fa-78516539ff70',
        commitments: [
          {
            commitmentId: 'd4de237f-1f1b-4a8c-a9f2-6a3466e24157',
            duration: 15,
          },
          { commitmentId: 'ebeab534-3364-4109-bd67-fe68bf6c5611', duration: 5 },
          { commitmentId: '9e734fe3-2920-4882-a346-e2b37df47c59', duration: 5 },
        ],
      },
      {
        _id: 'c19712dc-aa5e-429d-94be-030bdbac8e88',
        commitments: [
          {
            commitmentId: '9e734fe3-2920-4882-a346-e2b37df47c59',
            duration: 25,
          },
        ],
      },
      {
        _id: '6a4d87c6-6704-4986-8045-53eec70667fd',
        commitments: [
          {
            commitmentId: '9e734fe3-2920-4882-a346-e2b37df47c59',
            duration: 15,
          },
          {
            commitmentId: '516ffce2-4690-4028-89fa-77b9b8e744a3',
            duration: 10,
          },
        ],
      },
      {
        _id: 'b5aac165-b496-4d03-84ff-e3710b3747d0',
        commitments: [
          {
            commitmentId: '516ffce2-4690-4028-89fa-77b9b8e744a3',
            duration: 25,
          },
        ],
      },
      {
        _id: 'e09ab9b6-2a86-4e14-83bc-571f0427f672',
        commitments: [
          {
            commitmentId: '516ffce2-4690-4028-89fa-77b9b8e744a3',
            duration: 10,
          },
          {
            commitmentId: '601b550c-2c68-4cbe-85b6-a6a61563db1f',
            duration: 15,
          },
        ],
      },
      {
        _id: 'e2b21333-8ec1-4d8c-ae5f-292adddaf8db',
        commitments: [
          {
            commitmentId: '601b550c-2c68-4cbe-85b6-a6a61563db1f',
            duration: 25,
          },
        ],
      },
      {
        _id: 'cf41e6da-8fb7-4afc-a658-621d85eb02c1',
        commitments: [
          { commitmentId: '601b550c-2c68-4cbe-85b6-a6a61563db1f', duration: 5 },
          {
            commitmentId: 'a682a6fc-3dfb-4a14-a1b5-b7314c50640c',
            duration: 20,
          },
        ],
      },
      {
        _id: 'cc9949d6-89dc-41f7-a91e-c28b4744b40e',
        commitments: [
          {
            commitmentId: 'a682a6fc-3dfb-4a14-a1b5-b7314c50640c',
            duration: 25,
          },
        ],
      },
      {
        _id: '6b6c9c82-f0cf-4bf3-8771-0cff84deea86',
        commitments: [
          {
            commitmentId: 'a682a6fc-3dfb-4a14-a1b5-b7314c50640c',
            duration: 25,
          },
        ],
      },
      {
        _id: '82ceb82b-1007-44c8-97d9-ab626ec3b538',
        commitments: [
          {
            commitmentId: 'a682a6fc-3dfb-4a14-a1b5-b7314c50640c',
            duration: 25,
          },
        ],
      },
      {
        _id: '22cb1201-2c06-40de-a88c-bb79f8bb2f1d',
        commitments: [
          {
            commitmentId: 'a682a6fc-3dfb-4a14-a1b5-b7314c50640c',
            duration: 25,
          },
        ],
      },
      {
        _id: 'c19153b2-fdb8-4d92-87f2-15df4b5b20f2',
        commitments: [
          {
            commitmentId: '529238bf-d5e1-401c-82ae-1ed24d441e88',
            duration: 25,
          },
        ],
      },
      {
        _id: 'c4cbf256-e2c3-4545-9193-08d1d9bd6598',
        commitments: [
          {
            commitmentId: '529238bf-d5e1-401c-82ae-1ed24d441e88',
            duration: 25,
          },
        ],
      },
      {
        _id: '5c1e9b03-1e34-4700-a85e-008b091a2936',
        commitments: [
          {
            commitmentId: '529238bf-d5e1-401c-82ae-1ed24d441e88',
            duration: 10,
          },
          {
            commitmentId: '8e39051c-0a7b-4d5e-ab17-691ec7426374',
            duration: 15,
          },
        ],
      },
      {
        _id: 'ee3faea2-ff82-4749-9dad-54be1f452543',
        commitments: [
          {
            commitmentId: '8e39051c-0a7b-4d5e-ab17-691ec7426374',
            duration: 25,
          },
        ],
      },
      {
        _id: '86055a73-b2f0-4885-8732-5d83a9dc6ac6',
        commitments: [
          {
            commitmentId: '8e39051c-0a7b-4d5e-ab17-691ec7426374',
            duration: 25,
          },
        ],
      },
      {
        _id: 'b2a557af-6430-429b-93ed-5a0e15364006',
        commitments: [
          {
            commitmentId: '8e39051c-0a7b-4d5e-ab17-691ec7426374',
            duration: 25,
          },
        ],
      },
      {
        _id: '807906be-3882-41a8-83e8-c59f069f199a',
        commitments: [
          {
            commitmentId: '8e39051c-0a7b-4d5e-ab17-691ec7426374',
            duration: 25,
          },
        ],
      },
      {
        _id: 'c41769fa-ffef-413c-8cda-ec3f6630d3c5',
        commitments: [
          { commitmentId: '8e39051c-0a7b-4d5e-ab17-691ec7426374', duration: 5 },
          {
            commitmentId: 'f9dbcdf3-48e9-4ebc-8822-d7991cbbeb4b',
            duration: 20,
          },
        ],
      },
      {
        _id: 'f8ab5e85-44cf-4ffe-93e8-593cecb50c86',
        commitments: [
          {
            commitmentId: 'f9dbcdf3-48e9-4ebc-8822-d7991cbbeb4b',
            duration: 25,
          },
        ],
      },
      {
        _id: '09b5330b-4698-4fa3-a964-69ad65172347',
        commitments: [
          {
            commitmentId: 'f9dbcdf3-48e9-4ebc-8822-d7991cbbeb4b',
            duration: 25,
          },
        ],
      },
      {
        _id: '71669344-a094-4c5b-80f1-e2740c23ca53',
        commitments: [
          {
            commitmentId: 'f9dbcdf3-48e9-4ebc-8822-d7991cbbeb4b',
            duration: 25,
          },
        ],
      },
      {
        _id: '17d11bed-00e8-4254-8681-ab9fe0d489b8',
        commitments: [
          {
            commitmentId: 'f9dbcdf3-48e9-4ebc-8822-d7991cbbeb4b',
            duration: 25,
          },
        ],
      },
      {
        _id: '2c07123b-f89d-4017-a002-1dbf3eac9547',
        commitments: [
          {
            commitmentId: 'f9dbcdf3-48e9-4ebc-8822-d7991cbbeb4b',
            duration: 25,
          },
        ],
      },
      {
        _id: 'de3e661b-cbc0-4e40-be4e-00db1cf31983',
        commitments: [
          {
            commitmentId: 'f9dbcdf3-48e9-4ebc-8822-d7991cbbeb4b',
            duration: 25,
          },
        ],
      },
      {
        _id: 'ef3e78e1-40c1-4a45-884f-b0fa84e6b6bf',
        commitments: [
          {
            commitmentId: 'f9dbcdf3-48e9-4ebc-8822-d7991cbbeb4b',
            duration: 10,
          },
          {
            commitmentId: '472aaa54-b1ab-4172-8a6a-437757025c64',
            duration: 15,
          },
        ],
      },
      {
        _id: 'ba0675e6-7703-42d3-8f6d-d5332198f361',
        commitments: [
          {
            commitmentId: '472aaa54-b1ab-4172-8a6a-437757025c64',
            duration: 25,
          },
        ],
      },
      {
        _id: '76ee093f-e1d4-4bdd-8ffb-b21cc5d923a8',
        commitments: [
          {
            commitmentId: '472aaa54-b1ab-4172-8a6a-437757025c64',
            duration: 25,
          },
        ],
      },
      {
        _id: '6b569ed1-ee73-42a4-9247-e2a83e3ff233',
        commitments: [
          {
            commitmentId: '472aaa54-b1ab-4172-8a6a-437757025c64',
            duration: 25,
          },
        ],
      },
      {
        _id: 'bf05c7ab-31b4-40fa-a9cc-676eda2ee56b',
        commitments: [
          {
            commitmentId: '472aaa54-b1ab-4172-8a6a-437757025c64',
            duration: 25,
          },
        ],
      },
      {
        _id: '2f1401fa-dd03-423e-86ac-ddc6636acdd7',
        commitments: [
          {
            commitmentId: '472aaa54-b1ab-4172-8a6a-437757025c64',
            duration: 25,
          },
        ],
      },
      {
        _id: '07dee205-8bbe-4ae5-89b0-d4cb571dd744',
        commitments: [
          {
            commitmentId: '472aaa54-b1ab-4172-8a6a-437757025c64',
            duration: 25,
          },
        ],
      },
      {
        _id: '7754a984-082b-4078-ad60-4089fcf4caec',
        commitments: [
          {
            commitmentId: '472aaa54-b1ab-4172-8a6a-437757025c64',
            duration: 15,
          },
          {
            commitmentId: '304c7cb5-41f8-403a-93be-ae3d927e2c23',
            duration: 10,
          },
        ],
      },
      {
        _id: '64899bd8-d3f7-4ed3-919a-72311438f129',
        commitments: [
          {
            commitmentId: '304c7cb5-41f8-403a-93be-ae3d927e2c23',
            duration: 25,
          },
        ],
      },
      {
        _id: '0f7cf6b4-8d69-428e-ae0e-0cf45f752c50',
        commitments: [
          {
            commitmentId: '304c7cb5-41f8-403a-93be-ae3d927e2c23',
            duration: 25,
          },
        ],
      },
      {
        _id: '8a74d890-3a40-4994-9abf-2b56d36cc974',
        commitments: [
          {
            commitmentId: '304c7cb5-41f8-403a-93be-ae3d927e2c23',
            duration: 25,
          },
        ],
      },
      {
        _id: 'db1aa832-4a7c-485b-8ac8-a61e7fc33d01',
        commitments: [
          {
            commitmentId: '304c7cb5-41f8-403a-93be-ae3d927e2c23',
            duration: 25,
          },
        ],
      },
      {
        _id: '423b5dc5-f1b8-4f0f-8a18-8400ff310cd0',
        commitments: [
          {
            commitmentId: '304c7cb5-41f8-403a-93be-ae3d927e2c23',
            duration: 25,
          },
        ],
      },
      {
        _id: 'e805917a-41dd-48eb-a454-3db6bc8d51d5',
        commitments: [
          {
            commitmentId: '304c7cb5-41f8-403a-93be-ae3d927e2c23',
            duration: 25,
          },
        ],
      },
      {
        _id: '2b66e55d-a960-459b-959c-3e1d14748057',
        commitments: [
          {
            commitmentId: '304c7cb5-41f8-403a-93be-ae3d927e2c23',
            duration: 25,
          },
        ],
      },
      {
        _id: 'ec17dd06-1110-4af6-ac0b-609611dd2b9a',
        commitments: [
          {
            commitmentId: '304c7cb5-41f8-403a-93be-ae3d927e2c23',
            duration: 25,
          },
        ],
      },
      {
        _id: '591c3be3-cb78-44c2-b4cc-0d2d8b606d30',
        commitments: [
          {
            commitmentId: '304c7cb5-41f8-403a-93be-ae3d927e2c23',
            duration: 25,
          },
        ],
      },
      {
        _id: 'c2c5c042-7846-4025-acd7-a497b0fe3b19',
        commitments: [
          { commitmentId: '304c7cb5-41f8-403a-93be-ae3d927e2c23', duration: 5 },
          {
            commitmentId: '39c34ba6-cff1-415b-af18-44d1e8455d7c',
            duration: 20,
          },
        ],
      },
      {
        _id: '4985867e-c0e9-4a50-a0a9-bbbbb67c24a4',
        commitments: [
          {
            commitmentId: '39c34ba6-cff1-415b-af18-44d1e8455d7c',
            duration: 25,
          },
        ],
      },
      {
        _id: 'ee76b7ea-7626-411e-8438-d6ded8e49454',
        commitments: [
          {
            commitmentId: '39c34ba6-cff1-415b-af18-44d1e8455d7c',
            duration: 25,
          },
        ],
      },
      {
        _id: 'f5419966-55c1-4182-bb9c-b598f940698d',
        commitments: [
          {
            commitmentId: '39c34ba6-cff1-415b-af18-44d1e8455d7c',
            duration: 25,
          },
        ],
      },
      {
        _id: '9e6f7e32-e271-42e1-910c-9aa80042b65f',
        commitments: [
          {
            commitmentId: '39c34ba6-cff1-415b-af18-44d1e8455d7c',
            duration: 25,
          },
        ],
      },
      {
        _id: '5e516b58-6014-4484-9848-372900e2a4df',
        commitments: [
          {
            commitmentId: '39c34ba6-cff1-415b-af18-44d1e8455d7c',
            duration: 25,
          },
        ],
      },
      {
        _id: 'fac01fe1-3495-45bf-83c2-ca75f8fb4ab7',
        commitments: [
          {
            commitmentId: '39c34ba6-cff1-415b-af18-44d1e8455d7c',
            duration: 25,
          },
        ],
      },
      {
        _id: '266eddc1-5625-4c14-be7d-0b9986053b23',
        commitments: [
          {
            commitmentId: '39c34ba6-cff1-415b-af18-44d1e8455d7c',
            duration: 10,
          },
        ],
      },
    ]

    const listFromGenerateScheduleOrder = [
      {
        commitmentId: '7c7f45b0-4ee1-438c-9884-6f481ca39006',
        duration: 45,
        totalTaskDuration: 45,
      },
      {
        commitmentId: '1616ae3d-78be-4180-8870-2bd685b4e224',
        duration: 45,
        totalTaskDuration: 45,
      },
      {
        commitmentId: 'f44660e1-903e-4f5a-ba06-8b6df65bf20a',
        duration: 45,
        totalTaskDuration: 45,
      },
      {
        commitmentId: 'ab95afbb-da68-46bf-af93-3dcf94860078',
        duration: 45,
        totalTaskDuration: 45,
      },
      {
        commitmentId: '9f8161c0-5a9c-4eec-a9c8-19229fbfc8c9',
        duration: 0,
        totalTaskDuration: 135,
      },
      {
        commitmentId: '7ece7fc9-0a59-47b2-b87f-2e493bfb4d49',
        duration: 45,
        totalTaskDuration: 45,
      },
      {
        commitmentId: 'e9902504-737d-4195-9168-355d40cdb5b8',
        duration: 45,
        totalTaskDuration: 45,
      },
      {
        commitmentId: 'd4de237f-1f1b-4a8c-a9f2-6a3466e24157',
        duration: 45,
        totalTaskDuration: 45,
      },
      {
        commitmentId: 'ebeab534-3364-4109-bd67-fe68bf6c5611',
        duration: 5,
        totalTaskDuration: 5,
      },
      {
        commitmentId: '91f281f4-b8dc-429a-8e21-6b9d72ce8428',
        duration: 0,
        totalTaskDuration: 95,
      },
      {
        commitmentId: '0766c8ed-4ab0-425a-8a88-02335ba51baa',
        duration: 0,
        totalTaskDuration: 275,
      },
      {
        commitmentId: '9e734fe3-2920-4882-a346-e2b37df47c59',
        duration: 45,
        totalTaskDuration: 45,
      },
      {
        commitmentId: '516ffce2-4690-4028-89fa-77b9b8e744a3',
        duration: 45,
        totalTaskDuration: 45,
      },
      {
        commitmentId: 'b018ade0-a120-4d59-8a72-92b2c5072411',
        duration: 0,
        totalTaskDuration: 90,
      },
      {
        commitmentId: '601b550c-2c68-4cbe-85b6-a6a61563db1f',
        duration: 45,
        totalTaskDuration: 45,
      },
      {
        commitmentId: 'a225c8ed-4ab0-425a-8a88-02335ba51baa',
        duration: 0,
        totalTaskDuration: 455,
      },
      {
        commitmentId: 'a682a6fc-3dfb-4a14-a1b5-b7314c50640c',
        duration: 120,
        totalTaskDuration: 120,
      },
      {
        commitmentId: '529238bf-d5e1-401c-82ae-1ed24d441e88',
        duration: 60,
        totalTaskDuration: 60,
      },
      {
        commitmentId: '8e39051c-0a7b-4d5e-ab17-691ec7426374',
        duration: 120,
        totalTaskDuration: 120,
      },
      {
        commitmentId: '584fe4b7-dc93-40b3-8b72-31cccd997df6',
        duration: 0,
        totalTaskDuration: 300,
      },
      {
        commitmentId: 'f9dbcdf3-48e9-4ebc-8822-d7991cbbeb4b',
        duration: 180,
        totalTaskDuration: 180,
      },
      {
        commitmentId: '472aaa54-b1ab-4172-8a6a-437757025c64',
        duration: 180,
        totalTaskDuration: 180,
      },
      {
        commitmentId: '304c7cb5-41f8-403a-93be-ae3d927e2c23',
        duration: 240,
        totalTaskDuration: 240,
      },
      {
        commitmentId: '39c34ba6-cff1-415b-af18-44d1e8455d7c',
        duration: 180,
        totalTaskDuration: 180,
      },
      {
        commitmentId: 'c1f48f53-82d8-48d6-bbae-02b0bec7036e',
        duration: 0,
        totalTaskDuration: 1080,
      },
    ]

    listFromConsole
    listFromGenerateScheduleOrder
    // console.log(JSON.stringify(createScheduleSessions({ orderedItemsToSchedule:listFromGenerateScheduleOrder, sessionLength:25 })))
  })

  it('creates a schedule from the session list', () => {
    const listFromConsole = [
      {
        _id: 'b5a22384-63f1-4325-9a91-3edd63bf9252',
        commitments: [
          {
            commitmentId: '7c7f45b0-4ee1-438c-9884-6f481ca39006',
            duration: 25,
          },
        ],
      },
      {
        _id: '53f1662c-46cb-454a-aa1e-0fa7325bf694',
        commitments: [
          {
            commitmentId: '7c7f45b0-4ee1-438c-9884-6f481ca39006',
            duration: 20,
          },
          { commitmentId: '1616ae3d-78be-4180-8870-2bd685b4e224', duration: 5 },
        ],
      },
      {
        _id: '0e5e4e8d-284a-4d66-a467-df6eb332ad80',
        commitments: [
          {
            commitmentId: '1616ae3d-78be-4180-8870-2bd685b4e224',
            duration: 25,
          },
        ],
      },
      {
        _id: 'd8f71e89-82ab-4a35-bb84-5914492deaf2',
        commitments: [
          {
            commitmentId: '1616ae3d-78be-4180-8870-2bd685b4e224',
            duration: 15,
          },
          {
            commitmentId: 'f44660e1-903e-4f5a-ba06-8b6df65bf20a',
            duration: 10,
          },
        ],
      },
      {
        _id: 'cf27710c-eeb5-43c5-8a15-ce8f9e85b34d',
        commitments: [
          {
            commitmentId: 'f44660e1-903e-4f5a-ba06-8b6df65bf20a',
            duration: 25,
          },
        ],
      },
      {
        _id: '90879f6b-8fcc-4dfd-a39b-0a28e1b00918',
        commitments: [
          {
            commitmentId: 'f44660e1-903e-4f5a-ba06-8b6df65bf20a',
            duration: 10,
          },
          {
            commitmentId: 'ab95afbb-da68-46bf-af93-3dcf94860078',
            duration: 15,
          },
        ],
      },
      {
        _id: 'e617bdf5-4741-4123-84d9-1fdc22c60b9c',
        commitments: [
          {
            commitmentId: 'ab95afbb-da68-46bf-af93-3dcf94860078',
            duration: 25,
          },
        ],
      },
      {
        _id: '2c9b3dc0-21f2-42b6-99d4-4082d9809c5a',
        commitments: [
          { commitmentId: 'ab95afbb-da68-46bf-af93-3dcf94860078', duration: 5 },
          {
            commitmentId: '7ece7fc9-0a59-47b2-b87f-2e493bfb4d49',
            duration: 20,
          },
        ],
      },
      {
        _id: 'f250e346-e4a5-4ec9-9ace-02cd2d9ed487',
        commitments: [
          {
            commitmentId: '7ece7fc9-0a59-47b2-b87f-2e493bfb4d49',
            duration: 25,
          },
        ],
      },
      {
        _id: '43c583bc-2ca6-46f6-b826-9895f2ae5bcc',
        commitments: [
          {
            commitmentId: 'e9902504-737d-4195-9168-355d40cdb5b8',
            duration: 25,
          },
        ],
      },
      {
        _id: '63317b3e-4e95-42f8-ada5-67f61bb94fee',
        commitments: [
          {
            commitmentId: 'e9902504-737d-4195-9168-355d40cdb5b8',
            duration: 20,
          },
          { commitmentId: 'd4de237f-1f1b-4a8c-a9f2-6a3466e24157', duration: 5 },
        ],
      },
      {
        _id: '8466f6a3-7375-4871-baab-fb5160706373',
        commitments: [
          {
            commitmentId: 'd4de237f-1f1b-4a8c-a9f2-6a3466e24157',
            duration: 25,
          },
        ],
      },
      {
        _id: '326ec2b3-13e1-4c88-b4fa-78516539ff70',
        commitments: [
          {
            commitmentId: 'd4de237f-1f1b-4a8c-a9f2-6a3466e24157',
            duration: 15,
          },
          { commitmentId: 'ebeab534-3364-4109-bd67-fe68bf6c5611', duration: 5 },
          { commitmentId: '9e734fe3-2920-4882-a346-e2b37df47c59', duration: 5 },
        ],
      },
      {
        _id: 'c19712dc-aa5e-429d-94be-030bdbac8e88',
        commitments: [
          {
            commitmentId: '9e734fe3-2920-4882-a346-e2b37df47c59',
            duration: 25,
          },
        ],
      },
      {
        _id: '6a4d87c6-6704-4986-8045-53eec70667fd',
        commitments: [
          {
            commitmentId: '9e734fe3-2920-4882-a346-e2b37df47c59',
            duration: 15,
          },
          {
            commitmentId: '516ffce2-4690-4028-89fa-77b9b8e744a3',
            duration: 10,
          },
        ],
      },
      {
        _id: 'b5aac165-b496-4d03-84ff-e3710b3747d0',
        commitments: [
          {
            commitmentId: '516ffce2-4690-4028-89fa-77b9b8e744a3',
            duration: 25,
          },
        ],
      },
      {
        _id: 'e09ab9b6-2a86-4e14-83bc-571f0427f672',
        commitments: [
          {
            commitmentId: '516ffce2-4690-4028-89fa-77b9b8e744a3',
            duration: 10,
          },
          {
            commitmentId: '601b550c-2c68-4cbe-85b6-a6a61563db1f',
            duration: 15,
          },
        ],
      },
      {
        _id: 'e2b21333-8ec1-4d8c-ae5f-292adddaf8db',
        commitments: [
          {
            commitmentId: '601b550c-2c68-4cbe-85b6-a6a61563db1f',
            duration: 25,
          },
        ],
      },
      {
        _id: 'cf41e6da-8fb7-4afc-a658-621d85eb02c1',
        commitments: [
          { commitmentId: '601b550c-2c68-4cbe-85b6-a6a61563db1f', duration: 5 },
          {
            commitmentId: 'a682a6fc-3dfb-4a14-a1b5-b7314c50640c',
            duration: 20,
          },
        ],
      },
      {
        _id: 'cc9949d6-89dc-41f7-a91e-c28b4744b40e',
        commitments: [
          {
            commitmentId: 'a682a6fc-3dfb-4a14-a1b5-b7314c50640c',
            duration: 25,
          },
        ],
      },
      {
        _id: '6b6c9c82-f0cf-4bf3-8771-0cff84deea86',
        commitments: [
          {
            commitmentId: 'a682a6fc-3dfb-4a14-a1b5-b7314c50640c',
            duration: 25,
          },
        ],
      },
      {
        _id: '82ceb82b-1007-44c8-97d9-ab626ec3b538',
        commitments: [
          {
            commitmentId: 'a682a6fc-3dfb-4a14-a1b5-b7314c50640c',
            duration: 25,
          },
        ],
      },
      {
        _id: '22cb1201-2c06-40de-a88c-bb79f8bb2f1d',
        commitments: [
          {
            commitmentId: 'a682a6fc-3dfb-4a14-a1b5-b7314c50640c',
            duration: 25,
          },
        ],
      },
      {
        _id: 'c19153b2-fdb8-4d92-87f2-15df4b5b20f2',
        commitments: [
          {
            commitmentId: '529238bf-d5e1-401c-82ae-1ed24d441e88',
            duration: 25,
          },
        ],
      },
      {
        _id: 'c4cbf256-e2c3-4545-9193-08d1d9bd6598',
        commitments: [
          {
            commitmentId: '529238bf-d5e1-401c-82ae-1ed24d441e88',
            duration: 25,
          },
        ],
      },
      {
        _id: '5c1e9b03-1e34-4700-a85e-008b091a2936',
        commitments: [
          {
            commitmentId: '529238bf-d5e1-401c-82ae-1ed24d441e88',
            duration: 10,
          },
          {
            commitmentId: '8e39051c-0a7b-4d5e-ab17-691ec7426374',
            duration: 15,
          },
        ],
      },
      {
        _id: 'ee3faea2-ff82-4749-9dad-54be1f452543',
        commitments: [
          {
            commitmentId: '8e39051c-0a7b-4d5e-ab17-691ec7426374',
            duration: 25,
          },
        ],
      },
      {
        _id: '86055a73-b2f0-4885-8732-5d83a9dc6ac6',
        commitments: [
          {
            commitmentId: '8e39051c-0a7b-4d5e-ab17-691ec7426374',
            duration: 25,
          },
        ],
      },
      {
        _id: 'b2a557af-6430-429b-93ed-5a0e15364006',
        commitments: [
          {
            commitmentId: '8e39051c-0a7b-4d5e-ab17-691ec7426374',
            duration: 25,
          },
        ],
      },
      {
        _id: '807906be-3882-41a8-83e8-c59f069f199a',
        commitments: [
          {
            commitmentId: '8e39051c-0a7b-4d5e-ab17-691ec7426374',
            duration: 25,
          },
        ],
      },
      {
        _id: 'c41769fa-ffef-413c-8cda-ec3f6630d3c5',
        commitments: [
          { commitmentId: '8e39051c-0a7b-4d5e-ab17-691ec7426374', duration: 5 },
          {
            commitmentId: 'f9dbcdf3-48e9-4ebc-8822-d7991cbbeb4b',
            duration: 20,
          },
        ],
      },
      {
        _id: 'f8ab5e85-44cf-4ffe-93e8-593cecb50c86',
        commitments: [
          {
            commitmentId: 'f9dbcdf3-48e9-4ebc-8822-d7991cbbeb4b',
            duration: 25,
          },
        ],
      },
      {
        _id: '09b5330b-4698-4fa3-a964-69ad65172347',
        commitments: [
          {
            commitmentId: 'f9dbcdf3-48e9-4ebc-8822-d7991cbbeb4b',
            duration: 25,
          },
        ],
      },
      {
        _id: '71669344-a094-4c5b-80f1-e2740c23ca53',
        commitments: [
          {
            commitmentId: 'f9dbcdf3-48e9-4ebc-8822-d7991cbbeb4b',
            duration: 25,
          },
        ],
      },
      {
        _id: '17d11bed-00e8-4254-8681-ab9fe0d489b8',
        commitments: [
          {
            commitmentId: 'f9dbcdf3-48e9-4ebc-8822-d7991cbbeb4b',
            duration: 25,
          },
        ],
      },
      {
        _id: '2c07123b-f89d-4017-a002-1dbf3eac9547',
        commitments: [
          {
            commitmentId: 'f9dbcdf3-48e9-4ebc-8822-d7991cbbeb4b',
            duration: 25,
          },
        ],
      },
      {
        _id: 'de3e661b-cbc0-4e40-be4e-00db1cf31983',
        commitments: [
          {
            commitmentId: 'f9dbcdf3-48e9-4ebc-8822-d7991cbbeb4b',
            duration: 25,
          },
        ],
      },
      {
        _id: 'ef3e78e1-40c1-4a45-884f-b0fa84e6b6bf',
        commitments: [
          {
            commitmentId: 'f9dbcdf3-48e9-4ebc-8822-d7991cbbeb4b',
            duration: 10,
          },
          {
            commitmentId: '472aaa54-b1ab-4172-8a6a-437757025c64',
            duration: 15,
          },
        ],
      },
      {
        _id: 'ba0675e6-7703-42d3-8f6d-d5332198f361',
        commitments: [
          {
            commitmentId: '472aaa54-b1ab-4172-8a6a-437757025c64',
            duration: 25,
          },
        ],
      },
      {
        _id: '76ee093f-e1d4-4bdd-8ffb-b21cc5d923a8',
        commitments: [
          {
            commitmentId: '472aaa54-b1ab-4172-8a6a-437757025c64',
            duration: 25,
          },
        ],
      },
      {
        _id: '6b569ed1-ee73-42a4-9247-e2a83e3ff233',
        commitments: [
          {
            commitmentId: '472aaa54-b1ab-4172-8a6a-437757025c64',
            duration: 25,
          },
        ],
      },
      {
        _id: 'bf05c7ab-31b4-40fa-a9cc-676eda2ee56b',
        commitments: [
          {
            commitmentId: '472aaa54-b1ab-4172-8a6a-437757025c64',
            duration: 25,
          },
        ],
      },
      {
        _id: '2f1401fa-dd03-423e-86ac-ddc6636acdd7',
        commitments: [
          {
            commitmentId: '472aaa54-b1ab-4172-8a6a-437757025c64',
            duration: 25,
          },
        ],
      },
      {
        _id: '07dee205-8bbe-4ae5-89b0-d4cb571dd744',
        commitments: [
          {
            commitmentId: '472aaa54-b1ab-4172-8a6a-437757025c64',
            duration: 25,
          },
        ],
      },
      {
        _id: '7754a984-082b-4078-ad60-4089fcf4caec',
        commitments: [
          {
            commitmentId: '472aaa54-b1ab-4172-8a6a-437757025c64',
            duration: 15,
          },
          {
            commitmentId: '304c7cb5-41f8-403a-93be-ae3d927e2c23',
            duration: 10,
          },
        ],
      },
      {
        _id: '64899bd8-d3f7-4ed3-919a-72311438f129',
        commitments: [
          {
            commitmentId: '304c7cb5-41f8-403a-93be-ae3d927e2c23',
            duration: 25,
          },
        ],
      },
      {
        _id: '0f7cf6b4-8d69-428e-ae0e-0cf45f752c50',
        commitments: [
          {
            commitmentId: '304c7cb5-41f8-403a-93be-ae3d927e2c23',
            duration: 25,
          },
        ],
      },
      {
        _id: '8a74d890-3a40-4994-9abf-2b56d36cc974',
        commitments: [
          {
            commitmentId: '304c7cb5-41f8-403a-93be-ae3d927e2c23',
            duration: 25,
          },
        ],
      },
      {
        _id: 'db1aa832-4a7c-485b-8ac8-a61e7fc33d01',
        commitments: [
          {
            commitmentId: '304c7cb5-41f8-403a-93be-ae3d927e2c23',
            duration: 25,
          },
        ],
      },
      {
        _id: '423b5dc5-f1b8-4f0f-8a18-8400ff310cd0',
        commitments: [
          {
            commitmentId: '304c7cb5-41f8-403a-93be-ae3d927e2c23',
            duration: 25,
          },
        ],
      },
      {
        _id: 'e805917a-41dd-48eb-a454-3db6bc8d51d5',
        commitments: [
          {
            commitmentId: '304c7cb5-41f8-403a-93be-ae3d927e2c23',
            duration: 25,
          },
        ],
      },
      {
        _id: '2b66e55d-a960-459b-959c-3e1d14748057',
        commitments: [
          {
            commitmentId: '304c7cb5-41f8-403a-93be-ae3d927e2c23',
            duration: 25,
          },
        ],
      },
      {
        _id: 'ec17dd06-1110-4af6-ac0b-609611dd2b9a',
        commitments: [
          {
            commitmentId: '304c7cb5-41f8-403a-93be-ae3d927e2c23',
            duration: 25,
          },
        ],
      },
      {
        _id: '591c3be3-cb78-44c2-b4cc-0d2d8b606d30',
        commitments: [
          {
            commitmentId: '304c7cb5-41f8-403a-93be-ae3d927e2c23',
            duration: 25,
          },
        ],
      },
      {
        _id: 'c2c5c042-7846-4025-acd7-a497b0fe3b19',
        commitments: [
          { commitmentId: '304c7cb5-41f8-403a-93be-ae3d927e2c23', duration: 5 },
          {
            commitmentId: '39c34ba6-cff1-415b-af18-44d1e8455d7c',
            duration: 20,
          },
        ],
      },
      {
        _id: '4985867e-c0e9-4a50-a0a9-bbbbb67c24a4',
        commitments: [
          {
            commitmentId: '39c34ba6-cff1-415b-af18-44d1e8455d7c',
            duration: 25,
          },
        ],
      },
      {
        _id: 'ee76b7ea-7626-411e-8438-d6ded8e49454',
        commitments: [
          {
            commitmentId: '39c34ba6-cff1-415b-af18-44d1e8455d7c',
            duration: 25,
          },
        ],
      },
      {
        _id: 'f5419966-55c1-4182-bb9c-b598f940698d',
        commitments: [
          {
            commitmentId: '39c34ba6-cff1-415b-af18-44d1e8455d7c',
            duration: 25,
          },
        ],
      },
      {
        _id: '9e6f7e32-e271-42e1-910c-9aa80042b65f',
        commitments: [
          {
            commitmentId: '39c34ba6-cff1-415b-af18-44d1e8455d7c',
            duration: 25,
          },
        ],
      },
      {
        _id: '5e516b58-6014-4484-9848-372900e2a4df',
        commitments: [
          {
            commitmentId: '39c34ba6-cff1-415b-af18-44d1e8455d7c',
            duration: 25,
          },
        ],
      },
      {
        _id: 'fac01fe1-3495-45bf-83c2-ca75f8fb4ab7',
        commitments: [
          {
            commitmentId: '39c34ba6-cff1-415b-af18-44d1e8455d7c',
            duration: 25,
          },
        ],
      },
      {
        _id: '266eddc1-5625-4c14-be7d-0b9986053b23',
        commitments: [
          {
            commitmentId: '39c34ba6-cff1-415b-af18-44d1e8455d7c',
            duration: 10,
          },
        ],
      },
    ]
    const timeOfCallToSchedule = '202106201050'
    const listSample = listFromConsole.slice(0, 5)

    //'1115','1145','1300','1330','1400'
    const expectedSchedule = [
      {
        commitments: [
          {
            commitmentId: '7c7f45b0-4ee1-438c-9884-6f481ca39006',
            duration: 25,
          },
        ],
        sessionStartTime: '202106201115',
        sessionDuration: 30,
      },
      {
        commitments: [
          {
            commitmentId: '7c7f45b0-4ee1-438c-9884-6f481ca39006',
            duration: 20,
          },
          { commitmentId: '1616ae3d-78be-4180-8870-2bd685b4e224', duration: 5 },
        ],
        sessionStartTime: '202106201145',
        sessionDuration: 30,
      },
      {
        commitments: [
          {
            commitmentId: '1616ae3d-78be-4180-8870-2bd685b4e224',
            duration: 25,
          },
        ],
        sessionStartTime: '202106201300',
        sessionDuration: 30,
      },
      {
        commitments: [
          {
            commitmentId: '1616ae3d-78be-4180-8870-2bd685b4e224',
            duration: 15,
          },
          {
            commitmentId: 'f44660e1-903e-4f5a-ba06-8b6df65bf20a',
            duration: 10,
          },
        ],
        sessionStartTime: '202106201330',
        sessionDuration: 30,
      },
      {
        commitments: [
          {
            commitmentId: 'f44660e1-903e-4f5a-ba06-8b6df65bf20a',
            duration: 25,
          },
        ],
        sessionStartTime: '202106201400',
        sessionDuration: 30,
      },
    ]

    const schedule = createSchedule({
      state,
      orderedSessions: listSample,
      timeOfCallToSchedule,
    })

    //expect the first 5
    for (let i = 0; i < expectedSchedule.length; i++) {
      expect(schedule[i].sessionStartTime).toBe(
        expectedSchedule[i].sessionStartTime
      )
    }
  })

  it('creates a schedule from the session list over day break', () => {
    const listFromConsole = [
      {
        _id: 'b5a22384-63f1-4325-9a91-3edd63bf9252',
        commitments: [
          {
            commitmentId: '7c7f45b0-4ee1-438c-9884-6f481ca39006',
            duration: 25,
          },
        ],
      },
      {
        _id: '53f1662c-46cb-454a-aa1e-0fa7325bf694',
        commitments: [
          {
            commitmentId: '7c7f45b0-4ee1-438c-9884-6f481ca39006',
            duration: 20,
          },
          { commitmentId: '1616ae3d-78be-4180-8870-2bd685b4e224', duration: 5 },
        ],
      },
      {
        _id: '0e5e4e8d-284a-4d66-a467-df6eb332ad80',
        commitments: [
          {
            commitmentId: '1616ae3d-78be-4180-8870-2bd685b4e224',
            duration: 25,
          },
        ],
      },
      {
        _id: 'd8f71e89-82ab-4a35-bb84-5914492deaf2',
        commitments: [
          {
            commitmentId: '1616ae3d-78be-4180-8870-2bd685b4e224',
            duration: 15,
          },
          {
            commitmentId: 'f44660e1-903e-4f5a-ba06-8b6df65bf20a',
            duration: 10,
          },
        ],
      },
      {
        _id: 'cf27710c-eeb5-43c5-8a15-ce8f9e85b34d',
        commitments: [
          {
            commitmentId: 'f44660e1-903e-4f5a-ba06-8b6df65bf20a',
            duration: 25,
          },
        ],
      },
      {
        _id: '90879f6b-8fcc-4dfd-a39b-0a28e1b00918',
        commitments: [
          {
            commitmentId: 'f44660e1-903e-4f5a-ba06-8b6df65bf20a',
            duration: 10,
          },
          {
            commitmentId: 'ab95afbb-da68-46bf-af93-3dcf94860078',
            duration: 15,
          },
        ],
      },
      {
        _id: 'e617bdf5-4741-4123-84d9-1fdc22c60b9c',
        commitments: [
          {
            commitmentId: 'ab95afbb-da68-46bf-af93-3dcf94860078',
            duration: 25,
          },
        ],
      },
      {
        _id: '2c9b3dc0-21f2-42b6-99d4-4082d9809c5a',
        commitments: [
          { commitmentId: 'ab95afbb-da68-46bf-af93-3dcf94860078', duration: 5 },
          {
            commitmentId: '7ece7fc9-0a59-47b2-b87f-2e493bfb4d49',
            duration: 20,
          },
        ],
      },
      {
        _id: 'f250e346-e4a5-4ec9-9ace-02cd2d9ed487',
        commitments: [
          {
            commitmentId: '7ece7fc9-0a59-47b2-b87f-2e493bfb4d49',
            duration: 25,
          },
        ],
      },
      {
        _id: '43c583bc-2ca6-46f6-b826-9895f2ae5bcc',
        commitments: [
          {
            commitmentId: 'e9902504-737d-4195-9168-355d40cdb5b8',
            duration: 25,
          },
        ],
      },
      {
        _id: '63317b3e-4e95-42f8-ada5-67f61bb94fee',
        commitments: [
          {
            commitmentId: 'e9902504-737d-4195-9168-355d40cdb5b8',
            duration: 20,
          },
          { commitmentId: 'd4de237f-1f1b-4a8c-a9f2-6a3466e24157', duration: 5 },
        ],
      },
      {
        _id: '8466f6a3-7375-4871-baab-fb5160706373',
        commitments: [
          {
            commitmentId: 'd4de237f-1f1b-4a8c-a9f2-6a3466e24157',
            duration: 25,
          },
        ],
      },
      {
        _id: '326ec2b3-13e1-4c88-b4fa-78516539ff70',
        commitments: [
          {
            commitmentId: 'd4de237f-1f1b-4a8c-a9f2-6a3466e24157',
            duration: 15,
          },
          { commitmentId: 'ebeab534-3364-4109-bd67-fe68bf6c5611', duration: 5 },
          { commitmentId: '9e734fe3-2920-4882-a346-e2b37df47c59', duration: 5 },
        ],
      },
      {
        _id: 'c19712dc-aa5e-429d-94be-030bdbac8e88',
        commitments: [
          {
            commitmentId: '9e734fe3-2920-4882-a346-e2b37df47c59',
            duration: 25,
          },
        ],
      },
      {
        _id: '6a4d87c6-6704-4986-8045-53eec70667fd',
        commitments: [
          {
            commitmentId: '9e734fe3-2920-4882-a346-e2b37df47c59',
            duration: 15,
          },
          {
            commitmentId: '516ffce2-4690-4028-89fa-77b9b8e744a3',
            duration: 10,
          },
        ],
      },
      {
        _id: 'b5aac165-b496-4d03-84ff-e3710b3747d0',
        commitments: [
          {
            commitmentId: '516ffce2-4690-4028-89fa-77b9b8e744a3',
            duration: 25,
          },
        ],
      },
      {
        _id: 'e09ab9b6-2a86-4e14-83bc-571f0427f672',
        commitments: [
          {
            commitmentId: '516ffce2-4690-4028-89fa-77b9b8e744a3',
            duration: 10,
          },
          {
            commitmentId: '601b550c-2c68-4cbe-85b6-a6a61563db1f',
            duration: 15,
          },
        ],
      },
      {
        _id: 'e2b21333-8ec1-4d8c-ae5f-292adddaf8db',
        commitments: [
          {
            commitmentId: '601b550c-2c68-4cbe-85b6-a6a61563db1f',
            duration: 25,
          },
        ],
      },
      {
        _id: 'cf41e6da-8fb7-4afc-a658-621d85eb02c1',
        commitments: [
          { commitmentId: '601b550c-2c68-4cbe-85b6-a6a61563db1f', duration: 5 },
          {
            commitmentId: 'a682a6fc-3dfb-4a14-a1b5-b7314c50640c',
            duration: 20,
          },
        ],
      },
      {
        _id: 'cc9949d6-89dc-41f7-a91e-c28b4744b40e',
        commitments: [
          {
            commitmentId: 'a682a6fc-3dfb-4a14-a1b5-b7314c50640c',
            duration: 25,
          },
        ],
      },
      {
        _id: '6b6c9c82-f0cf-4bf3-8771-0cff84deea86',
        commitments: [
          {
            commitmentId: 'a682a6fc-3dfb-4a14-a1b5-b7314c50640c',
            duration: 25,
          },
        ],
      },
      {
        _id: '82ceb82b-1007-44c8-97d9-ab626ec3b538',
        commitments: [
          {
            commitmentId: 'a682a6fc-3dfb-4a14-a1b5-b7314c50640c',
            duration: 25,
          },
        ],
      },
      {
        _id: '22cb1201-2c06-40de-a88c-bb79f8bb2f1d',
        commitments: [
          {
            commitmentId: 'a682a6fc-3dfb-4a14-a1b5-b7314c50640c',
            duration: 25,
          },
        ],
      },
      {
        _id: 'c19153b2-fdb8-4d92-87f2-15df4b5b20f2',
        commitments: [
          {
            commitmentId: '529238bf-d5e1-401c-82ae-1ed24d441e88',
            duration: 25,
          },
        ],
      },
      {
        _id: 'c4cbf256-e2c3-4545-9193-08d1d9bd6598',
        commitments: [
          {
            commitmentId: '529238bf-d5e1-401c-82ae-1ed24d441e88',
            duration: 25,
          },
        ],
      },
      {
        _id: '5c1e9b03-1e34-4700-a85e-008b091a2936',
        commitments: [
          {
            commitmentId: '529238bf-d5e1-401c-82ae-1ed24d441e88',
            duration: 10,
          },
          {
            commitmentId: '8e39051c-0a7b-4d5e-ab17-691ec7426374',
            duration: 15,
          },
        ],
      },
      {
        _id: 'ee3faea2-ff82-4749-9dad-54be1f452543',
        commitments: [
          {
            commitmentId: '8e39051c-0a7b-4d5e-ab17-691ec7426374',
            duration: 25,
          },
        ],
      },
      {
        _id: '86055a73-b2f0-4885-8732-5d83a9dc6ac6',
        commitments: [
          {
            commitmentId: '8e39051c-0a7b-4d5e-ab17-691ec7426374',
            duration: 25,
          },
        ],
      },
      {
        _id: 'b2a557af-6430-429b-93ed-5a0e15364006',
        commitments: [
          {
            commitmentId: '8e39051c-0a7b-4d5e-ab17-691ec7426374',
            duration: 25,
          },
        ],
      },
      {
        _id: '807906be-3882-41a8-83e8-c59f069f199a',
        commitments: [
          {
            commitmentId: '8e39051c-0a7b-4d5e-ab17-691ec7426374',
            duration: 25,
          },
        ],
      },
      {
        _id: 'c41769fa-ffef-413c-8cda-ec3f6630d3c5',
        commitments: [
          { commitmentId: '8e39051c-0a7b-4d5e-ab17-691ec7426374', duration: 5 },
          {
            commitmentId: 'f9dbcdf3-48e9-4ebc-8822-d7991cbbeb4b',
            duration: 20,
          },
        ],
      },
      {
        _id: 'f8ab5e85-44cf-4ffe-93e8-593cecb50c86',
        commitments: [
          {
            commitmentId: 'f9dbcdf3-48e9-4ebc-8822-d7991cbbeb4b',
            duration: 25,
          },
        ],
      },
      {
        _id: '09b5330b-4698-4fa3-a964-69ad65172347',
        commitments: [
          {
            commitmentId: 'f9dbcdf3-48e9-4ebc-8822-d7991cbbeb4b',
            duration: 25,
          },
        ],
      },
      {
        _id: '71669344-a094-4c5b-80f1-e2740c23ca53',
        commitments: [
          {
            commitmentId: 'f9dbcdf3-48e9-4ebc-8822-d7991cbbeb4b',
            duration: 25,
          },
        ],
      },
      {
        _id: '17d11bed-00e8-4254-8681-ab9fe0d489b8',
        commitments: [
          {
            commitmentId: 'f9dbcdf3-48e9-4ebc-8822-d7991cbbeb4b',
            duration: 25,
          },
        ],
      },
      {
        _id: '2c07123b-f89d-4017-a002-1dbf3eac9547',
        commitments: [
          {
            commitmentId: 'f9dbcdf3-48e9-4ebc-8822-d7991cbbeb4b',
            duration: 25,
          },
        ],
      },
      {
        _id: 'de3e661b-cbc0-4e40-be4e-00db1cf31983',
        commitments: [
          {
            commitmentId: 'f9dbcdf3-48e9-4ebc-8822-d7991cbbeb4b',
            duration: 25,
          },
        ],
      },
      {
        _id: 'ef3e78e1-40c1-4a45-884f-b0fa84e6b6bf',
        commitments: [
          {
            commitmentId: 'f9dbcdf3-48e9-4ebc-8822-d7991cbbeb4b',
            duration: 10,
          },
          {
            commitmentId: '472aaa54-b1ab-4172-8a6a-437757025c64',
            duration: 15,
          },
        ],
      },
      {
        _id: 'ba0675e6-7703-42d3-8f6d-d5332198f361',
        commitments: [
          {
            commitmentId: '472aaa54-b1ab-4172-8a6a-437757025c64',
            duration: 25,
          },
        ],
      },
      {
        _id: '76ee093f-e1d4-4bdd-8ffb-b21cc5d923a8',
        commitments: [
          {
            commitmentId: '472aaa54-b1ab-4172-8a6a-437757025c64',
            duration: 25,
          },
        ],
      },
      {
        _id: '6b569ed1-ee73-42a4-9247-e2a83e3ff233',
        commitments: [
          {
            commitmentId: '472aaa54-b1ab-4172-8a6a-437757025c64',
            duration: 25,
          },
        ],
      },
      {
        _id: 'bf05c7ab-31b4-40fa-a9cc-676eda2ee56b',
        commitments: [
          {
            commitmentId: '472aaa54-b1ab-4172-8a6a-437757025c64',
            duration: 25,
          },
        ],
      },
      {
        _id: '2f1401fa-dd03-423e-86ac-ddc6636acdd7',
        commitments: [
          {
            commitmentId: '472aaa54-b1ab-4172-8a6a-437757025c64',
            duration: 25,
          },
        ],
      },
      {
        _id: '07dee205-8bbe-4ae5-89b0-d4cb571dd744',
        commitments: [
          {
            commitmentId: '472aaa54-b1ab-4172-8a6a-437757025c64',
            duration: 25,
          },
        ],
      },
      {
        _id: '7754a984-082b-4078-ad60-4089fcf4caec',
        commitments: [
          {
            commitmentId: '472aaa54-b1ab-4172-8a6a-437757025c64',
            duration: 15,
          },
          {
            commitmentId: '304c7cb5-41f8-403a-93be-ae3d927e2c23',
            duration: 10,
          },
        ],
      },
      {
        _id: '64899bd8-d3f7-4ed3-919a-72311438f129',
        commitments: [
          {
            commitmentId: '304c7cb5-41f8-403a-93be-ae3d927e2c23',
            duration: 25,
          },
        ],
      },
      {
        _id: '0f7cf6b4-8d69-428e-ae0e-0cf45f752c50',
        commitments: [
          {
            commitmentId: '304c7cb5-41f8-403a-93be-ae3d927e2c23',
            duration: 25,
          },
        ],
      },
      {
        _id: '8a74d890-3a40-4994-9abf-2b56d36cc974',
        commitments: [
          {
            commitmentId: '304c7cb5-41f8-403a-93be-ae3d927e2c23',
            duration: 25,
          },
        ],
      },
      {
        _id: 'db1aa832-4a7c-485b-8ac8-a61e7fc33d01',
        commitments: [
          {
            commitmentId: '304c7cb5-41f8-403a-93be-ae3d927e2c23',
            duration: 25,
          },
        ],
      },
      {
        _id: '423b5dc5-f1b8-4f0f-8a18-8400ff310cd0',
        commitments: [
          {
            commitmentId: '304c7cb5-41f8-403a-93be-ae3d927e2c23',
            duration: 25,
          },
        ],
      },
      {
        _id: 'e805917a-41dd-48eb-a454-3db6bc8d51d5',
        commitments: [
          {
            commitmentId: '304c7cb5-41f8-403a-93be-ae3d927e2c23',
            duration: 25,
          },
        ],
      },
      {
        _id: '2b66e55d-a960-459b-959c-3e1d14748057',
        commitments: [
          {
            commitmentId: '304c7cb5-41f8-403a-93be-ae3d927e2c23',
            duration: 25,
          },
        ],
      },
      {
        _id: 'ec17dd06-1110-4af6-ac0b-609611dd2b9a',
        commitments: [
          {
            commitmentId: '304c7cb5-41f8-403a-93be-ae3d927e2c23',
            duration: 25,
          },
        ],
      },
      {
        _id: '591c3be3-cb78-44c2-b4cc-0d2d8b606d30',
        commitments: [
          {
            commitmentId: '304c7cb5-41f8-403a-93be-ae3d927e2c23',
            duration: 25,
          },
        ],
      },
      {
        _id: 'c2c5c042-7846-4025-acd7-a497b0fe3b19',
        commitments: [
          { commitmentId: '304c7cb5-41f8-403a-93be-ae3d927e2c23', duration: 5 },
          {
            commitmentId: '39c34ba6-cff1-415b-af18-44d1e8455d7c',
            duration: 20,
          },
        ],
      },
      {
        _id: '4985867e-c0e9-4a50-a0a9-bbbbb67c24a4',
        commitments: [
          {
            commitmentId: '39c34ba6-cff1-415b-af18-44d1e8455d7c',
            duration: 25,
          },
        ],
      },
      {
        _id: 'ee76b7ea-7626-411e-8438-d6ded8e49454',
        commitments: [
          {
            commitmentId: '39c34ba6-cff1-415b-af18-44d1e8455d7c',
            duration: 25,
          },
        ],
      },
      {
        _id: 'f5419966-55c1-4182-bb9c-b598f940698d',
        commitments: [
          {
            commitmentId: '39c34ba6-cff1-415b-af18-44d1e8455d7c',
            duration: 25,
          },
        ],
      },
      {
        _id: '9e6f7e32-e271-42e1-910c-9aa80042b65f',
        commitments: [
          {
            commitmentId: '39c34ba6-cff1-415b-af18-44d1e8455d7c',
            duration: 25,
          },
        ],
      },
      {
        _id: '5e516b58-6014-4484-9848-372900e2a4df',
        commitments: [
          {
            commitmentId: '39c34ba6-cff1-415b-af18-44d1e8455d7c',
            duration: 25,
          },
        ],
      },
      {
        _id: 'fac01fe1-3495-45bf-83c2-ca75f8fb4ab7',
        commitments: [
          {
            commitmentId: '39c34ba6-cff1-415b-af18-44d1e8455d7c',
            duration: 25,
          },
        ],
      },
      {
        _id: '266eddc1-5625-4c14-be7d-0b9986053b23',
        commitments: [
          {
            commitmentId: '39c34ba6-cff1-415b-af18-44d1e8455d7c',
            duration: 10,
          },
        ],
      },
    ]
    const timeOfCallToSchedule = '202106201620'
    const listSample = listFromConsole.slice(0, 5)

    // '0900','0930','1000','1045','1115','1145','1300','1330','1400','1445','1515','1545','1630','1700','1730'
    const expectedSchedule = [
      {
        commitments: [
          {
            commitmentId: '7c7f45b0-4ee1-438c-9884-6f481ca39006',
            duration: 25,
          },
        ],
        sessionStartTime: '202106201630',
        sessionDuration: 30,
      },
      {
        commitments: [
          {
            commitmentId: '7c7f45b0-4ee1-438c-9884-6f481ca39006',
            duration: 20,
          },
          { commitmentId: '1616ae3d-78be-4180-8870-2bd685b4e224', duration: 5 },
        ],
        sessionStartTime: '202106201700',
        sessionDuration: 30,
      },
      {
        commitments: [
          {
            commitmentId: '1616ae3d-78be-4180-8870-2bd685b4e224',
            duration: 25,
          },
        ],
        sessionStartTime: '202106201730',
        sessionDuration: 30,
      },
      {
        commitments: [
          {
            commitmentId: '1616ae3d-78be-4180-8870-2bd685b4e224',
            duration: 15,
          },
          {
            commitmentId: 'f44660e1-903e-4f5a-ba06-8b6df65bf20a',
            duration: 10,
          },
        ],
        sessionStartTime: '202106210900',
        sessionDuration: 30,
      },
      {
        commitments: [
          {
            commitmentId: 'f44660e1-903e-4f5a-ba06-8b6df65bf20a',
            duration: 25,
          },
        ],
        sessionStartTime: '202106210930',
        sessionDuration: 30,
      },
    ]

    const schedule = createSchedule({
      state,
      orderedSessions: listSample,
      timeOfCallToSchedule,
    })

    //expect the first 5
    for (let i = 0; i < expectedSchedule.length; i++) {
      expect(schedule[i].sessionStartTime).toBe(
        expectedSchedule[i].sessionStartTime
      )
    }
  })

  it('runs the generate schedule order with rearrange is true', () => {
    const commit = jest.fn()
    state.previousRearrange = {
      entrytitle: 'Special Topics Project',
      duedate: '18/11/2021',
      parent: { _id: '55f5eccd-5fb9-4976-88f7-4376e0af0ac8' },
      _id: 'c1f48f53-82d8-48d6-bbae-02b0bec7036e',
      complete: false,
      rank: 1,
    }

    generateScheduleOrder({ state, commit, rearrange: true })
  })

  it.only('runs the generateScheudleOrder function with the new database data', () => {
    const databaseData = [
      {
        __typename: 'Commitment',
        _id: '317239000319394384',
        entrytitle: 'Projects',
        parent: { _id: null },
        selfAsParent: {
          __typename: 'ParentToChildren',
          _id: '317239000329880144',
        },
        duedate: null,
        complete: false,
        rank: null,
      },
      {
        __typename: 'Commitment',
        _id: '317239077003854416',
        entrytitle: "test user 1's final project",
        parent: {
          __typename: 'Commitment',
          _id: '317239000319394384',
          entrytitle: 'Projects',
        },
        selfAsParent: {
          __typename: 'ParentToChildren',
          _id: '317239077004902992',
        },
        duedate: '20211203',
        complete: false,
        rank: null,
      },
      {
        __typename: 'Commitment',
        _id: '317259928110629441',
        entrytitle: 'testuser1 subtask 1',
        parent: {
          __typename: 'Commitment',
          _id: '317239077003854416',
          entrytitle: "test user 1's final project",
        },
        selfAsParent: {
          __typename: 'ParentToChildren',
          _id: '317259928111678017',
        },
        duedate: null,
        complete: false,
        rank: null,
      },
      {
        __typename: 'Commitment',
        _id: '317259988602978880',
        entrytitle: 'testuser1 subtask 2',
        parent: {
          __typename: 'Commitment',
          _id: '317239077003854416',
          entrytitle: "test user 1's final project",
        },
        selfAsParent: {
          __typename: 'ParentToChildren',
          _id: '317259988950057536',
        },
        duedate: null,
        complete: false,
        rank: null,
      },
      {
        __typename: 'Commitment',
        _id: '317359415048012354',
        entrytitle: 'testuser1 subtask 3',
        parent: {
          __typename: 'Commitment',
          _id: '317239077003854416',
          entrytitle: "test user 1's final project",
        },
        selfAsParent: {
          __typename: 'ParentToChildren',
          _id: '317359415159161410',
        },
        duedate: null,
        complete: false,
        rank: null,
      },
      {
        __typename: 'Commitment',
        _id: '317364316839871057',
        entrytitle: 'testuser1 subtask 4',
        parent: {
          __typename: 'Commitment',
          _id: '317239077003854416',
          entrytitle: "test user 1's final project",
        },
        selfAsParent: {
          __typename: 'ParentToChildren',
          _id: '317364316841968209',
        },
        duedate: null,
        complete: false,
        rank: null,
      },
      {
        __typename: 'Commitment',
        _id: '317364337206362704',
        entrytitle: 'testuser1 subtask 4',
        parent: {
          __typename: 'Commitment',
          _id: '317239077003854416',
          entrytitle: "test user 1's final project",
        },
        selfAsParent: {
          __typename: 'ParentToChildren',
          _id: '317364337207411280',
        },
        duedate: null,
        complete: false,
        rank: null,
      },
    ]

    state.commitments = databaseData

    generateScheduleOrder({ state })
  })
})
