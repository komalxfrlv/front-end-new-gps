<template>
  <transition name="fade">
    <div class="modal-window" v-show="open">
      <div class="modal-inner">
        <div class="modal-content">
          <slot></slot>
          <ButtonWhite @click="$emit('close')">Закрыть</ButtonWhite>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import ButtonWhite from "@/components/ui/ButtonWhite";
export default {
  name: "ModalWindow",
  components: {ButtonWhite},
  props: {
    open: {
      type: Boolean,
      required: true,
    }
  }
}
</script>

<style scoped>
*,
::before,
::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.modal-window {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  background: linear-gradient(34deg, rgba(175, 65, 181, 0.6) 0%, rgba(151, 69, 191, 0.6) 25%, rgba(110, 70, 169, 0.6) 50%, rgb(84, 69, 191, 0.6) 75%, rgba(128, 53, 135, 0.6) 100%, rgba(65, 81, 181, 0.6) 100%);
  z-index: 1488;
}
.modal-inner {
  width: max-content;
  margin: 6rem auto;
  background: white;
  padding: 20px;
  box-shadow: -4px 4px 14px 14px rgba(34, 60, 80, 0.2);
  border-radius: 10px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>