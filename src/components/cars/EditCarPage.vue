<template>
  <div class="edit-car-form" v-if="carToEdit">
    <h2>Редактировать Автомобиль №{{carToEdit.id}}</h2>
    <div class="error" v-if="result.error">
      {{result.error}}
    </div>
    <div class="message" v-if="result.message">
      {{result.message}}
    </div>
    <div class="input-box">
      <label>Марка</label>
      <input v-model="carToEdit.mark">
    </div>
    <div class="input-box">
      <label>Модель</label>
      <input v-model="carToEdit.model">
    </div>
    <div class="input-box">
      <label>Цвет</label>
      <input v-model="carToEdit.color">
    </div>
    <div class="input-box">
      <label>Гос. Номер</label>
      <input v-model="carToEdit.reg_number">
    </div>
    <div class="input-box">
      <label>VIN</label>
      <input v-model="carToEdit.vin">
    </div>
    <ButtonGradient @click="editCar(this.carToEdit)">СОХРАНИТЬ</ButtonGradient>
    <div class="delete-button">
      <ButtonRed>УДАЛИТЬ</ButtonRed>
    </div>
  </div>
  <LoadingCircle v-else></LoadingCircle>
</template>

<script>

import ButtonGradient from "@/components/ui/ButtonGradient";
import {useGetCarById} from "@/services/hooks/useGetCarById";
import {ref} from "vue";
import {useRoute} from "vue-router";
import {useUpdateCar} from "@/services/hooks/useUpdateCar";
import ButtonRed from "@/components/ui/ButtonRed";
import LoadingCircle from "@/components/ui/LoadingCircle";

export default {
  name: "EditCarPage",
  components: {LoadingCircle, ButtonRed, ButtonGradient},
  methods: {
    async editCar(data) {
      await useUpdateCar(data).then(result => {
        this.result = result;
      })
    },
  },
  setup() {
    const carToEdit = ref();
    const route = useRoute();
    const result = ref({message: null, error: null})
    return {
      carToEdit,
      result,
      route
    }
  },
  mounted() {
    useGetCarById(this.route.params.id).then(car => {
      this.carToEdit = car
      console.log(car)
    })
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
.input-box input {
  font-size: 20px;
  font-weight: 200;
  padding: 8px;
  border: 1px solid #eeeeee;
  border-radius: 8px;
  width: 100%;
}
.edit-car-form {
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