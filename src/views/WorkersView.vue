<template>
  <div class="workers">
    <h1>Сотрудники</h1>
    <div class="add-button">
      <ButtonGradient @click="isOpenModal = true">
        Добавить Сотрудника
      </ButtonGradient>
    </div>
    <ModalWindow :open="isOpenModal" @close="isOpenModal = !isOpenModal">
      <AddWorker></AddWorker>
    </ModalWindow>
    <AllWorkersTable></AllWorkersTable>
  </div>
</template>

<script>
import {ref} from "vue";
import AllWorkersTable from "@/components/workers/AllWorkersTable";
import ModalWindow from "@/components/ui/ModalWindow";
import ButtonGradient from "@/components/ui/ButtonGradient";
import AddWorker from "@/components/workers/AddWorker";

export default {
  name: "WorkersView",
  components: {AddWorker, ButtonGradient, ModalWindow, AllWorkersTable},
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