<template>
  <table v-if="trackers">
    <thead>
    <tr>
      <th>
        <div>Телефон</div>
      </th>
      <th>
        <div>Баланс</div>
      </th>
      <th>
        <div>Заряд</div>
      </th>
      <th>
        <div>Ослеживание</div>
      </th>
      <th>
        <div>Адрес</div>
      </th>
      <th>
        <div></div>
      </th>
      <th>
        <div></div>
      </th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="tracker in trackers" :key="tracker.id">
      <td>{{tracker.phone}}</td>

      <td v-if="tracker.balance">
        {{tracker.balance}} р.
      </td>
      <td v-else>Нет данных</td>

      <td v-if="tracker.charge">
        {{tracker.charge}}%
      </td>
      <td v-else>Нет данных</td>

      <td v-if="tracker.car">
        {{tracker.car.mark}} {{tracker.car.model}} {{tracker.car.reg_number}}
      </td>
      <td v-if="tracker.person">
        {{tracker.person.surname}} {{tracker.person.name}} {{tracker.person.patronymic}}
      </td>

      <td v-if="tracker.position.address">{{tracker.position.address}}</td>
      <td v-else>Нет данных</td>

      <td>
        <ButtonWhite>На карте</ButtonWhite>
      </td>
      <td>
        <router-link :to="{name:'tracker-edit',params:{id:tracker.id}}">
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
import {useGetAllTrackers} from "@/services/hooks/useGetAllTrackers";
import LoadingCircle from "@/components/ui/LoadingCircle";
export default {
  name: "AllTrackersTable",
  components: {
    LoadingCircle,
    ButtonWhite
  },
  data() {
    return {
      trackers: null
    }
  },
  mounted() {
    useGetAllTrackers().then(t => {
      this.trackers = t
    });
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