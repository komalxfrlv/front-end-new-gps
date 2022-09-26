<template>
  <div class="add-tracker-form" v-if="workers && cars">
    <h2>Добавить Трекер</h2>
    <div class="error" v-if="result.error">
      {{result.error}}
    </div>
    <div class="message" v-if="result.message">
      {{result.message}}
    </div>
    <div class="input-box">
      <label>IMEI</label>
      <input class="text-input" v-model="tracker.imei">
    </div>
    <div class="input-box">
      <label>Телефон</label>
      <input class="text-input" v-model="tracker.phone">
    </div>
    <div class="input-box">
      <label>Отслеживать</label>
      <div>
        <input class="radio-button" type="radio" v-model="tracker.tracked" value="auto"> Автомобиль
      </div>
      <div>
        <input class="radio-button" type="radio" v-model="tracker.tracked" value="person"> Сотрудника
      </div>
    </div>
    <div class="input-box" v-if="tracker.tracked === 'auto'">
      <label>Автомобиль</label>
      <select class="text-input" v-model="tracker.car_id">
        <option v-for="item in cars" :key="item.id" :value="item.id">
          {{ item.mark }} {{ item.model }} {{ item.reg_number }}
        </option>
      </select>
    </div>
    <div class="input-box" v-if="tracker.tracked === 'person'">
      <label>Сотрудник</label>
      <select class="text-input" v-model="tracker.person_id">
        <option v-for="item in workers" :key="item.id" :value="item.id">
          {{ item.surname }} {{ item.name }} {{ item.patronymic }}
        </option>
      </select>
    </div>
    <ButtonGradient @click="addTracker(this.tracker)">ДОБАВИТЬ</ButtonGradient>
  </div>
</template>

<script>
import ButtonGradient from "@/components/ui/ButtonGradient";
import {useGetAllCars} from "@/services/hooks/useGetAllCars";
import {useGetAllWorkers} from "@/services/hooks/useGetAllWorkers";
import {useAddTracker} from "@/services/hooks/useAddTracker";

export default {
  name: "AddTracker",
  components: {ButtonGradient},
  data() {
    return {
      tracker: {
        imei: '',
        phone: '',
        car_id: '',
        person_id: '',
        tracked: 'auto',
      },
      workers: null,
      cars: null,
      result: {
        error: null,
        message: null
      },
    }
  },
  methods: {
    async addTracker(data) {
      await useAddTracker(data).then(res => {
        this.result = res;
        this.tracker.imei = '';
        this.tracker.phone = '';
        this.tracker.car_id = '';
        this.tracker.person_id = '';
        this.tracker.tracked = 'auto';
      });
    }
  },
  mounted() {
    useGetAllCars().then(cars => {
      this.cars = cars
    });
    useGetAllWorkers().then(workers => {
      this.workers = workers
    });
  }
}
</script>

<style scoped>
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
.add-tracker-form {
  margin-bottom: 10px;
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