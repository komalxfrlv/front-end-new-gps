<template>
  <div v-if="trackers">
    <h1>Виртуальные Трекеры</h1>
    <div class="buttons">
      <ButtonGradient @click="enable = true">
        Запустить
      </ButtonGradient>
      <ButtonRed @click="enable = false">
        Остановить
      </ButtonRed>
    </div>
    <div class="virtual-trackers">
      <div class="add-v-tracker">
        <div v-for="item in trackers" :key="item.id">
          <div class="imei-number">
            {{item.imei}}
          </div>
          <ButtonWhite @click="addTrackerToWork(item)">
            Добавить
          </ButtonWhite>
        </div>
      </div>
      <div class="info-v-tracker">
        <h2>Отладочная информация</h2>
        <pre>{{imei}}</pre>
        <hr>
        <pre>{{trackers}}</pre>
        <hr>
        <pre>{{inWork}}</pre>
        <hr>
        <pre>{{responses}}</pre>
      </div>
    </div>
  </div>
  <LoadingCircle v-else />

</template>

<script>
import ButtonGradient from "@/components/ui/ButtonGradient";
import ButtonRed from "@/components/ui/ButtonRed";
import LoadingCircle from "@/components/ui/LoadingCircle";
import {useGetAllTrackers} from "@/services/hooks/useGetAllTrackers";
import apiPublic from "@/services/api/ApiPublic";
import ButtonWhite from "@/components/ui/ButtonWhite";

export default {
  name: "VirtualTrackers",
  components: {ButtonWhite, LoadingCircle, ButtonRed, ButtonGradient},
  data() {
    return {
      trackers: null,
      inWork: [],
      imei: null,
      responses: [],
      timer: null,
      enable: false
    }
  },
  mounted() {
    useGetAllTrackers().then(t => {
      this.trackers = t;
    });
    this.timer = setInterval(async () => {
      if (this.inWork.length) {
        if(this.enable)
        {
          for (const value of this.inWork) {
            await this.sendDataFromTracker(await this.prepareTracker(value))
          }
        }
      }
    }, 7000)
  },
  methods: {
    async getRandomFloat(min, max, decimals) {
      const str = (Math.random() * (max - min) + min).toFixed(decimals);

      return parseFloat(str);
    },
    async sendDataFromTracker(data) {
      await apiPublic().post('hardware-data', data).then(r => {
        this.responses.push(r)
      });
    },
    async prepareTracker(imei) {
      let preparedTrackerInfo = { imei: imei };

      preparedTrackerInfo.latitude = await this.getRandomFloat(56.450000, 56.950000, 6);
      preparedTrackerInfo.longitude = await this.getRandomFloat(60.150000, 60.950000, 6);
      preparedTrackerInfo.charge = await this.getRandomFloat(15.50, 99.89, 2);
      preparedTrackerInfo.balance = await this.getRandomFloat(-1500, 3500, 2);
      preparedTrackerInfo.is_charging = preparedTrackerInfo.charge <= await this.getRandomFloat(15.50, 99,2);

      this.imei = null;

      return preparedTrackerInfo;
    },
    async addTrackerToWork(tracker) {
      this.trackers = this.trackers.filter(element => element !== tracker)
      this.inWork.push(tracker.imei);
    }
  },
}
</script>

<style scoped>
h1, h2 {
  text-align: center;
  padding: 9px;
}
.virtual-trackers {
  display: flex;
  flex-direction: row;
}
.add-v-tracker, .info-v-tracker{
  width: 50%;
  height: 100vh;
}
.imei-number {

}
</style>