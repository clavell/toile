module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  transform: {
    '^.+\\.vue$': 'vue-jest',
    "\\.(gql|graphql)$": "jest-transform-graphql",
      ".*": "babel-jest"
  },
}
