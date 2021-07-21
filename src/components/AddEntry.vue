<template>
  <div id="entry-form">
    <form>
      <input
        type="text"
        v-model="entrytitle"
        placeholder="Add Entry"
        class="field"
      />
      <div>
        <label for="duration">Duration</label>
        <input
          type="Number"
          v-model="duration"
          placeholder="Add duration"
          class="field"
        />
      </div>
      <div>
        <label>Due Date (dd/mm/yyyy)</label>
        <input type="text" v-model="duedate" class="field" />
      </div>
      <button type="submit">Add</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'AddEntry',
  data() {
    return {
      id: '',
      entrytitle: '',
      duedate: '21/07/2021',
      duration: 45,
    }
  },
}
</script>

<style scoped>
#entry-form {
  box-shadow: 5px 10px 20px var(--entry-addition-colour);
  position: relative;
  top: -100px;
  left: -10px;
  width: 290px;
  height: 1000px;
  background-color: var(--entry-addition-colour);
  border-radius: 10px;
  z-index: 20;
}

#entry-form form {
  display: grid;
  gap: 10px;
  grid-template-rows: 30px;
  padding: 20px;
}

option,
select,
label,
input {
  display: inline-flex;
  font-family: 'Open sans', sans-serif;
  font-size: 100%;
  /* line-height: 1.15; */
  margin-right: 5px;
}

label {
  color: whitesmoke;
  font-weight: 200;
  opacity: 0.5;
}
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type='number'] {
  -moz-appearance: textfield;
}

button,
optgroup,
input,
select,
option {
  background-color: var(--entry-background-colour);
  border-style: none;
  outline: none;
  border-radius: 5px;
  color: white;
  padding: 10px;
}
</style>
