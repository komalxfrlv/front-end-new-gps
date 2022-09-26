<template>
  <div class="form">
    <div class="input-box">
      <input type="email" name="email" alt="email" placeholder="E-Mail" v-model="data.email" class="login-input">
    </div>
    <div class="input-box">
      <input type="password" name="password" alt="password" placeholder="Пароль" v-model="data.password"
             class="login-input">
    </div>
    <div class="input-box">
      <button @click="tryAuth" class="login-button">Войти</button>
    </div>
  </div>
</template>

<script>
import {useAuth} from "@/services/hooks/useAuth";
import {useCheckUser} from "@/services/hooks/useCheckUser";
import router from "@/router";

export default {
  name: "LoginForm",
  data() {
    return {
      data: {
        email: '',
        password: '',
      },
      error: '',
    }
  },
  methods: {
    async tryAuth() {
      let auth = await useAuth(this.data)
      if (auth) {
        let user = await useCheckUser();
        if (user) {
          await router.push('/');
        }
      }
    }
  },
}
</script>

<style scoped>
.form {
  width: 400px;
}

.login-input {
  font-size: 20px;
  font-weight: 200;
  padding: 8px;
  border: 1px solid #eeeeee;
  border-radius: 8px;
  width: 100%;
}

.login-button {
  font-size: 20px;
  font-weight: 200;
  padding: 8px;
  border: 1px solid #eeeeee;
  border-radius: 8px;
  width: 100%;
  transition: 0.1s;
}

.login-button:hover {
  background: #1A1A1A;
  color: #fdfdfd;
}

.input-box {
  margin-bottom: 10px;
}
</style>