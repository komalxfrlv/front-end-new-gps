<template>
  <a href="#">
    <div>
        <slot></slot>
    </div>
  </a>
</template>

<script>
export default {
  name: "ButtonGradient",
}
</script>

<style scoped>
  a {
    color: white;
  }
  div {
    background: linear-gradient(34deg, rgb(175, 65, 181) 0%, rgb(151, 69, 191) 25%, rgb(110, 70, 169) 50%, rgb(84, 69, 191) 75%, rgb(128, 53, 135) 100%, rgb(65, 81, 181) 100%);
    border-radius: 4px;
    padding: 10px;
    text-align: center;
    font-size: 22px;
    font-weight: 200;
    transition: 1.2s;
  }
  div:hover {
    background: linear-gradient(214deg, rgb(175, 65, 181) 0%, rgb(151, 69, 191) 25%, rgb(110, 70, 169) 50%, rgb(84, 69, 191) 75%, rgb(128, 53, 135) 100%, rgb(65, 81, 181) 100%);
  }

</style>