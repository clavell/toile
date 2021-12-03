import { createApp, provide, h } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './index.css'

import { DefaultApolloClient } from '@vue/apollo-composable';
import { ApolloClient, createHttpLink, InMemoryCache, } from '@apollo/client'
import { setContext } from '@apollo/client/link/context';

sessionStorage.token = null
const online = true
//HERE WE CREATE AN APOLLO CLIENT THAT WORKS
const httpLink = createHttpLink({
  uri: online ? 'https://graphql.fauna.com/graphql' : 'http://localhost:8084/graphql',
});

const authLink = setContext ((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = sessionStorage.token
  console.log(token)
  console.log(sessionStorage)
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${token}`,
    }
  }
});

const defaultClient = new ApolloClient({
link: authLink.concat(httpLink),
cache: new InMemoryCache()
})


createApp({
  setup () {
    provide(DefaultApolloClient, defaultClient)
  },

  render: () => h(App),
}).use(store).use(router).mount('#app')
