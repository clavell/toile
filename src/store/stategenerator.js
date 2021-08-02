export function generateState () { 
  return {
    timeFormat: 'yyyyMMddHHmm',
    currentDate: '20210620',
    commitments: [
      {
        id: '0766c8ed-4ab0-425a-8a88-02335ba51baa',
        entrytitle: 'set up vuex',
        startTime: '202106201330',
        duration: 45,
        complete: false,
      },
      {
        id: 'b018ade0-a120-4d59-8a72-92b2c5072411',
        entrytitle: 'add dummy data to vuex',
        startTime: '202106200430',
        duration: 45,
        complete: false,
      },
      {
        id: '601b550c-2c68-4cbe-85b6-a6a61563db1f',
        entrytitle: 'display dummy data in list view',
        startTime: '202106201530',
        duration: 45,
        complete: false,
      },
      {
        id: '7ece7fc9-0a59-47b2-b87f-2e493bfb4d49',
        entrytitle: 'display dummy data in calendar view',
        startTime: '202106201630',
        duration: 45,
        complete: false,
      },
    ],
  }
}

export function generateNewCommitment() {
  return {
    id: '0766c8ed-4ab0-425a-8a88-02335ba51bac',
    entrytitle: 'set up vuex',
    startTime: '202106201330',
    duration: 45,
    complete: false,
  }
}

const newTitle = 'new title'
const newDuration = 30
const newDueDate = 20210930

export function generateAlteredCommitment(oldCommitment){
  const newFields = generateEntry() 
  return {
    ...oldCommitment,
    newFields,
  }
}

export function generateEntry(){
  return {
    entrytitle: newTitle,
    dudate: newDueDate,
    duration: newDuration,
  }
}