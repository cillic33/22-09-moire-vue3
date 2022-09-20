<template>
  <section class="catalog">
    <ul class="catalog__list">
      <li v-for="product in products" :key="product.id" class="catalog__item">
        <ProductItem :product="product"/>
      </li>
    </ul>
  </section>
</template>

<script>
import ProductItem from '@/components/ProductItem.vue';

export default {
  props: ['products'],
  components: { ProductItem },
};
</script>

<style scoped lang="stylus">
</style>
