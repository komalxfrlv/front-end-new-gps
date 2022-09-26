<template>
  <div class="edit-worker-form" v-if="workerToEdit">
    <h2>Редактировать Работника №{{workerToEdit.id}}</h2>
    <div class="error" v-if="result.error">
      {{result.error}}
    </div>
    <div class="message" v-if="result.message">
      {{result.message}}
    </div>
    <div class="input-box">
      <label>Фамилия</label>
      <input v-model="workerToEdit.surname">
    </div>
    <div class="input-box">
      <label>Имя</label>
      <input v-model="workerToEdit.name">
    </div>
    <div class="input-box">
      <label>Отчество</label>
      <input v-model="workerToEdit.patronymic">
    </div>
    <div class="input-box">
      <label>Телефон</label>
      <input v-model="workerToEdit.phone">
    </div>
    <div class="input-box">
      <label>Адрес</label>
      <input v-model="workerToEdit.address">
    </div>
    <ButtonGradient @click="editWorker(this.workerToEdit)">СОХРАНИТЬ</ButtonGradient>
    <div class="delete-button">
      <ButtonRed>УДАЛИТЬ</ButtonRed>
    </div>
  </div>
  <LoadingCircle v-else></LoadingCircle>
</template>

<script>
import ButtonGradient from "@/components/ui/ButtonGradient";
import {ref} from "vue";
import {useRoute} from "vue-router";
import ButtonRed from "@/components/ui/ButtonRed";
import {useUpdateWorker} from "@/services/hooks/useUpdateWorker";
import {useGetWorkerById} from "@/services/hooks/useGetWorkerById";
import LoadingCircle from "@/components/ui/LoadingCircle";

export default {
  name: "EditWorkerPage",
  components: {LoadingCircle, ButtonRed, ButtonGradient},
  methods: {
    async editWorker(data) {
      await useUpdateWorker(data).then(result => {
        this.result = result;
      })
    },
  },
  setup() {
    const workerToEdit = ref();
    const route = useRoute();
    const result = ref({message: null, error: null})
    return {
      workerToEdit,
      result,
      route
    }
  },
  mounted() {
    useGetWorkerById(this.route.params.id).then(worker => {
      this.workerToEdit = worker
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
.edit-worker-form {
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