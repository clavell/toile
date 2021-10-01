export function generateState() {
  return {
    timeFormat: 'yyyyMMddHHmm',
    currentDate: '20210620',
    // topParent: { id: '91f281f4-b8dc-429a-8e21-6b9d72ce8428'},
    topParent: { id: 'a225c8ed-4ab0-425a-8a88-02335ba51baa' },

    blankSpacePosition: null,
    commitments: [
      {
        id: 'a225c8ed-4ab0-425a-8a88-02335ba51baa',
        entrytitle: 'setting up',
        // startTime: '202106201330',
        // duration: 45,
        complete: false,
        parent: { id: null },
        rank: 0,
      },
      {
        id: '0766c8ed-4ab0-425a-8a88-02335ba51baa',
        entrytitle: 'set up vuex',
        startTime: '202106201330',
        duration: 45,
        complete: false,
        parent: { id: 'a225c8ed-4ab0-425a-8a88-02335ba51baa' },
        rank: 0,
      },
      {
        id: 'b018ade0-a120-4d59-8a72-92b2c5072411',
        entrytitle: 'add dummy data to vuex',
        startTime: '202106200430',
        duration: 45,
        complete: false,
        parent: { id: 'a225c8ed-4ab0-425a-8a88-02335ba51baa' },
        rank: 1,
      },
      {
        id: '601b550c-2c68-4cbe-85b6-a6a61563db1f',
        entrytitle: 'display dummy data in list view',
        startTime: '202106201530',
        duration: 45,
        complete: false,
        parent: { id: 'a225c8ed-4ab0-425a-8a88-02335ba51baa' },
        rank: 2,
      },
      {
        id: '7ece7fc9-0a59-47b2-b87f-2e493bfb4d49',
        entrytitle: 'display dummy data in calendar view',
        startTime: '202106201630',
        duration: 45,
        complete: false,
        parent: { id: 'a225c8ed-4ab0-425a-8a88-02335ba51baa' },
        rank: 3,
      },
      {
        entrytitle: 'Watch Videos',
        duedate: '21/07/2021',
        duration: 45,
        parent: { id: '0766c8ed-4ab0-425a-8a88-02335ba51baa' },
        id: '7c7f45b0-4ee1-438c-9884-6f481ca39006',
        complete: false,
        rank: 0,
      },
      {
        entrytitle: 'Install Vuex',
        duedate: '21/07/2021',
        duration: 45,
        parent: { id: '0766c8ed-4ab0-425a-8a88-02335ba51baa' },
        id: '9f8161c0-5a9c-4eec-a9c8-19229fbfc8c9',
        complete: false,
        rank: 1,
      },
      {
        entrytitle: 'Make the Store',
        duedate: '21/07/2021',
        duration: 45,
        parent: { id: '0766c8ed-4ab0-425a-8a88-02335ba51baa' },
        id: '91f281f4-b8dc-429a-8e21-6b9d72ce8428',
        complete: false,
        rank: 2,
      },
      {
        entrytitle: 'Read Docs',
        duedate: '21/07/2021',
        duration: 45,
        parent: { id: '9f8161c0-5a9c-4eec-a9c8-19229fbfc8c9' },
        id: '1616ae3d-78be-4180-8870-2bd685b4e224',
        complete: false,
        rank: 0,
      },
      {
        entrytitle: 'Download',
        duedate: '21/07/2021',
        duration: 45,
        parent: { id: '9f8161c0-5a9c-4eec-a9c8-19229fbfc8c9' },
        id: 'f44660e1-903e-4f5a-ba06-8b6df65bf20a',
        complete: false,
        rank: 1,
      },
      {
        entrytitle: 'Install',
        duedate: '21/07/2021',
        duration: 45,
        parent: { id: '9f8161c0-5a9c-4eec-a9c8-19229fbfc8c9' },
        id: 'ab95afbb-da68-46bf-af93-3dcf94860078',
        complete: false,
        rank: 2,
      },
      {
        entrytitle: 'Read Docs',
        duedate: '21/07/2021',
        duration: 45,
        parent: { id: '91f281f4-b8dc-429a-8e21-6b9d72ce8428' },
        id: 'e9902504-737d-4195-9168-355d40cdb5b8',
        complete: false,
        rank: 0,
      },
      {
        entrytitle: 'Make Task List',
        duedate: '21/07/2021',
        duration: 45,
        parent: { id: '91f281f4-b8dc-429a-8e21-6b9d72ce8428' },
        id: 'd4de237f-1f1b-4a8c-a9f2-6a3466e24157',
        complete: false,
        rank: 1,
      },
      {
        entrytitle: 'Make Format String',
        duedate: '21/07/2021',
        duration: 45,
        parent: { id: '91f281f4-b8dc-429a-8e21-6b9d72ce8428' },
        id: 'ebeab534-3364-4109-bd67-fe68bf6c5611',
        complete: false,
        rank: 2,
      },
      {
        entrytitle: 'Make up Data',
        duedate: '21/07/2021',
        duration: 45,
        parent: { id: 'b018ade0-a120-4d59-8a72-92b2c5072411' },
        id: '9e734fe3-2920-4882-a346-e2b37df47c59',
        complete: false,
        rank: 0,
      },
      {
        entrytitle: 'Add the Data',
        duedate: '21/07/2021',
        duration: 45,
        parent: { id: 'b018ade0-a120-4d59-8a72-92b2c5072411' },
        id: '516ffce2-4690-4028-89fa-77b9b8e744a3',
        complete: false,
        rank: 1,
      },
    ],
    currentCommitmentStackDisplayOrder: [
      {
        id: 'a225c8ed-4ab0-425a-8a88-02335ba51baa',
        commitments: [
          {
            id: '0766c8ed-4ab0-425a-8a88-02335ba51baa',
            type: 'TodoCard',
          },
          {
            id: 'b018ade0-a120-4d59-8a72-92b2c5072411',
            type: 'TodoCard',
          },
          {
            id: '601b550c-2c68-4cbe-85b6-a6a61563db1f',
            type: 'TodoCard',
          },
          {
            id: '7ece7fc9-0a59-47b2-b87f-2e493bfb4d49',
            type: 'TodoCard',
          },
        ],
      },
    ],
  }
}

export function generateNewCommitment() {
  return {
    id: '0766c8ed-4ab0-425a-8a88-02335ba51bac',
    entrytitle: 'set up vuex again',
    startTime: '202106201330',
    duration: 45,
    complete: false,
    parent: { id: 'a225c8ed-4ab0-425a-8a88-02335ba51baa' },
    rank: 5,
  }
}

const newTitle = 'new title'
const newDuration = 30
const newDueDate = 20210930

export function generateAlteredCommitment(oldCommitment) {
  const newFields = generateEntry()
  return {
    ...oldCommitment,
    newFields,
  }
}

export function generateEntry() {
  return {
    entrytitle: newTitle,
    dudate: newDueDate,
    duration: newDuration,
  }
}
