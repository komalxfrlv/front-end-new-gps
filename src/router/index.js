import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TrackersView from "@/views/TrackersView";
import CarsView from "@/views/CarsView";
import WorkersView from "@/views/WorkersView";
import LoginView from "@/views/LoginView";
import EditCarPage from "@/components/cars/EditCarPage";
import EditWorkerPage from "@/components/workers/EditWorkerPage";
import EditTrackerPage from "@/components/trackers/EditTrackerPage";
import VirtualTrackers from "@/views/help/VirtualTrackers";
import SingleTrackerView from "@/views/SingleTrackerView";
import MapView from "@/views/MapView";
import {useCheckUser} from "@/services/hooks/useCheckUser";
import RegisterView from "@/views/RegisterView";

const authGuard = function (to, from, next) {
    useCheckUser().then(user => {
        if (!user) {
            next({name: 'login'});
        } else {
            next();
        }
    });
}

const loggedIn = function (to, from, next) {
    useCheckUser().then(user => {
        if (user) {
            next({name: 'home'});
        } else {
            next();
        }
    });
}

const routes = [
    {
        path: '/login',
        name: 'login',
        component: LoginView,
        beforeEnter: loggedIn,
    },
    {
        path: '/register',
        name: 'register',
        component: RegisterView,
        beforeEnter: loggedIn,
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
    {
        path: '/tracker-info/:id',
        name: 'tracker-info',
        component: SingleTrackerView,
        beforeEnter: authGuard
    },
    {
        path: '/map',
        name: 'map',
        component: MapView,
        beforeEnter: authGuard
    },
    {
        path: '/vtr',
        name: 'virtual-trackers',
        component: VirtualTrackers,
        beforeEnter: authGuard
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
