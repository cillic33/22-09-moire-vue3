<template>
  <div class="content__top">

    <ul class="breadcrumbs" v-if="currentPageTitle !== 'Каталог'">
      <li class="breadcrumbs__item">
        <a class="breadcrumbs__link" href="index.html">
          Каталог
        </a>
      </li>
      <li class="breadcrumbs__item">
        <a class="breadcrumbs__link">
          {{ currentPageTitle }}
        </a>
      </li>
    </ul>

    <div class="content__row">
      <h1 class="content__title">
        {{ currentPageTitle }}
      </h1>
      <span class="content__info">
          {{ productsCount }} товара
        </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    productsCount: {
      default: '0',
    },
    currentPageTitle: {
      default: 'Каталог',
    },
  },
};
</script>

<style scoped>

</style>
