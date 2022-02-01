import { originTypeEnum } from '@/use/enums'

export function generateState() {
  return {
    crouleur: { _id: null },
    initializing: true,
    timeFormat: 'yyyyMMddHHmm',
    dateFormat: 'yyyyMMdd',
    currentDate: '20211112',
    entryToEdit: {},
    // topParent: { _id: '91f281f4-b8dc-429a-8e21-6b9d72ce8428'},
    // topParent: [{ _id: 'a225c8ed-4ab0-425a-8a88-02335ba51baa' }],
    prerequisites: [
      {
        _id: '319821920153392837',
        commitmentId: '319821440143589970',
        prerequisiteId: '319821920153371219',
      },
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
      parent: {
        _id: '317239000319394384',
        entrytitle: 'setting up',
        // startTime: '202106201330',
        // duration: 45,
        complete: false,
        parent: { _id: null },
        rank: 0,
      },
      original: {
        _id: '317239077003854416',
        entrytitle: 'set up vuex',
        startTime: '202106201330',
        // duration: 45,
        complete: false,
        parent: { _id: '317239000319394384' },
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
    commitments: [],
    //deck is for old dummy data
    decks: [],
    schedule: [],
  }
}

export function generateCommitments() {
  return [
    {
      __typename: 'Commitment',
      _id: '317239000319394384',
      entrytitle: 'Projects',
      duration: null,
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
      _id: '318007304478786128',
      entrytitle: 'Develop Toile',
      duration: 25,
      parent: {
        __typename: 'Commitment',
        _id: '317239000319394384',
        entrytitle: 'Projects',
      },
      selfAsParent: {
        __typename: 'ParentToChildren',
        _id: '318007304478788176',
      },
      duedate: '',
      complete: false,
      rank: null,
    },
    {
      __typename: 'Commitment',
      _id: '319703702479831635',
      entrytitle: 'bug fixes',
      duration: null,
      parent: {
        __typename: 'Commitment',
        _id: '318007304478786128',
        entrytitle: 'Develop Toile',
      },
      selfAsParent: {
        __typename: 'ParentToChildren',
        _id: '319703702566863443',
      },
      duedate: '',
      complete: false,
      rank: null,
    },
    {
      __typename: 'Commitment',
      _id: '319703814684803666',
      entrytitle: 'Remove "subtasks" subtitle in projects overview',
      duration: 20,
      parent: {
        __typename: 'Commitment',
        _id: '319703702479831635',
        entrytitle: 'bug fixes',
      },
      selfAsParent: {
        __typename: 'ParentToChildren',
        _id: '319703814685852242',
      },
      duedate: '20210108',
      complete: false,
      rank: null,
    },
    {
      __typename: 'Commitment',
      _id: '319703874965340756',
      entrytitle: "Go to today's date on load",
      duration: 45,
      parent: {
        __typename: 'Commitment',
        _id: '319703702479831635',
        entrytitle: 'bug fixes',
      },
      selfAsParent: {
        __typename: 'ParentToChildren',
        _id: '319703874966389332',
      },
      duedate: '20210108',
      complete: false,
      rank: null,
    },
    {
      __typename: 'Commitment',
      _id: '319703998706745939',
      entrytitle: 'Click on schedule entry to see task in context',
      duration: 150,
      parent: {
        __typename: 'Commitment',
        _id: '318007304478786128',
        entrytitle: 'Develop Toile',
      },
      selfAsParent: {
        __typename: 'ParentToChildren',
        _id: '319703998707794515',
      },
      duedate: '20210107',
      complete: false,
      rank: null,
    },
    {
      __typename: 'Commitment',
      _id: '319704193472397907',
      entrytitle: 'Build hush box',
      duration: 250,
      parent: {
        __typename: 'Commitment',
        _id: '317239000319394384',
        entrytitle: 'Projects',
      },
      selfAsParent: {
        __typename: 'ParentToChildren',
        _id: '319704193473446483',
      },
      duedate: '20220106',
      complete: false,
      rank: null,
    },
    {
      __typename: 'Commitment',
      _id: '319819390980719185',
      entrytitle: 'Plan',
      duration: 50,
      parent: {
        __typename: 'Commitment',
        _id: '319704193472397907',
        entrytitle: 'Build hush box',
      },
      selfAsParent: {
        __typename: 'ParentToChildren',
        _id: '319819390989107793',
      },
      duedate: '',
      complete: false,
      rank: null,
    },
    {
      __typename: 'Commitment',
      _id: '319819567103738447',
      entrytitle: 'General Plan',
      duration: 25,
      parent: {
        __typename: 'Commitment',
        _id: '319819390980719185',
        entrytitle: 'Plan',
      },
      selfAsParent: {
        __typename: 'ParentToChildren',
        _id: '319819567106884175',
      },
      duedate: '',
      complete: false,
      rank: null,
    },
    {
      __typename: 'Commitment',
      _id: '319819585687650895',
      entrytitle: 'Choose wood',
      duration: 15,
      parent: {
        __typename: 'Commitment',
        _id: '319819390980719185',
        entrytitle: 'Plan',
      },
      selfAsParent: {
        __typename: 'ParentToChildren',
        _id: '319819585688700495',
      },
      duedate: '',
      complete: false,
      rank: null,
    },
    {
      __typename: 'Commitment',
      _id: '319819667616039503',
      entrytitle: 'Choose fans',
      duration: 10,
      parent: {
        __typename: 'Commitment',
        _id: '319819390980719185',
        entrytitle: 'Plan',
      },
      selfAsParent: {
        __typename: 'ParentToChildren',
        _id: '319819667617088079',
      },
      duedate: '',
      complete: false,
      rank: null,
    },
    {
      __typename: 'Commitment',
      _id: '319821333955347028',
      entrytitle: 'Buy Materials',
      duration: 100,
      parent: {
        __typename: 'Commitment',
        _id: '319704193472397907',
        entrytitle: 'Build hush box',
      },
      selfAsParent: {
        __typename: 'ParentToChildren',
        _id: '319821333956395604',
      },
      duedate: '',
      complete: false,
      rank: null,
    },
    {
      __typename: 'Commitment',
      _id: '319821373568451155',
      entrytitle: 'Cut Wood',
      duration: 50,
      parent: {
        __typename: 'Commitment',
        _id: '319704193472397907',
        entrytitle: 'Build hush box',
      },
      selfAsParent: {
        __typename: 'ParentToChildren',
        _id: '319821373569499731',
      },
      duedate: '',
      complete: false,
      rank: null,
    },
    {
      __typename: 'Commitment',
      _id: '319821440143589970',
      entrytitle: 'Nail together box',
      duration: 50,
      parent: {
        __typename: 'Commitment',
        _id: '319704193472397907',
        entrytitle: 'Build hush box',
      },
      selfAsParent: {
        __typename: 'ParentToChildren',
        _id: '319821440145687122',
      },
      duedate: '',
      complete: false,
      rank: null,
    },
    {
      __typename: 'Commitment',
      _id: '319821920153371219',
      entrytitle: 'Get things back from Larry',
      duration: 100,
      parent: {
        __typename: 'Commitment',
        _id: '317239000319394384',
        entrytitle: 'Projects',
      },
      selfAsParent: {
        __typename: 'ParentToChildren',
        _id: '319821920154419795',
      },
      duedate: '',
      complete: false,
      rank: null,
    },
  ]
}

export function generateNewCommitment() {
  return {
    __typename: 'Commitment',
    _id: '321237169430594130',
    entrytitle: 'new task',
    duration: 45,
    parent: {
      __typename: 'Commitment',
      _id: '318007304478786128',
      entrytitle: 'Develop Toile',
    },
    selfAsParent: {
      __typename: 'ParentToChildren',
      _id: '321237169431642706',
    },
    duedate: '',
    complete: false,
    rank: null,
  }
}

const newTitle = 'new title'
const newDuration = 30
const newDueDate = 20210930

export function generateAlteredCommitment(oldCommitment) {
  const newFields = generateEntry()
  return {
    ...oldCommitment,
    ...newFields,
  }
}

export function generateEntry() {
  return {
    entrytitle: newTitle,
    duedate: newDueDate,
    duration: newDuration,
  }
}

export function generateDummySchedule() {
  return [
    {
      _id: '33b47de2-33ab-4748-b9aa-050794aecde8',
      commitments: [{ commitmentId: '319703998706745939', duration: 25 }],
      sessionStartTime: '202201190930',
      sessionDuration: 30,
      type: 'CalendarEntry',
    },
    {
      _id: '8485fd11-1dcf-4556-b375-cf88342602fe',
      commitments: [{ commitmentId: '319703998706745939', duration: 25 }],
      sessionStartTime: '202201191000',
      sessionDuration: 30,
      type: 'CalendarEntry',
    },
    {
      _id: 'c635db6c-f827-4ce0-b8cc-77cea942c61b',
      commitments: [{ commitmentId: '319703998706745939', duration: 25 }],
      sessionStartTime: '202201191045',
      sessionDuration: 30,
      type: 'CalendarEntry',
    },
    {
      _id: 'bbddf795-2b3f-4aaa-93ad-7288c4eb2a65',
      commitments: [{ commitmentId: '319703998706745939', duration: 25 }],
      sessionStartTime: '202201191115',
      sessionDuration: 30,
      type: 'CalendarEntry',
    },
    {
      _id: '2ad297b0-40dd-4f69-8fb1-224603b755aa',
      commitments: [{ commitmentId: '319703998706745939', duration: 25 }],
      sessionStartTime: '202201191145',
      sessionDuration: 30,
      type: 'CalendarEntry',
    },
    {
      _id: '41ef030e-dc3a-4af4-bade-c7b890c5d415',
      commitments: [{ commitmentId: '319703998706745939', duration: 25 }],
      sessionStartTime: '202201191300',
      sessionDuration: 30,
      type: 'CalendarEntry',
    },
    {
      _id: '88a24559-481f-43b4-a4a9-41f2940e14f8',
      commitments: [{ commitmentId: '319703874965340756', duration: 25 }],
      sessionStartTime: '202201191330',
      sessionDuration: 30,
      type: 'CalendarEntry',
    },
    {
      _id: '68e17c66-00eb-4a03-a2ef-248a96169de8',
      commitments: [
        { commitmentId: '319703874965340756', duration: 20 },
        { commitmentId: '319703814684803666', duration: 5 },
      ],
      sessionStartTime: '202201191400',
      sessionDuration: 30,
      type: 'CalendarEntry',
    },
    {
      _id: 'df0fca0f-ca49-4502-a864-3566d02e7eb1',
      commitments: [
        { commitmentId: '319703814684803666', duration: 15 },
        { commitmentId: '319819567103738447', duration: 10 },
      ],
      sessionStartTime: '202201191445',
      sessionDuration: 30,
      type: 'CalendarEntry',
    },
    {
      _id: '27196dc7-a915-43b8-88bb-35e82b4b9238',
      commitments: [
        { commitmentId: '319819567103738447', duration: 15 },
        { commitmentId: '319819585687650895', duration: 10 },
      ],
      sessionStartTime: '202201191515',
      sessionDuration: 30,
      type: 'CalendarEntry',
    },
    {
      _id: '00900091-cce9-4a35-8e86-83d47e3b7832',
      commitments: [
        { commitmentId: '319819585687650895', duration: 5 },
        { commitmentId: '319819667616039503', duration: 10 },
        { commitmentId: '319821333955347028', duration: 10 },
      ],
      sessionStartTime: '202201191545',
      sessionDuration: 30,
      type: 'CalendarEntry',
    },
    {
      _id: 'ccee11ca-0042-449b-bd7b-3bf2d4acef69',
      commitments: [{ commitmentId: '319821333955347028', duration: 25 }],
      sessionStartTime: '202201191630',
      sessionDuration: 30,
      type: 'CalendarEntry',
    },
    {
      _id: '142e84a1-b457-4c32-ab69-5dfac3751b53',
      commitments: [{ commitmentId: '319821333955347028', duration: 25 }],
      sessionStartTime: '202201191700',
      sessionDuration: 30,
      type: 'CalendarEntry',
    },
    {
      _id: '2413456b-c705-499f-98e3-a8c69ae6b71a',
      commitments: [{ commitmentId: '319821333955347028', duration: 25 }],
      sessionStartTime: '202201191730',
      sessionDuration: 30,
      type: 'CalendarEntry',
    },
    {
      _id: '815b464e-9ecb-4fe4-8bd1-ee1f42ee0614',
      commitments: [
        { commitmentId: '319821333955347028', duration: 15 },
        { commitmentId: '319821373568451155', duration: 10 },
      ],
      sessionStartTime: '202201200900',
      sessionDuration: 30,
      type: 'CalendarEntry',
    },
    {
      _id: '93a60708-853e-443f-b485-6c0bfd6414bb',
      commitments: [{ commitmentId: '319821373568451155', duration: 25 }],
      sessionStartTime: '202201200930',
      sessionDuration: 30,
      type: 'CalendarEntry',
    },
    {
      _id: '40399445-174d-497a-a7f0-767984572d90',
      commitments: [
        { commitmentId: '319821373568451155', duration: 15 },
        { commitmentId: '319821920153371219', duration: 10 },
      ],
      sessionStartTime: '202201201000',
      sessionDuration: 30,
      type: 'CalendarEntry',
    },
    {
      _id: '06a50ed8-8c22-48cf-a668-67b31b95015a',
      commitments: [{ commitmentId: '319821920153371219', duration: 25 }],
      sessionStartTime: '202201201045',
      sessionDuration: 30,
      type: 'CalendarEntry',
    },
    {
      _id: '0690e0f2-d941-4201-a164-fb6f869c8cda',
      commitments: [{ commitmentId: '319821920153371219', duration: 25 }],
      sessionStartTime: '202201201115',
      sessionDuration: 30,
      type: 'CalendarEntry',
    },
    {
      _id: 'f26e2f39-4537-4874-bda6-c7f0960f5fbc',
      commitments: [{ commitmentId: '319821920153371219', duration: 25 }],
      sessionStartTime: '202201201145',
      sessionDuration: 30,
      type: 'CalendarEntry',
    },
    {
      _id: '7e3820aa-686f-484b-842a-7501a9084b22',
      commitments: [
        { commitmentId: '319821920153371219', duration: 15 },
        { commitmentId: '319821440143589970', duration: 10 },
      ],
      sessionStartTime: '202201201300',
      sessionDuration: 30,
      type: 'CalendarEntry',
    },
    {
      _id: '1cd3bc26-deae-45ba-84e7-c7b510473881',
      commitments: [{ commitmentId: '319821440143589970', duration: 25 }],
      sessionStartTime: '202201201330',
      sessionDuration: 30,
      type: 'CalendarEntry',
    },
    {
      _id: '1d952adf-5bfe-4177-a247-08ba4fb278d0',
      commitments: [{ commitmentId: '319821440143589970', duration: 15 }],
      sessionStartTime: '202201201400',
      sessionDuration: 30,
      type: 'CalendarEntry',
    },
    {
      _id: '1c812623-4080-48b0-8597-397ce5494d67',
      time: '202111121330',
      sessionStartTime: '202111121330',
      sessionDuration: 30,
      type: 'BlankEntry',
    },
    {
      _id: 'a1c4004e-661d-4642-be21-634cec76e16a',
      time: '202111121400',
      sessionStartTime: '202111121400',
      sessionDuration: 30,
      type: 'BlankEntry',
    },
  ]
}

export function generateDummyDecks() {
  return [
    {
      deck: [
        {
          _id: '317239000319394384',
          commitments: [
            { _id: '318007304478786128', type: 'todoCard' },
            { _id: '319704193472397907', type: 'todoCard' },
            { _id: '319821920153371219', type: 'todoCard' },
          ],
        },
      ],
      _id: '62f3b29a-55fb-433f-8469-5ebe740b4bdb',
    },
    {
      deck: [
        {
          _id: '317239000319394384',
          commitments: [
            { _id: '318007304478786128', type: 'todoCard' },
            { _id: '319704193472397907', type: 'todoCard' },
            { _id: '319821920153371219', type: 'todoCard' }, //move this one
          ],
        },
      ],
      _id: '3507e1c1-2472-4600-839b-cab522030297',
    },
    {
      deck: [
        {
          _id: '319704193472397907',
          commitments: [
            { _id: '319819390980719185', type: 'todoCard' },
            { _id: '319821333955347028', type: 'todoCard' },
            { _id: '319821373568451155', type: 'todoCard' },
            { _id: '319821440143589970', type: 'todoCard' },
          ],
        },
      ],
      _id: 'ad319fcb-b0c2-43a7-b587-be991f972c56',
    },
  ]
}

export function generateDummyAlteredDecks() {
  return [
    {
      deck: [
        {
          _id: '318007304478786128',
          commitments: [
            { _id: '319703702479831635', type: originTypeEnum.todoCard },
            { _id: '319703998706745939', type: originTypeEnum.todoCard },
            // { _id: '321237169430594130', type: originTypeEnum.todoCard },
          ],
        },
      ],
      _id: '92a7919a-c70b-4e85-9d4e-2612bff6f8cd',
    },
    {
      deck: [
        {
          _id: '317239000319394384',
          commitments: [
            { _id: '318007304478786128', type: originTypeEnum.todoCard },
            { _id: '319704193472397907', type: originTypeEnum.todoCard },
            { _id: '319821920153371219', type: originTypeEnum.todoCard },
          ],
        },
      ],
      _id: '5028ad72-8006-4c9e-82f9-a67a6135e22c',
    },
    {
      deck: [
        {
          _id: '317239000319394384',
          commitments: [
            { _id: '318007304478786128', type: originTypeEnum.todoCard },
            { _id: '319704193472397907', type: originTypeEnum.todoCard },
            { _id: '319821920153371219', type: originTypeEnum.todoCard },
          ],
        },
      ],
      _id: 'd88d1265-b581-4c11-9760-771473c9de8d',
    },
  ]
}

export function generateDecks_CommitmentMovedBetweenDecks() {
  return [
    {
      deck: [
        {
          _id: '317239000319394384',
          commitments: [
            { _id: '318007304478786128', type: 'todoCard' },
            { _id: '319704193472397907', type: 'todoCard' },
            { _id: '319821920153371219', type: 'todoCard' },
          ],
        },
      ],
      _id: 'f9700d75-f03a-4e50-9d94-f840ef09c81f',
    },
    {
      deck: [
        {
          _id: '317239000319394384',
          commitments: [
            { _id: '318007304478786128', type: 'todoCard' },
            { _id: '319704193472397907', type: 'todoCard' },
            // { _id: '319821920153371219', type: 'todoCard' }, //move this one (from generateDummyDecks())
          ],
        },
      ],
      _id: '1fdbcfd4-ec13-4e39-a063-68a6c99d22f5',
    },
    {
      deck: [
        {
          _id: '319704193472397907',
          commitments: [
            { _id: '319819390980719185', type: 'todoCard' },
            { _id: '319821333955347028', type: 'todoCard' },
            { _id: '319821373568451155', type: 'todoCard' },
            { _id: '319821920153371219', type: 'todoCard' },// to here
            { _id: '319821440143589970', type: 'todoCard' },
          ],
        },
      ],
      _id: '347e371b-73b7-4365-9e07-2e33a8bfd03d',
    },
  ]
}
