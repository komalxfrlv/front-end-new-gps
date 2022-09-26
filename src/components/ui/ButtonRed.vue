<template>
  <a href="#">
    <div>
      <slot></slot>
    </div>
  </a>
</template>

<script>
export default {
  name: "ButtonRed"
}
</script>

<style scoped>
a {
  color: white;
}
div {
  background: linear-gradient(34deg, rgba(255,54,5,1) 0%, rgba(232,43,12,1) 25%, rgba(255,21,0,1) 50%, rgba(232,17,12,1) 75%, rgba(255,0,29,1) 100%);
  border-radius: 4px;
  padding: 10px;
  text-align: center;
  font-size: 22px;
  font-weight: 200;
  transition: 1.2s;
}
div:hover {
  background: linear-gradient(214deg, rgba(255,54,5,1) 0%, rgba(232,43,12,1) 25%, rgba(255,21,0,1) 50%, rgba(232,17,12,1) 75%, rgba(255,0,29,1) 100%);
}
</style>