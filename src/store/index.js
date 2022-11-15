import { createStore } from 'vuex'

export default createStore({
  state: {
    loggedIn: false,
  },
  getters: {
  },
  mutations: {
    changeLoggedInState(state, logged) {
      this.state.loggedIn = logged;
    }
  },
  actions: {
  },
  modules: {
  }
})
