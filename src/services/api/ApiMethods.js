import ApiPublic from "@/services/api/ApiPublic";
import ApiProtected from "@/services/api/ApiProtected";
import {useCookies} from "vue3-cookies";

const {cookies} = useCookies();

export default {
    async logout() {
        await ApiProtected().post('logout').then(() => {
            cookies.remove('user_token');
        });
        return true;
    },
    async getTokenByLogin(data) {
        await ApiPublic().post('login', data).then(response => {
            cookies.set('user_token', response.data.access_token, 3600);
        });
        return true;
    },
    async checkUser() {
        await ApiPublic().post('user').then(response => {
            if (response.data.isEmpty)
                return false;
        });
        return true;
    },
    async getWorkers() {
        let workers;
        await ApiProtected().get('people').then(response => {
            workers = response.data;
        });
        return workers;
    },
    async getWorkerById(id) {
        let worker;
        await ApiProtected().get('people/'.concat(id)).then(response => {
            worker = response.data
        })
        return worker;
    },
    async addWorker(data) {
        let result;
        await ApiProtected().post('people', data).then(response => {
            result = response.data;
        });
        return result
    },
    async updateWorker(data) {
        let result;
        await ApiProtected().put('people', data).then(response => {
            result = response.data;
        })
        return result;
    },
    async getCars() {
        let cars;
        await ApiProtected().get('cars').then(response => {
            cars = response.data;
        });
        return cars;
    },
    async getCarById(id) {
        let car;
        await ApiProtected().get('cars/'.concat(id)).then(response => {
            car = response.data
        })
        return car;
    },
    async addCar(data) {
        let result;
        await ApiProtected().post('cars', data).then(response => {
            result = response.data;
        });
        return result
    },
    async updateCar(data) {
        let result;
        await ApiProtected().put('cars', data).then(response => {
            result = response.data;
        })
        return result;
    },
    async getTrackers() {
        let trackers;
        await ApiProtected().get('trackers').then(response => {
            trackers = response.data;
        });
        return trackers
    },
    async getTrackerById(id) {
        let tracker;
        await ApiProtected().get('trackers/'.concat(id)).then(response => {
            tracker = response.data
        })
        return tracker;
    },
    async addTracker(data) {
        let result;
        await ApiProtected().post('trackers', data).then(response => {
            result = response.data;
        });
        return result
    },
    async updateTracker(data) {
        let result;
        await ApiProtected().put('trackers', data).then(response => {
            result = response.data;
        })
        return result;
    },

}