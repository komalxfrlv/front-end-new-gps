<template>
  <div class="map-view">
    <h1>Трекеры на карте</h1>

    <div class="filters" v-if="carsList && workersList">
      <div class="container">
        <div class="block">
          <button-gradient @click="isOpenModalCars = true">Выберите Автомобили</button-gradient>
          <div class="selected-cars">
            <h2>Выбранные автомобили</h2>
            <div class="cars">
              <ul class="notification-badges">
                <li v-for="c in filters.carsSelected" :key="c">{{ cars(c) }}</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="block">
          <button-gradient @click="isOpenModalWorkers = true">Выберите Сотрудников</button-gradient>
          <div class="selected-workers">
            <h2>Выбранные сотрудники</h2>
            <div class="workers">
              <ul class="notification-badges">
                <li v-for="w in filters.workersSelected" :key="w">{{ workers(w) }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="datetime-picker-form">
        <b>C:</b><input class="datetime-picker f-input" type="datetime-local" v-model="filters.fromDate">
        <b>По:</b><input class="datetime-picker f-input" type="datetime-local" v-model="filters.toDate">
        <b>Был в городе:</b>
        <select v-model="filters.selectedCity" name="city" id="city-select" class="f-input">
          <option v-for="city in cities" :key="city">{{ city }}</option>
        </select>
      </div>
      <div class="container">
        <div class="block-100">
          <button-gradient @click="applyFilters" class="find-button">НАЙТИ</button-gradient>
        </div>
      </div>
    </div>
    <LoadingCircle v-else></LoadingCircle>

    <div class="container">
      <div class="block-100">
        <div class="map-box">
          <l-map v-if="trackers" :zoom="zoom" :center="center" style="height: 600px;"
                 :maxZoom="18" :maxNativeZoom="18" :options="mapOptions">
            <l-tile-layer :url="url"/>
            <l-marker v-for="tracker in trackers" :key="tracker.id"
                      :lat-lng="preformPosition(tracker.positions[0].latitude, tracker.positions[0].longitude)">
              <l-tooltip v-if="tracker.person" :options="{ permanent: true, interactive: true }">
                {{ tracker.person.surname }} {{ tracker.person.name }} {{ tracker.person.patronymic }} <br>
              </l-tooltip>
              <l-tooltip v-if="tracker.car" :options="{ permanent: true, interactive: true }">
                {{ tracker.car.mark }} {{ tracker.car.model }} {{ tracker.car.reg_number }}<br>
              </l-tooltip>
            </l-marker>
            <l-polyline
                v-for="(polyline,index) in this.geos"
                v-bind:key="index"
                :lat-lngs="polyline.latlngs"
                :color="'#' + Math.floor(Math.random()*16777215).toString(16)">
            </l-polyline>
          </l-map>
        </div>
      </div>
    </div>

    <ModalWindow :open="isOpenModalCars" @close="isOpenModalCars = !isOpenModalCars">
      <li v-for="car in carsList" :key="car.id">
        <input v-model="filters.carsSelected" :value="car.id" type="checkbox"/>
        {{ car.mark }}
        {{ car.model }}
        {{ car.reg_number }}
      </li>
    </ModalWindow>
    <ModalWindow :open="isOpenModalWorkers" @close="isOpenModalWorkers = !isOpenModalWorkers">
      <li v-for="worker in workersList" :key="worker.id">
        <input v-model="filters.workersSelected" :value="worker.id" type="checkbox"/>
        {{ worker.name }}
        {{ worker.surname }}
        {{ worker.patronymic }}
      </li>
    </ModalWindow>

  </div>
</template>

<script>
import {useGetAllCars} from "@/services/hooks/useGetAllCars";
import ModalWindow from "@/components/ui/ModalWindow";
import ButtonGradient from "@/components/ui/ButtonGradient";
import {useGetAllWorkers} from "@/services/hooks/useGetAllWorkers";
import moment from "moment";
import {useGetTrackersByFilter} from "@/services/hooks/useGetTrackersByFilter";
import {cities} from "@/services/data/cities";
import LoadingCircle from "@/components/ui/LoadingCircle";
import {latLng} from "leaflet";
import {LMap, LTileLayer, LMarker, LTooltip, LPolyline} from "@vue-leaflet/vue-leaflet";
import "leaflet/dist/leaflet.css";

export default {
  name: "MapView",
  components: {LoadingCircle, ButtonGradient, ModalWindow, LMap, LTileLayer, LMarker, LTooltip, LPolyline},
  data() {
    return {
      trackers: null,
      filters: {
        carsSelected: [],
        workersSelected: [],
        fromDate: moment().subtract(20, "days").format('YYYY-MM-DDTHH:mm:ss'),
        toDate: moment().format('YYYY-MM-DDTHH:mm:ss'),
        selectedCity: null,
      },
      isOpenModalCars: false,
      carsList: null,
      isOpenModalWorkers: false,
      workersList: null,
      cities: cities(),
      zoom: 8.5,
      center: latLng(56.8490735, 60.5628915),
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '',
      withTooltip: true,
      currentZoom: 12.5,
      currentCenter: null,
      showParagraph: false,
      mapOptions: {
        attributionControl: false,
      },
      showMap: true,
      polyline: null,
      geos: [],
    }
  },
  mounted() {
    useGetAllCars().then(c => {
      this.carsList = c
    });
    useGetAllWorkers().then(w => {
      this.workersList = w;
    });
  },
  methods: {
    applyFilters() {
      useGetTrackersByFilter(this.filters).then(t => {
        this.trackers = t;
        this.preformHistory(t);
      });
    },
    cars(id) {
      if (this.carsList) {
        let c = [...this.carsList].find(car => car.id === id)
        return c.mark + ' ' + c.model + ' ' + c.reg_number;
      } else
        return []
    },
    workers(id) {
      if (this.workersList) {
        let w = [...this.workersList].find(wrk => wrk.id === id);
        return w.surname + ' ' + w.name;
      } else
        return []
    },
    preformPosition(lat, lng) {
      return latLng(lat, lng);
    },
    preformHistory(trackers) {
      let polyLines = [];
      trackers.forEach(function (tracker) {
        let geos = {};
        let tracker_geo = [];
        tracker.positions.forEach(function (geo) {
          tracker_geo.push([geo.latitude, geo.longitude]);
        })
        geos.latlngs = tracker_geo;
        polyLines.push(geos);
      })
      this.geos = polyLines;
    },
  }
}
</script>

<style scoped>
.datetime-picker-form {
  text-align: center;
  margin-bottom: 8px;
}

.container {
  display: flex;
}

.block {
  width: 50%;
  padding: 10px;
}

.block-100 {
  width: 100%;
  padding: 10px;
}

.f-input {
  font-size: 18px;
  padding: 4px;
  margin-left: 5px;
  margin-right: 5px;
  border: 0;
}

.notification-badges li {
  display: inline-block;
  min-width: 50px;
  border: solid 1px #ccc;
  border-radius: 6px;
  margin: 5px;
  text-align: center;
  padding: 5px;
}

.selected {
  padding: 10px;
}

.dropdown-check-list {
  display: inline-block;
}

h2 {
  margin-top: 8px;
}

.dropdown-check-list .anchor {
  position: relative;
  cursor: pointer;
  display: inline-block;
  padding: 5px 50px 5px 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 18px;
}

.dropdown-check-list .anchor:after {
  position: absolute;
  content: "";
  border-left: 2px solid black;
  border-top: 2px solid black;
  padding: 5px;
  right: 10px;
  top: 20%;
  -ms-transform: rotate(-135deg);
  transform: rotate(-135deg);
}

.dropdown-check-list .anchor:active:after {
  right: 8px;
  top: 21%;
}

.dropdown-check-list ul.items {
  padding: 2px;
  margin: 0;
  box-shadow: 0 8px 23px 11px rgba(34, 60, 80, 0.28);
  border-top: none;
}

.dropdown-check-list ul.items li {
  list-style: none;
}

.dropdown-check-list.visible .anchor {
  color: #0094ff;
}

.dropdown-check-list.visible .items {
  display: block;
}
</style>