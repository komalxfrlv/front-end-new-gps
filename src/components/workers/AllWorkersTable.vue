<template>
  <table v-if="workers">
    <thead>
    <tr>
      <th>
        <div>Фамилия</div>
      </th>
      <th>
        <div>Имя</div>
      </th>
      <th>
        <div>Отчество</div>
      </th>
      <th>
        <div>Телефон</div>
      </th>
      <th>
        <div>Адрес</div>
      </th>
      <th>
        <div></div>
      </th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="worker in workers" :key="worker.id">
      <td>{{worker.surname}}</td>
      <td>{{worker.name}}</td>
      <td>{{worker.patronymic}}</td>
      <td>{{worker.phone}}</td>
      <td>{{worker.address}}</td>
      <td>
        <router-link :to="{name:'worker-edit',params:{id:worker.id}}">
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
import {useGetAllWorkers} from "@/services/hooks/useGetAllWorkers";
import LoadingCircle from "@/components/ui/LoadingCircle";
export default {
  name: "AllWorkersTable",
  components: {
    LoadingCircle,
    ButtonWhite
  },
  data() {
    return {
      workers: null
    }
  },
  mounted() {
    useGetAllWorkers().then(w => {
      this.workers = w;
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