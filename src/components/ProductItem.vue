<template>
  <div>
    <router-link :to="{name: 'product', params: {id: product.id}}" class="catalog__pic">
      <ProductGallery :color="currentColor" :title="product.title"/>
    </router-link>

    <h3 class="catalog__title">
      <router-link :to="{name: 'product', params: {id: product.id}}">
        {{ product.title }}
      </router-link>
    </h3>

    <span class="catalog__price">
      {{ product.price | numberFormat}} ₽
    </span>

    <ProductColors v-model="currentColor" :colors="product.colors" :product-id="product.id" />

    <div>
      <br>
      <div v-for="material in product.materials" :key="'productMaterial'+material.id">
        {{ material.title }}
      </div>
      <br>
      <div v-for="season in product.seasons" :key="'productSeason'+season.id">
        {{ season.title }}
      </div>
    </div>

  </div>
</template>

<script>
import ProductGallery from '@/components/ProductGallery.vue';
import ProductColors from '@/components/ProductColors.vue';
import numberFormat from '@/helpers/numberFormat';

export default {
  props: ['product'],
  components: { ProductGallery, ProductColors },
  filters: { numberFormat },
  data() {
    return {
      currentColor: this.product.colors[0],
    };
  },
};
</script>

<style scoped>

</style>
