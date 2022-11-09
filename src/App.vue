<template>
  <div class="wrapper">
    <div class="sidebar" v-if="isAuth">
      <h2>Geo Position</h2>
      <div class="avatar">
        <img alt="avatar" src="@/assets/avatar.jpg">
        <p>
          Фролов Александр
        </p>
      </div>
      <router-link to="/">
        <div class="link"><img src="@/assets/icons/home.svg" alt="Главная" class="nav-icon">Главная</div>
      </router-link>
      <router-link to="/trackers">
        <div class="link"><img src="@/assets/icons/tracker.svg" alt="Трекеры" class="nav-icon">Трекеры</div>
      </router-link>
      <router-link to="/cars">
        <div class="link"><img src="@/assets/icons/car.svg" alt="Автомобили" class="nav-icon">Автомобили</div>
      </router-link>
      <router-link to="/workers">
        <div class="link"><img src="@/assets/icons/people.svg" alt="Работники" class="nav-icon">Сотрудники</div>
      </router-link>
      <router-link to="/map">
        <div class="link"><img src="@/assets/icons/map.svg" alt="Карта" class="nav-icon">Карта</div>
      </router-link>
      <div class="exit">
        <ButtonWhite @click="tryLogout">Выход</ButtonWhite>
      </div>
    </div>
    <div class="main_content">
      <router-view/>
    </div>
  </div>

</template>
<script>
import ButtonWhite from "@/components/ui/ButtonWhite";
import {useLogout} from "@/services/hooks/useLogout";
import {useCheckUser} from "@/services/hooks/useCheckUser";
import router from "@/router";

export default {
  components: {ButtonWhite},
  data() {
    return {
      isAuth: false,
    }
  },
  methods: {
    tryLogout() {
      useLogout().then(() => {
        this.isAuth = false;
        router.push({name: 'login'});
      });
    },
  },
  async mounted() {
    this.isAuth = await useCheckUser();
  }
}
</script>
<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  list-style: none;
  text-decoration: none;
}

h1 {
  font-size: 2.3rem;
}

#app {
  font-family: 'Nunito', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: #ffffff;
}

.nav-icon {
  height: 28px;
  vertical-align: middle;
  margin-right: 14px;
}

.wrapper {
  display: flex;
  position: relative;
}

.sidebar {
  width: 300px;
  height: 100%;
  padding: 30px 30px;
  position: fixed;
  box-shadow: 8px 5px 10px 2px rgba(175, 65, 181, 0.1);
}

.sidebar h2 {
  color: #1A1A1A;
  text-transform: uppercase;
  margin-bottom: 30px;
  text-align: center;
}

.sidebar .link {
  padding: 15px;
  border-radius: 10px;
  transition: 0.2s;
  color: #1A1A1A;
  margin-bottom: 5px;
}

.sidebar .link:hover {
  background: linear-gradient(34deg, rgba(175, 65, 181, 1) 0%, rgba(151, 69, 191, 1) 25%, rgba(110, 70, 169, 1) 50%, rgba(84, 69, 191, 1) 75%, rgba(128, 53, 135, 1) 100%, rgba(65, 81, 181, 1) 100%);
  color: white;
}

.wrapper .main_content {
  width: 100%;
  margin-left: 350px;
  min-height: 100vh;
  padding: 30px 20px 80px;
  background: #fdfdfd;
}
.avatar {
  padding: 10px;
}
.avatar img {
  width: 100%;
  border-radius: 50%;
}
.avatar p {
  text-align: center;
  font-size: 1.2rem;
  margin-bottom: 20px;
  margin-top: 15px;
}
.exit {
  padding: 40px;
}
</style>