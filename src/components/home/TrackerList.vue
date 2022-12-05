<template>
  <div>
    <h3 v-if="trackers.length === 0">Нет данных</h3>
    <table>
      <tr class="tracker" v-for="tracker in trackers" :key="tracker.id">
        <td v-if="tracker.car">
          {{ tracker.car.mark }} {{ tracker.car.model }} {{ tracker.car.reg_number }}
        </td>
        <td v-if="tracker.person">
          {{ tracker.person.surname }} {{ tracker.person.name }} {{ tracker.person.patronymic }}
        </td>

        <td>{{ tracker.phone }}</td>

        <td v-if="marker === 'balance'">{{ tracker.balance }} руб.</td>

        <td v-else-if="marker === 'power'">{{tracker.power}} %</td>
        <td v-else>{{ tracker.imei }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "TrackerList",
  props: ['trackers', 'marker'],
}
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: separate;
  text-indent: initial;
  border-spacing: 0;
}
table tr td {
  padding: 8px 15px;
}
h3 {
  padding: 8px 15px;
}
tr:hover {
  background: radial-gradient(circle, rgba(175,65,181,1) 0%, rgba(151,69,191,1) 25%, rgba(110,70,169,1) 50%, rgba(84,69,191,1) 75%, rgba(128,53,135,1) 100%, rgba(65,81,181,1) 100%);
  color: white;
}
</style>