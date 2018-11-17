

<template>
  <b-form @submit="loginAction">
    <b-form-group
      label="Email : ">
      <b-form-input
        type="email"
        v-model="form.email"
        required
        placeholder="Email">
      </b-form-input>
    </b-form-group>
    <b-form-group
      label="Password : ">
      <b-form-input
        type="password"
        v-model="form.password"
        required
        placeholder="Password">
      </b-form-input>
    </b-form-group>
    <b-button type="submit" variant="primary">Login</b-button>
  </b-form>
</template>

<script>

import axios from 'axios'
const Cookie = process.client ? require('js-cookie') : undefined

export default {
  // middleware : 'notAuthenticated',
  layout : 'app',
  data(){
    return {
      form : {
        email : 'hilya@gmail.com',
        password : '123456',
      }
    }
  },
  methods : {
    loginAction (evt) {
      evt.preventDefault();
      let login = {
        email : this.form.email,
        password : this.form.password,
      }
      axios.post('http://127.0.0.1:3333/api/login', login)
      .then((response) => {
        let result = response.data
        console.log(response);
        const auth = {
          accessToken : result.token
        }
        this.$store.commit('setAuth', auth) // mutating to store for client rendering
        Cookie.set('auth', auth) // saving token in cookie for server rendering
        this.$router.push('/')
      })
      .catch((error) => {
        console.log(error);
        
      })
    },
  }
}
</script>