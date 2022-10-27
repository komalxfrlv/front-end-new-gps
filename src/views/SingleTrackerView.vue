<template>
  <div class="single-tracker" v-if="tracker">
    <h1>Трекер {{tracker.imei}}</h1>
    <div class="container">
      <div class="block">
        <l-map :zoom="zoom" :center="center" style="height: 500px;">
          <l-tile-layer :url="url" :attribution="attribution"/>
          <l-marker :lat-lng="withTooltip">
            <l-tooltip :options="{ permanent: true, interactive: true }">
              {{tooltipInfo}}
            </l-tooltip>
          </l-marker>
          <l-polyline
              :lat-lngs="polyline"
              :color="color"
          />
        </l-map>
      </div>
      <div class="block info">
        <div class="info-block">
          <b>Текущее местоположение:</b>
          <p>
            {{tracker.positions[0].address}}
          </p>
        </div>
        <div class="info-block">
          <b>Телефон трекера:</b>
          <p>
            {{tracker.phone}}
          </p>
        </div>
        <div class="info-block">
          <b>Баланс трекера:</b>
          <p>
            {{tracker.balance}} руб.
          </p>
        </div>
        <div class="info-block">
          <b>Заряд трекера трекера:</b>
          <p>
            {{tracker.power}} %
          </p>
        </div>
        <div class="info-block" v-if="tracker.car">
          <b>Автомобиль:</b>
          <p>
            {{tracker.car.color}} {{tracker.car.mark}} {{tracker.car.model}} {{tracker.car.reg_number}}
          </p>
        </div>
        <div class="info-block" v-if="tracker.car">
          <b>VIN Автомобиля:</b>
          <p>
            {{tracker.car.vin}}
          </p>
        </div>
        <div class="info-block"  v-if="tracker.person">
          <b>Сотрудник:</b>
          <p>
            {{tracker.person.surname}} {{tracker.person.name}} {{tracker.person.patronymic}}
          </p>
        </div>
        <div class="info-block"  v-if="tracker.person">
          <b>Телефон сотрудника:</b>
          <p>
            {{tracker.person.phone}}
          </p>
        </div>
        <div class="info-block">
          <b>Длинна пути:</b>
          <p>
            {{thePath}} км.
          </p>
        </div>
      </div>
    </div>
  </div>
  <LoadingCircle v-else />
</template>

<script>
import {useGetTrackerById} from "@/services/hooks/useGetTrackerById";
import LoadingCircle from "@/components/ui/LoadingCircle";
import {useRoute} from "vue-router/dist/vue-router";
import {ref} from "vue";
import {latLng} from "leaflet";
import {LMap, LTileLayer, LMarker, LTooltip, LPolyline} from "@vue-leaflet/vue-leaflet";
import "leaflet/dist/leaflet.css";

export default {
  name: "SingleTrackerView",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LTooltip,
    LPolyline,
    LoadingCircle
  },
  setup() {
    const route = useRoute();
    const tracker = ref();

    return { route, tracker }
  },
  data() {
    return {
      posResponse: null,
      zoom: 12.5,
      center: null,
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '',
      withTooltip: null,
      currentZoom: 12.5,
      currentCenter: null,
      showParagraph: false,
      mapOptions: {
        zoomSnap: 0.5,
        attributionControl: false,
      },
      showMap: true,
      tooltipInfo: 'Трекер',
      polyline: null,
      color: "blue",
      thePath: 0,
    };
  },
  async mounted() {
    await useGetTrackerById(this.route.params.id).then(tracker => {
      this.tracker = tracker;

      this.currentCenter = this.getLastLatLng();
      this.center = this.getLastLatLng();
      this.withTooltip = this.getLastLatLng();

      this.polyline = this.makeRoute(this.tracker.positions);

      this.pathLength(this.tracker.positions);
    });
  },
  methods: {
    zoomUpdate(zoom) {
      this.currentZoom = zoom;
    },
    centerUpdate(center) {
      this.currentCenter = center;
    },
    makeRoute(positions) {
      let preformedPositions = [];

      for(let i = 0; i < positions.length; i++)
      {
        preformedPositions.push(latLng(
            parseFloat(positions[i].latitude),
            parseFloat(positions[i].longitude)
        ));
      }

      return preformedPositions;
    },
    pathLength(positions) {
      if(positions.length > 1)
      {
        for (let i = 1; i < positions.length; i++)
          this.thePath = (latLng(positions[i].latitude, positions[i].longitude)
              .distanceTo(latLng(positions[i-1].latitude, positions[i-1].longitude)))
              + this.thePath;

        this.thePath = (this.thePath / 1000).toFixed(2);
      }
    },
    getLastLatLng() {
      return latLng(
          parseFloat(this.tracker.positions[0].latitude),
          parseFloat(this.tracker.positions[0].longitude)
      );
    },
  }
}
</script>

<style scoped>
.container {
  display: flex; /* or inline-flex */
}
.block {
  width: 50%;
}
.info {
  padding: 0 50px;
}
h1 {
  margin-bottom: 20px;
}
.info-block {
  font-size: 18px;
  margin-bottom: 16px;
}
</style>