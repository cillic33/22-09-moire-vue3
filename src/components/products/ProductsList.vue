<template>
  <section class="catalog">
    <ul class="catalog__list">
      <li v-for="product in products" :key="product.id" class="catalog__item">
        <ProductsItem :product="product" />
      </li>
    </ul>
  </section>
</template>

<script>
import ProductsItem from "@/components/products/ProductsItem.vue";

export default {
  props: {
    products: {
      type: Array,
      required: true,
    },
  },
  components: {
    ProductsItem,
  },
};
</script>

<style scoped lang="stylus">

</style>
