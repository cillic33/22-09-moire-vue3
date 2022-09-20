<template>
  <div class="content__top">
    <div class="content__row">
      <h1 class="content__title">
        Каталог
      </h1>
      <span class="content__info">
          {{ productsCount }} товара
        </span>
    </div>
  </div>
</template>

<script>
export default {
  props: ['productsCount'],
};
</script>

<style scoped>

</style>
