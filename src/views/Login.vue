<template>
  <div>
    <h1>Log Darth Vader in with a click!</h1>
    <login-card />

    <button @click="log_darth_in">Login</button>
  </div>
</template>

<script>
import LoginCard from '@/components/LoginCard.vue'
export default {
  name:'Login',
  components: {
    LoginCard,
  },
  
}
</script>

