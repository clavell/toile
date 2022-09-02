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

//mixpanel
import mixpanel from 'mixpanel-browser'

export default {
  setup() {
    const router = useRouter()

    const data = reactive({
      username: '',
      password: '',
    })

    const login = async () => {
      const response = await fetch('/.netlify/functions/log-in', {
        body: JSON.stringify(data),
        method: 'POST',
      })

      if (response.ok) {
        //store token so that apollo can access it
        sessionStorage.token = await response.text()

        mixpanel.track('Sign Up', {
          source: 'Toile Web App',
          'logged in': true,
        })

        router.push({ name: 'HomeRoute' })
      } else {
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
  margin-right: 5px;
}

label {
  color: whitesmoke;
  font-weight: 200;
  opacity: 0.5;
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
