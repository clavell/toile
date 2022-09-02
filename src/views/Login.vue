<template>
  <div>
    <login-card />
  </div>
</template>

<script>
import LoginCard from '@/components/LoginCard.vue'
import mixpanel from 'mixpanel-browser'
export default {
  name: 'Login',
  components: {
    LoginCard,
  },
  setup() {
    mixpanel.init('dd3fbaff75d61e2be21ead3f81a37343', {
      debug: true,
      cross_subdomain_cookie: false,
    })
  },
}
</script>
