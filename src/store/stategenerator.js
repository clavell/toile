// import { originTypeEnum } from '@/use/enums'

export function generateState() {
  return {
    crouleur: {_id: null},
    timeFormat: 'yyyyMMddHHmm',
    dateFormat: 'yyyyMMdd',
    currentDate: '20211112',
    // topParent: { _id: '91f281f4-b8dc-429a-8e21-6b9d72ce8428'},
    // topParent: [{ _id: 'a225c8ed-4ab0-425a-8a88-02335ba51baa' }],
    prerequisites: [
      // {
      //   _id: '6266c8ed-4ab0-425a-8a88-02335ba51baa',
      //   commitmentId: '91f281f4-b8dc-429a-8e21-6b9d72ce8428',
      //   prerequisiteId: '7ece7fc9-0a59-47b2-b87f-2e493bfb4d49',
      // },
    ], //make the store depends on display dummy data in calendar view
    previousRearrange: {},
    sessionLength: 25,
    scheduleTimes: [
      '0900',
      '0930',
      '1000',
      '1045',
      '1115',
      '1145',
      '1300',
      '1330',
      '1400',
      '1445',
      '1515',
      '1545',
      '1630',
      '1700',
      '1730',
    ],
    dontScheduleAt: [
      { _id: '9f3df22f-19cd-45cc-aa60-fce46c948a8e', time: '202111121330' },
      { _id: 'c33b4846-82c9-456a-be64-12850e7b8dec', time: '202111121400' },
    ],
    moving: {
      // parent: {
      //   _id: 'a225c8ed-4ab0-425a-8a88-02335ba51baa',
      //   entrytitle: 'setting up',
      //   // startTime: '202106201330',
      //   // duration: 45,
      //   complete: false,
      //   parent: { _id: null },
      //   rank: 0,
      // },
      // original: {
      //   _id: '0766c8ed-4ab0-425a-8a88-02335ba51baa',
      //   entrytitle: 'set up vuex',
      //   startTime: '202106201330',
      //   // duration: 45,
      //   complete: false,
      //   parent: { _id: 'a225c8ed-4ab0-425a-8a88-02335ba51baa' },
      //   rank: 0,
      // },
      parent: {
        _id: "317239000319394384",
        entrytitle: 'setting up',
        // startTime: '202106201330',
        // duration: 45,
        complete: false,
        parent: { _id: null },
        rank: 0,
      },
      original: {
        _id: "317239077003854416",
        entrytitle: 'set up vuex',
        startTime: '202106201330',
        // duration: 45,
        complete: false,
        parent: { _id: "317239000319394384" },
        rank: 0,
      },

      position: {
        init: false,
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        isDragging: false,
        dragStartX: null,
        dragStartY: null,
      },
    },
    blankSpacePosition: null,
    commitments: 
    // [],
    [
      {
        _id: 'a225c8ed-4ab0-425a-8a88-02335ba51baa',
        entrytitle: 'scheduler app',
        duedate: '20211112',
        // startTime: '202106201330',
        // duration: 45,
        complete: false,
        parent: { _id: '55f5eccd-5fb9-4976-88f7-4376e0af0ac8' },
        rank: 0,
      },
      {
        _id: '0766c8ed-4ab0-425a-8a88-02335ba51baa',
        entrytitle: 'set up vuex',
        // startTime: '202106201330',
        duration: 45,
        complete: false,
        parent: { _id: 'a225c8ed-4ab0-425a-8a88-02335ba51baa' },
        rank: 0,
      },
      {
        _id: 'b018ade0-a120-4d59-8a72-92b2c5072411',
        entrytitle: 'add dummy data to vuex',
        // startTime: '202106200430',
        duration: 45,
        complete: false,
        parent: { _id: 'a225c8ed-4ab0-425a-8a88-02335ba51baa' },
        rank: 1,
      },
      {
        _id: '601b550c-2c68-4cbe-85b6-a6a61563db1f',
        entrytitle: 'display dummy data in list view',
        // startTime: '202106201530',
        duration: 45,
        complete: false,
        parent: { _id: 'a225c8ed-4ab0-425a-8a88-02335ba51baa' },
        rank: 2,
      },
      {
        _id: '7ece7fc9-0a59-47b2-b87f-2e493bfb4d49',
        entrytitle: 'display dummy data in calendar view',
        // startTime: '202106201630',
        duration: 45,
        complete: false,
        parent: { _id: 'a225c8ed-4ab0-425a-8a88-02335ba51baa' },
        rank: 3,
      },
      {
        entrytitle: 'Watch Videos',
        duration: 45,
        parent: { _id: '0766c8ed-4ab0-425a-8a88-02335ba51baa' },
        _id: '7c7f45b0-4ee1-438c-9884-6f481ca39006',
        complete: false,
        rank: 0,
      },
      {
        entrytitle: 'Install Vuex',
        duration: 100,
        parent: { _id: '0766c8ed-4ab0-425a-8a88-02335ba51baa' },
        _id: '9f8161c0-5a9c-4eec-a9c8-19229fbfc8c9',
        complete: false,
        rank: 1,
      },
      {
        entrytitle: 'Make the Store',
        duration: 45,
        parent: { _id: '0766c8ed-4ab0-425a-8a88-02335ba51baa' },
        _id: '91f281f4-b8dc-429a-8e21-6b9d72ce8428',
        complete: false,
        rank: 2,
      },
      {
        entrytitle: 'Read Docs',
        duration: 45,
        parent: { _id: '9f8161c0-5a9c-4eec-a9c8-19229fbfc8c9' },
        _id: '1616ae3d-78be-4180-8870-2bd685b4e224',
        complete: false,
        rank: 0,
      },
      {
        entrytitle: 'Download',
        duration: 45,
        parent: { _id: '9f8161c0-5a9c-4eec-a9c8-19229fbfc8c9' },
        _id: 'f44660e1-903e-4f5a-ba06-8b6df65bf20a',
        complete: false,
        rank: 1,
      },
      {
        entrytitle: 'Install',
        duration: 45,
        parent: { _id: '9f8161c0-5a9c-4eec-a9c8-19229fbfc8c9' },
        _id: 'ab95afbb-da68-46bf-af93-3dcf94860078',
        complete: false,
        rank: 2,
      },
      {
        entrytitle: 'Read Docs',
        duration: 45,
        parent: { _id: '91f281f4-b8dc-429a-8e21-6b9d72ce8428' },
        _id: 'e9902504-737d-4195-9168-355d40cdb5b8',
        complete: false,
        rank: 0,
      },
      {
        entrytitle: 'Make Task List',
        duration: 45,
        parent: { _id: '91f281f4-b8dc-429a-8e21-6b9d72ce8428' },
        _id: 'd4de237f-1f1b-4a8c-a9f2-6a3466e24157',
        complete: false,
        rank: 1,
      },
      {
        entrytitle: 'Make Format String',
        duration: 5,
        parent: { _id: '91f281f4-b8dc-429a-8e21-6b9d72ce8428' },
        _id: 'ebeab534-3364-4109-bd67-fe68bf6c5611',
        complete: false,
        rank: 2,
      },
      {
        entrytitle: 'Make up Data',
        duration: 45,
        parent: { _id: 'b018ade0-a120-4d59-8a72-92b2c5072411' },
        _id: '9e734fe3-2920-4882-a346-e2b37df47c59',
        complete: false,
        rank: 0,
      },
      {
        entrytitle: 'Add the Data',
        duration: 45,
        parent: { _id: 'b018ade0-a120-4d59-8a72-92b2c5072411' },
        _id: '516ffce2-4690-4028-89fa-77b9b8e744a3',
        complete: false,
        rank: 1,
      },
      {
        _id: '55f5eccd-5fb9-4976-88f7-4376e0af0ac8',
        entrytitle: 'Projects',
        // startTime: '202106201330',
        // duration: 45,
        complete: false,
        parent: { _id: null },
        rank: 0,
      },
      {
        entrytitle: 'Special Topics Project',
        duedate: '18/11/2021',
        parent: { _id: '55f5eccd-5fb9-4976-88f7-4376e0af0ac8' },
        _id: 'c1f48f53-82d8-48d6-bbae-02b0bec7036e',
        complete: false,
        rank: 1,
      },
      {
        entrytitle: 'Research',
        duration: 200,
        parent: { _id: 'c1f48f53-82d8-48d6-bbae-02b0bec7036e' },
        _id: '584fe4b7-dc93-40b3-8b72-31cccd997df6',
        complete: false,
        rank: 0,
      },
      {
        entrytitle: 'Exploratory Analysis',
        duration: 180,
        parent: { _id: 'c1f48f53-82d8-48d6-bbae-02b0bec7036e' },
        _id: 'f9dbcdf3-48e9-4ebc-8822-d7991cbbeb4b',
        complete: false,
        rank: 1,
      },
      {
        entrytitle: 'Engineer Features',
        duration: 180,
        parent: { _id: 'c1f48f53-82d8-48d6-bbae-02b0bec7036e' },
        _id: '472aaa54-b1ab-4172-8a6a-437757025c64',
        complete: false,
        rank: 2,
      },
      {
        entrytitle: 'Train And Test Model',
        duration: 240,
        parent: { _id: 'c1f48f53-82d8-48d6-bbae-02b0bec7036e' },
        _id: '304c7cb5-41f8-403a-93be-ae3d927e2c23',
        complete: false,
        rank: 3,
      },
      {
        entrytitle: 'Make Improvements',
        duration: 180,
        parent: { _id: 'c1f48f53-82d8-48d6-bbae-02b0bec7036e' },
        _id: '39c34ba6-cff1-415b-af18-44d1e8455d7c',
        complete: false,
        rank: 4,
      },
      {
        entrytitle: 'Read relevant chapters',
        duration: 120,
        parent: { _id: '584fe4b7-dc93-40b3-8b72-31cccd997df6' },
        _id: 'a682a6fc-3dfb-4a14-a1b5-b7314c50640c',
        complete: false,
        rank: 4,
      },
      {
        entrytitle: 'Do Keras Tutorial',
        duration: 60,
        parent: { _id: '584fe4b7-dc93-40b3-8b72-31cccd997df6' },
        _id: '529238bf-d5e1-401c-82ae-1ed24d441e88',
        complete: false,
        rank: 4,
      },
      {
        entrytitle: 'Decide on Preliminary Features',
        duration: 120,
        parent: { _id: '584fe4b7-dc93-40b3-8b72-31cccd997df6' },
        _id: '8e39051c-0a7b-4d5e-ab17-691ec7426374',
        complete: false,
        rank: 4,
      },
    ],
    decks: [
      // {
      //   _id: '9225c8ed-4ab0-425a-8a88-02335ba51baa',
      //   deck: [
      //     {
      //       _id: 'a225c8ed-4ab0-425a-8a88-02335ba51baa',
      //       commitments: [
      //         {
      //           _id: '0766c8ed-4ab0-425a-8a88-02335ba51baa',
      //           type: originTypeEnum.TodoCard,
      //         },
      //         {
      //           _id: 'b018ade0-a120-4d59-8a72-92b2c5072411',
      //           type: originTypeEnum.TodoCard,
      //         },
      //         {
      //           _id: '601b550c-2c68-4cbe-85b6-a6a61563db1f',
      //           type: originTypeEnum.TodoCard,
      //         },
      //         {
      //           _id: '7ece7fc9-0a59-47b2-b87f-2e493bfb4d49',
      //           type: originTypeEnum.TodoCard,
      //         },
      //       ],
      //     },
      //   ],
      // },
    ],
    schedule: [
      {
        _id: '868d1d58-986c-4cd3-98a9-e530d7998228',
        commitments: [
          {
            commitmentId: '7c7f45b0-4ee1-438c-9884-6f481ca39006',
            duration: 25,
          },
        ],
        sessionStartTime: '202106200430',
        sessionDuration: 45,
      },
      {
        _id: '2fb878cc-4cf5-4d86-ac97-037d740bd5e3',
        commitments: [
          {
            commitmentId: '7c7f45b0-4ee1-438c-9884-6f481ca39006',
            duration: 20,
          },
          { commitmentId: '1616ae3d-78be-4180-8870-2bd685b4e224', duration: 5 },
        ],
        sessionStartTime: '202106201330',
        sessionDuration: 45,
      },
      {
        _id: '50322481-5b32-4b79-acc5-17677cf0ddea',
        commitments: [
          {
            commitmentId: '1616ae3d-78be-4180-8870-2bd685b4e224',
            duration: 25,
          },
        ],
        sessionStartTime: '202106201530',
        sessionDuration: 45,
      },
      {
        _id: '516ffce2-4690-4028-89fa-77b9b8e744a3',
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
        sessionStartTime: '202106201630',
        sessionDuration: 45,
      },
      {
        _id: 'eab67363-4773-47a0-9661-17253b52d4e8',
        commitments: [
          {
            commitmentId: 'f44660e1-903e-4f5a-ba06-8b6df65bf20a',
            duration: 25,
          },
        ],
        sessionStartTime: '202106210130',
        sessionDuration: 45,
      },
    ],
  }
}

export function generateNewCommitment() {
  return {
    _id: '0766c8ed-4ab0-425a-8a88-02335ba51bac',
    entrytitle: 'set up vuex again',
    startTime: '202106201330',
    duration: 45,
    complete: false,
    parent: { _id: 'a225c8ed-4ab0-425a-8a88-02335ba51baa' },
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
