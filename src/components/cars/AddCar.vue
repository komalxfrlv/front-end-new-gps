<template>
  <div class="add-worker-form">
    <h2>Добавить Автомобиль</h2>
    <div class="error" v-if="result.error">
      {{result.error}}
    </div>
    <div class="message" v-if="result.message">
      {{result.message}}
    </div>
    <div class="input-box">
      <label>Марка</label>
      <input v-model="car.mark">
    </div>
    <div class="input-box">
      <label>Модель</label>
      <input v-model="car.model">
    </div>
    <div class="input-box">
      <label>Цвет</label>
      <input v-model="car.color">
    </div>
    <div class="input-box">
      <label>Гос. Номер</label>
      <input v-model="car.reg_number">
    </div>
    <div class="input-box">
      <label>VIN</label>
      <input v-model="car.vin">
    </div>
    <ButtonGradient @click="addCar(this.car)">ДОБАВИТЬ</ButtonGradient>
  </div>
</template>

<script>
import ButtonGradient from "@/components/ui/ButtonGradient";
import {useAddCar} from "@/services/hooks/useAddCar";
export default {
  name: "AddCar",
  components: {ButtonGradient},
  data() {
    return {
      car: {
        mark: '',
        model: '',
        reg_number: '',
        color: '',
        vin: '',
      },
      result: {
        error: null,
        message: null
      },
    }
  },
  methods: {
    async addCar(data) {
      await useAddCar(data).then(res => {
        this.result = res;
        this.car.mark = '';
        this.car.model = '';
        this.car.reg_number = '';
        this.car.color = '';
        this.car.vin = '';
      });
    }
  }
}
</script>

<style scoped>
.input-box {
  margin-bottom: 10px;
}
.input-box input {
  font-size: 20px;
  font-weight: 200;
  padding: 8px;
  border: 1px solid #eeeeee;
  border-radius: 8px;
  width: 100%;
}
.add-worker-form {
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