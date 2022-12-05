<template>
  <div class="home">
    <h1>Главная страницы</h1>
    <div v-if="lowBalance && lowBattery && offlineNow && tNowInCity">
      <div class="container">
        <div class="block">
          <h2>
            Трекеры в городе
            <select @change="getTNowInCity(this.selectedCity)" v-model="selectedCity" name="city" id="city-select" class="f-input">
              <option v-for="city in cities" :key="city">{{city}}</option>
            </select>
          </h2>
          <div class="separator"></div>
          <TrackerList :trackers="tNowInCity"></TrackerList>
        </div>
        <div class="block">
          <h2>Давно не были онлайн</h2>
          <div class="separator"></div>
          <TrackerList :trackers="offlineNow"></TrackerList>
        </div>
      </div>
      <div class="container">
        <div class="block">
          <h2>Низкий заряд</h2>
          <div class="separator"></div>
          <TrackerList :marker="'power'" :trackers="lowBattery"></TrackerList>
        </div>
        <div class="block">
          <h2>Низкий баланс</h2>
          <div class="separator"></div>
          <TrackerList :marker="'balance'" :trackers="lowBalance"></TrackerList>
        </div>
      </div>
    </div>
    <LoadingCircle v-else></LoadingCircle>
  </div>
</template>

<script>

import {cities} from "@/services/data/cities";
import {useGetLowBatteryTrackers} from "@/services/hooks/useGetLowBatteryTrackers";
import {useGetLowBalanceTrackers} from "@/services/hooks/useGetLowBalanceTrackers";
import {useGetNowOfflineTrackers} from "@/services/hooks/useGetNowOfflineTrackers";
import {useGetTrackersInCity} from "@/services/hooks/useGetTrackersInCity";
import TrackerList from "@/components/home/TrackerList";
import LoadingCircle from "@/components/ui/LoadingCircle";

export default {
  name: 'HomeView',
  components: {
    LoadingCircle,
    TrackerList,
  },
  data() {
    return {
      cities: cities(),
      selectedCity: 'Екатеринбург',
      lowBattery: null,
      lowBalance: null,
      offlineNow: null,
      tNowInCity: null,
    }
  },
  methods: {
    async getLowBattery() {
      this.lowBattery = await useGetLowBatteryTrackers();
    },
    async getLowBalance() {
      this.lowBalance = await useGetLowBalanceTrackers();
    },
    async getOfflineNow() {
      this.offlineNow = await useGetNowOfflineTrackers();
    },
    async getTNowInCity(city) {
      this.tNowInCity = await useGetTrackersInCity(city)
    }
  },
  mounted() {
    this.getOfflineNow();
    this.getLowBattery();
    this.getLowBalance();
    this.getTNowInCity(this.selectedCity);
  }
}
</script>

<style scoped>

.container {
  display: flex;
}
.separator {
  border-bottom: 1px solid #cccccc;
}
.block {
  width: 50%;
  padding: 20px;
  border-radius: 18px;
  margin: 20px;
  box-shadow: 0 5px 32px -18px rgba(38, 6, 65, 0.5);
}

.f-input {
  font-size: 18px;
  padding: 4px;
  margin-left: 5px;
  margin-right: 5px;
  border: 0;
}

</style>
