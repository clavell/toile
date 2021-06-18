<template>
  <div class="hello">
    <h1>{{ numberOfCommitments }}</h1>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  computed: {
    numberOfCommitments() {
      console.log(this.$store.state.commitments.length)
      return this.$store.getters.commitmentsCount
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
