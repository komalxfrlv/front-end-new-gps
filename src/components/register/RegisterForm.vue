<template>
  <div class="form">
    <div class="input-box">
      <input type="text" name="surname" alt="surname" placeholder="Фамилия" v-model="data.surname" class="input">
    </div>
    <div class="input-box">
      <input type="text" name="name" alt="name" placeholder="Имя" v-model="data.name" class="input">
    </div>
    <div class="input-box">
      <input type="text" name="patronymic" alt="patronymic" placeholder="Отчество" v-model="data.patronymic"
             class="input">
    </div>
    <div class="input-box">
      <input type="text" name="phone" alt="phone" placeholder="Телефон" v-model="data.phone" class="input">
    </div>
    <div class="input-box">
      <input type="email" name="email" alt="email" placeholder="E-Mail" v-model="data.email" class="input">
    </div>
    <div class="input-box">
      <input type="password" name="password" alt="password" placeholder="Пароль" v-model="data.password"
             class="input">
    </div>
    <div class="input-box">
      <input type="password" name="password" alt="password" placeholder="Повторите пароль" v-model="confirmPassword"
             class="input">
    </div>
    <div class="passwords-not-match" v-if="confirmPassword !== data.password">
      Пароли не совпадают!
    </div>
    <div class="input-box  button-box">
      <ButtonGradient @click="tryRegister">Регистрация</ButtonGradient>
    </div>
    <router-link to="/login">
      <button class="button">Войти</button>
    </router-link>
  </div>
</template>

<script>
import {useRegisterNewUser} from "@/services/hooks/useRegisterNewUser";
import {useCheckUser} from "@/services/hooks/useCheckUser";
import router from "@/router";
import ButtonGradient from "@/components/ui/ButtonGradient";

export default {
  name: "RegisterForm",
  components: {ButtonGradient},
  data() {
    return {
      data: {
        email: '',
        name: '',
        surname: '',
        patronymic: '',
        phone: '',
        password: '',
      },
      confirmPassword: '',
    }
  },
  methods: {
    async tryRegister() {
      if(this.confirmPassword === this.data.password) {
        await useRegisterNewUser(this.data).then(async () => {
          let user = await useCheckUser();
          if (user) {
            await router.push('/');
          }
        });
      }
    }
  }
}
</script>

<style scoped>
h1 {
  margin-top: 100px;
}
.button-box {
  margin-bottom: 40px !important;
}
.passwords-not-match {
  padding: 10px;
  background: red;
  color: white;
  border-radius: 8px;
  margin-top: 4px;
  margin-bottom: 4px;
}

.form {
  width: 400px;
}

.input {
  font-size: 20px;
  font-weight: 200;
  padding: 8px;
  border: 1px solid #eeeeee;
  border-radius: 8px;
  width: 100%;
}

.button {
  font-size: 20px;
  font-weight: 200;
  padding: 8px;
  border: 1px solid #eeeeee;
  border-radius: 8px;
  width: 100%;
  transition: 0.1s;
}

.button:hover {
  background: #1A1A1A;
  color: #fdfdfd;
}

.input-box {
  margin-bottom: 10px;
}
</style>