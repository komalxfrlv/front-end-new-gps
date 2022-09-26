<template>
  <div class="add-worker-form">
    <h2>Добавить Сотрудника</h2>
    <div class="error" v-if="result.error">
      {{result.error}}
    </div>
    <div class="message" v-if="result.message">
      {{result.message}}
    </div>
    <div class="input-box">
      <label>Фамилия</label>
      <input v-model="worker.surname">
    </div>
    <div class="input-box">
      <label>Имя</label>
      <input v-model="worker.name">
    </div>
    <div class="input-box">
      <label>Отчество</label>
      <input v-model="worker.patronymic">
    </div>
    <div class="input-box">
      <label>Телефон</label>
      <input v-model="worker.phone">
    </div>
    <div class="input-box">
      <label>Адрес</label>
      <input v-model="worker.address">
    </div>
    <ButtonGradient @click="addWorker(this.worker)">ДОБАВИТЬ</ButtonGradient>
  </div>
</template>

<script>
import ButtonGradient from "@/components/ui/ButtonGradient";
import {useAddWorker} from "@/services/hooks/useAddWorker";
export default {
  name: "AddWorker",
  components: {ButtonGradient},
  data() {
    return {
      worker: {
        name: '',
        surname: '',
        patronymic: '',
        phone: '',
        address: '',
      },
      result: {
        error: null,
        message: null
      },
    }
  },
  methods: {
    async addWorker(data) {
      await useAddWorker(data).then(res => {
        this.result = res;
        this.worker.name = '';
        this.worker.surname = '';
        this.worker.patronymic = '';
        this.worker.phone = '';
        this.worker.address = '';
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