<template>
  <div id="entry-form">
    <form @submit.prevent="login">
      <input
        type="text"
        v-model="data.username"
        placeholder="username"
        class="field"
      />
      <div>
        <input
          type="password"
          v-model="data.password"
          placeholder="password"
          class="field"
        />
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { reactive } from 'vue'
// import { useStore } from 'vuex'

//Apollo stuff
// import { ApolloClient, createHttpLink, InMemoryCache, } from '@apollo/client'
// import { setContext } from '@apollo/client/link/context';

// import { useQuery, useResult, provideApolloClient } from '@vue/apollo-composable'
// import allCrouleursQuery from '@/graphql/allCrouleurs.query.gql'

export default {
  setup() {
    const router = useRouter()
    // const store = useStore()

  const data = reactive({
    username: '',
    password: ''
  })    

    const login = async () => {
      const response = await fetch('/.netlify/functions/log-in',{
        body: JSON.stringify(data),
        method: 'POST'
      })

      // console.log(response)

      
      // console.log(sessionStorage.token)
      if(response.ok){
        //store token so that apollo can access it
        sessionStorage.token = await response.text()

        //store logged in user for queries
        // TRYING TO PUT IN THE APOLLO CLIENT HERE INSTEAD OF MAIN.JS

        // const online = true
        // //HERE WE CREATE AN APOLLO CLIENT THAT WORKS
        // const httpLink = createHttpLink({
        //   uri: online ? 'https://graphql.fauna.com/graphql' : 'http://localhost:8084/graphql',
        // });

        // const authLink = setContext ((_, { headers }) => {
        //   // get the authentication token from local storage if it exists
        //   const token = sessionStorage.token
        //   console.log(token)
        //   // console.log(sessionStorage)
        //   // return the headers to the context so httpLink can read them
        //   return {
        //     headers: {
        //       ...headers,
        //       authorization: `Bearer ${token}`,
        //     }
        //   }
        // });

        // const defaultClient = new ApolloClient({
        // link: authLink.concat(httpLink),
        // cache: new InMemoryCache()
        // })

        // provideApolloClient(defaultClient);


        // const {result} = useQuery(allCrouleursQuery)
        // console.log(result)
        // const loggedinUser = useResult(result, [], data => data)
        // console.log(loggedinUser)
        console.log(sessionStorage.token)
        router.push({name: 'HomeRoute'})
      } else{
        console.log('please try again')
      }
    }

    return { login, data }
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
  background-color: theme('colors.pink.900');
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

/* removing the buttons on the number input */
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
  background-color: theme('colors.pink.800');
  border-style: none;
  outline: none;
  border-radius: 5px;
  color: white;
  padding: 10px;
}
</style>
