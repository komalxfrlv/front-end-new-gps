<template>
  <table v-if="cars">
    <thead>
    <tr>
      <th>
        <div>Марка</div>
      </th>
      <th>
        <div>Модель</div>
      </th>
      <th>
        <div>Гос. Номер</div>
      </th>
      <th>
        <div>Цвет</div>
      </th>
      <th>
        <div>VIN Номер</div>
      </th>
      <th>
        <div></div>
      </th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="car in cars" :key="car.id">
      <td>{{car.mark}}</td>
      <td>{{car.model}}</td>
      <td>{{car.reg_number}}</td>
      <td>{{car.color}}</td>
      <td>{{car.vin}}</td>
      <td>
        <router-link :to="{name:'car-edit',params:{id:car.id}}">
          <ButtonWhite>Изменить</ButtonWhite>
        </router-link>
      </td>
    </tr>
    </tbody>
  </table>
  <LoadingCircle v-else></LoadingCircle>
</template>

<script>
import ButtonWhite from "@/components/ui/ButtonWhite";
import {useGetAllCars} from "@/services/hooks/useGetAllCars";
import LoadingCircle from "@/components/ui/LoadingCircle";

export default {
  name: "AllCarsTable",
  components: {LoadingCircle, ButtonWhite},
  methods: {
  },
  data() {
    return {
      cars: null,
    }
  },
  mounted() {
    useGetAllCars().then(c => {
      this.cars = c
    })
  }
}
</script>

<style scoped>
table {
  width: 100%;
  font-size: 1.1rem;
}
table tr th {
  padding: 10px 15px;
  text-align: left;
}

table tr td {
  padding: 8px 15px;
}

table tbody tr {
  border-radius: 5px;
  transition: 0.1s;
}

table tbody tr:hover {
  background: radial-gradient(circle, rgba(175,65,181,1) 0%, rgba(151,69,191,1) 25%, rgba(110,70,169,1) 50%, rgba(84,69,191,1) 75%, rgba(128,53,135,1) 100%, rgba(65,81,181,1) 100%);
  color: white;
}
table {
  border-collapse: separate;
  text-indent: initial;
  border-spacing: 0;
}
</style>