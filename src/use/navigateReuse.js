//this function navigates to the subtask that has been clicked on

let navigateReuse = ({ store, props, fullCommitment }) => {
  return (e) => {
    e.stopPropagation()
    //if clicking on a checkbox don't drag
    if (e.target.type == 'checkbox') {
      return
    }
    e.preventDefault()
    let commitmentToGoTo = JSON.parse(JSON.stringify(fullCommitment.value))
    store.commit('SET_DECK_AS_SINGLE_PARENT', {
      deckIndex: props.deckIndex,
      commitment: commitmentToGoTo,
    })
  }
}

export { navigateReuse }
