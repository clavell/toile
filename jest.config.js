module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  transform: {
    '^.+\\.vue$': '@vue/vue3-jest',
    '\\.(gql|graphql)$': 'jest-transform-graphql',
    '.*': 'babel-jest',
  },
}
