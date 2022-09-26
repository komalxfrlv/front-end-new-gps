<template>
  <a href="#">
    <div>
        <slot></slot>
    </div>
  </a>
</template>

<script>
export default {
  name: "ButtonWhite",
}
</script>

<style scoped>
  a {
    color: #1A1A1A;
  }
  div {
    background: white;
    border: 1px solid #1A1A1A;
    border-radius: 4px;
    padding: 5px;
    text-align: center;
  }

</style>