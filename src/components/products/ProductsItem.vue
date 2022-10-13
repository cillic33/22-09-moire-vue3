<template>
  <div>
    <router-link :to="{ name: 'product', params: { id: product.id } }" class="catalog__pic">
      <ProductsGallery :color="currentColor" :title="product.title" />
    </router-link>

    <h3 class="catalog__title">
      <router-link :to="{ name: 'product', params: { id: product.id } }">
        {{ product.title }}
      </router-link>
    </h3>

    <span class="catalog__price"> {{ product.price | numberFormat }} ₽ </span>

    <ProductsColors :colors="product.colors" :color-id.sync="colorId" :product-id="product.id" />

    <div>
      <br />
      <div v-for="material in product.materials" :key="'productMaterial' + material.id">
        {{ material.title }}
      </div>
      <br />
      <div v-for="season in product.seasons" :key="'productSeason' + season.id">
        {{ season.title }}
      </div>
    </div>
  </div>
</template>

<script>
import ProductsGallery from "@/components/products/ProductsGallery.vue";
import ProductsColors from "@/components/products/ProductsColors.vue";
import numberFormat from "@/helpers/numberFormat";

export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  components: { ProductsGallery, ProductsColors },
  filters: { numberFormat },
  data() {
    return {
      colorId: 0,
    };
  },
  computed: {
    currentColor() {
      return this.colorId > 0
        ? this.product.colors.find((c) => c.id === this.colorId)
        : this.product.colors[0];
    },
  },
};
</script>

<style scoped></style>
