import { createRouter, createWebHistory } from 'vue-router'
import {useCookies} from "vue3-cookies";
import HomeView from '../views/HomeView.vue'
import TrackersView from "@/views/TrackersView";
import CarsView from "@/views/CarsView";
import WorkersView from "@/views/WorkersView";
import LoginView from "@/views/LoginView";
import EditCarPage from "@/components/cars/EditCarPage";
import EditWorkerPage from "@/components/workers/EditWorkerPage";
import EditTrackerPage from "@/components/trackers/EditTrackerPage";

const {cookies} = useCookies();

const isAuthorized = cookies.isKey('user_token');

const authGuard = function (to, from, next) {
  if (!isAuthorized) next({name: 'login'});
  else next()
}

// TODO: authGuard работает через хуй и как говно, допилить ебпта!

const routes = [
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/',
    name: 'home',
    component: HomeView,
    beforeEnter: authGuard
  },
  {
    path: '/trackers',
    name: 'trackers',
    component: TrackersView,
    beforeEnter: authGuard
  },
  {
    path: '/cars',
    name: 'cars',
    component: CarsView,
    beforeEnter: authGuard
  },
  {
    path: '/workers',
    name: 'workers',
    component: WorkersView,
    beforeEnter: authGuard
  },
  // Страницы редактирования
  {
    path: '/cars/:id',
    name: 'car-edit',
    component: EditCarPage,
    beforeEnter: authGuard
  },
  {
    path: '/workers/:id',
    name: 'worker-edit',
    component: EditWorkerPage,
    beforeEnter: authGuard
  },
  {
    path: '/trackers/:id',
    name: 'tracker-edit',
    component: EditTrackerPage,
    beforeEnter: authGuard
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
