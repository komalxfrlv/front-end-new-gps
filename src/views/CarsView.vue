<template>
  <div class="cars">
    <h1>Автомобили</h1>
    <div class="add-button">
      <ButtonGradient @click="isOpenModal = true">
        Добавить Автомобиль
      </ButtonGradient>
    </div>
    <ModalWindow :open="isOpenModal" @close="isOpenModal = !isOpenModal">
      <AddCar></AddCar>
    </ModalWindow>
    <AllCarsTable></AllCarsTable>
  </div>

</template>

<script>
import AllCarsTable from "@/components/cars/AllCarsTable";
import ModalWindow from "@/components/ui/ModalWindow";
import ButtonGradient from "@/components/ui/ButtonGradient";
import {ref} from "vue";
import AddCar from "@/components/cars/AddCar";
export default {
  name: "CarsView",
  components: {AddCar, ButtonGradient, ModalWindow, AllCarsTable},
  setup() {
    const isOpenModal = ref(false);

    return {
      isOpenModal
    }
  }
}
</script>

<style scoped>
.add-button {
  width: 300px;
  float: right;
  margin-top: -48px;
}
</style>