<template>
  <div class="workers">
    <h1>Сотрудники</h1>
    <div class="add-button">
      <ButtonGradient @click="isOpenModal = true">
        Добавить Сотрудника
      </ButtonGradient>
    </div>
    <ModalWindow :open="isOpenModal" @close="isOpenModal = !isOpenModal">
      <AddWorker @addWorkerToList="addWorkerToList"></AddWorker>
    </ModalWindow>
    <AllWorkersTable :workers="workers"></AllWorkersTable>
  </div>
</template>

<script>
import {ref} from "vue";
import AllWorkersTable from "@/components/workers/AllWorkersTable";
import ModalWindow from "@/components/ui/ModalWindow";
import ButtonGradient from "@/components/ui/ButtonGradient";
import AddWorker from "@/components/workers/AddWorker";
import {useGetAllWorkers} from "@/services/hooks/useGetAllWorkers";

export default {
  name: "WorkersView",
  components: {AddWorker, ButtonGradient, ModalWindow, AllWorkersTable},
  data() {
    return {
      workers: {},
    }
  },
  setup() {
    const isOpenModal = ref(false);

    return {
      isOpenModal,
    }
  },
  async mounted() {
    await useGetAllWorkers().then(w => {
      this.workers = w;
    });
  },
  methods: {
    async addWorkerToList(res) {
      if (res)
        await useGetAllWorkers().then(w => {
          this.workers = w;
        });
    },
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