<template>
  <div class="trackers">
    <h1>Трекеры</h1>
    <div class="add-button">
      <ButtonGradient @click="isOpenModal = true">
        Добавить Трекер
      </ButtonGradient>
    </div>
    <ModalWindow :open="isOpenModal" @close="isOpenModal = !isOpenModal">
      <AddTracker></AddTracker>
    </ModalWindow>
    <AllTrackersTable :trackersProps="trackers"></AllTrackersTable>
  </div>
</template>

<script>
import AllTrackersTable from "@/components/trackers/AllTrackersTable";
import ButtonGradient from "@/components/ui/ButtonGradient";
import ModalWindow from "@/components/ui/ModalWindow";
import {ref} from "vue";
import AddTracker from "@/components/trackers/AddTracker";
import {useGetAllTrackers} from "@/services/hooks/useGetAllTrackers";
export default {
  name: "TrackersView",
  components: {AddTracker, ModalWindow, ButtonGradient, AllTrackersTable},
  setup() {
    const isOpenModal = ref(false);
    const trackers = ref(null);
    return {
      isOpenModal, trackers
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
.add-button {
  width: 300px;
  float: right;
  margin-top: -48px;
}
</style>