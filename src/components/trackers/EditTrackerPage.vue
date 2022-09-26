<template>
  <div class="edit-tracker-form" v-if="trackerToEdit && cars && workers">
    <h2>Редактировать Трекер №{{trackerToEdit.id}}</h2>
    <div class="error" v-if="result.error">
      {{result.error}}
    </div>
    <div class="message" v-if="result.message">
      {{result.message}}
    </div>
    <div class="input-box">
      <label>IMEI</label>
      <input class="text-input" v-model="updatedTracker.imei">
    </div>
    <div class="input-box">
      <label>Телефон</label>
      <input class="text-input" v-model="updatedTracker.phone">
    </div>
    <div class="input-box">
      <label>Отслеживать</label>
      <div>
        <input class="radio-button" type="radio" v-model="updatedTracker.tracked" value="auto"> Автомобиль
      </div>
      <div>
        <input class="radio-button" type="radio" v-model="updatedTracker.tracked" value="person"> Сотрудника
      </div>
    </div>
    <div class="input-box" v-if="updatedTracker.tracked === 'auto'">
      <label>Автомобиль</label>
      <select class="text-input" v-model="trackerToEdit.car_id">
        <option v-for="item in cars" :key="item.id" :value="item.id">
          {{ item.mark }} {{ item.model }} {{ item.reg_number }}
        </option>
      </select>
    </div>
    <div class="input-box" v-if="updatedTracker.tracked === 'person'">
      <label>Сотрудник</label>
      <select class="text-input" v-model="trackerToEdit.person_id">
        <option v-for="item in workers" :key="item.id" :value="item.id">
          {{ item.surname }} {{ item.name }} {{ item.patronymic }}
        </option>
      </select>
    </div>
    <ButtonGradient @click="editTracker(this.updatedTracker)">СОХРАНИТЬ</ButtonGradient>
    <div class="delete-button">
      <ButtonRed>УДАЛИТЬ</ButtonRed>
    </div>
  </div>
  <LoadingCircle v-else></LoadingCircle>
</template>

<script>
import {ref} from "vue";
import {useRoute} from "vue-router";
import {useUpdateTracker} from "@/services/hooks/useUpdateTracker";
import {useGetTrackerById} from "@/services/hooks/useGetTrackerById";
import ButtonRed from "@/components/ui/ButtonRed";
import LoadingCircle from "@/components/ui/LoadingCircle";
import ButtonGradient from "@/components/ui/ButtonGradient";
import {useGetAllCars} from "@/services/hooks/useGetAllCars";
import {useGetAllWorkers} from "@/services/hooks/useGetAllWorkers";

export default {
  name: "EditTrackerPage",
  components: {LoadingCircle, ButtonRed, ButtonGradient},
  methods: {
    async editTracker(data) {
      await useUpdateTracker(data).then(result => {
        this.result = result;
      })
    },
  },
  setup() {
    const trackerToEdit = ref();
    const updatedTracker = ref({
      id: '',
      imei: '',
      phone: '',
      car_id: '',
      person_id: '',
      tracked: 'auto',
    });
    const cars = ref();
    const workers = ref();
    const tracked = ref();

    const route = useRoute();

    const result = ref({message: null, error: null})

    return {
      trackerToEdit,
      updatedTracker,
      cars,
      workers,
      tracked,
      result,
      route
    }
  },
  async mounted() {
    await useGetAllCars().then(cars => {
      this.cars = cars
    });
    await useGetAllWorkers().then(workers => {
      this.workers = workers
    });
    await useGetTrackerById(this.route.params.id).then(tracker => {
      this.trackerToEdit = tracker
    });

    this.updatedTracker.id = this.trackerToEdit.id;
    this.updatedTracker.imei = this.trackerToEdit.imei;
    this.updatedTracker.phone = this.trackerToEdit.phone;
    this.updatedTracker.car_id = this.trackerToEdit.car_id;
    this.updatedTracker.person_id = this.trackerToEdit.person_id;
    this.updatedTracker.tracked = this.trackerToEdit.car_id ? 'auto' : 'person';
  }
}
</script>

<style scoped>
.delete-button {
  margin-top: 10px;
}
.input-box {
  margin-bottom: 10px;
}
.input-box .text-input {
  font-size: 20px;
  font-weight: 200;
  padding: 8px;
  border: 1px solid #eeeeee;
  border-radius: 8px;
  width: 100%;
}
.edit-tracker-form {
  max-width: 600px;
  margin: 60px auto;
}
h2 {
  padding-bottom: 2px;
  margin-bottom: 10px;
  border-bottom: 1px solid #dfdfdf
}
.message {
  color: white;
  padding: 10px;
  text-align: center;
  background: green;
  border-radius: 8px;
}
.error {
  color: white;
  padding: 10px;
  text-align: center;
  background: red;
  border-radius: 8px;
}
</style>