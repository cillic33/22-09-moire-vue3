<template>
  <main class="content container">
    <div class="content__top">
      <div class="content__row">
        <h1 class="content__title">Каталог</h1>
        <span class="content__info"> {{ productsCount }} товара </span>
      </div>
    </div>

    <div class="content__catalog">
      <ProductsFilter
        :min-price.sync="minPrice"
        :max-price.sync="maxPrice"
        :category-id.sync="categoryId"
        :page.sync="currentPage"
        :color-ids.sync="colorIds"
        :material-ids.sync="materialIds"
        :season-ids.sync="seasonIds"
      />

      <div>
        <transition name="fade" mode="out-in">
          <div
            v-if="isProductsDataLoading"
            key="isProductsDataLoading"
            class="note__centered"
          >
            <fulfilling-bouncing-circle-spinner
              :animation-duration="4000"
              :size="30"
              :color="'#e02d71'"
            />
            <br/>
            Товары загружаются...
          </div>

          <div
            v-else-if="productsDataLoadingFail"
            key="productsDataLoadingFail"
            class="note__error note__centered"
          >
            Произошла ошибка загрузки товаров:<br/>
            "{{ productsDataLoadingFail }}"<br/><br/>
            <button type="button" class="custom-button" @click.prevent="loadProductsData">
              Попробуйте еще раз
            </button>
          </div>

          <div v-else key="products">
            <div v-if="productsCount">
              <ProductsList :products="products"/>
              <BasePagination
                v-if="productsCount > productsPerPage"
                v-model="currentPage"
                :count="productsCount"
                :per-page="productsPerPage"
              />
            </div>
            <div v-else сlass="note__error">Ничего не найдено.<br>Измените параметры фильтра.</div>
          </div>
        </transition>
      </div>
    </div>
  </main>
</template>

<script>
import ProductsList from "@/components/products/ProductsList.vue";
import ProductsFilter from "@/components/products/ProductsFilter.vue";
import BasePagination from "@/components/base/BasePagination.vue";
import { FulfillingBouncingCircleSpinner } from "epic-spinners";
import { mapState, mapActions } from "vuex";

export default {
  components: {
    ProductsList,
    ProductsFilter,
    BasePagination,
    FulfillingBouncingCircleSpinner,
  },
  data() {
    return {
      currentPage: 1,
      productsPerPage: 12,

      minPrice: 0,
      maxPrice: 0,

      categoryId: 0,
      colorIds: [],
      materialIds: [],
      seasonIds: [],
    };
  },
  computed: {
    ...mapState({
      productsData:
        (state) => state.moduleProducts.productsData,
      isProductsDataLoading:
        (state) => state.moduleProducts.isProductsDataLoading,
      productsDataLoadingFail:
        (state) => state.moduleProducts.productsDataLoadingFail,
    }),
    products() {
      return this.productsData ? this.productsData.items : [];
    },
    productsCount() {
      return this.productsData ? this.productsData.pagination.total : 0;
    },
    watchableStates() {
      return `
        ${this.currentPage}
        ${this.minPrice}
        ${this.maxPrice}
        ${this.categoryId}
        ${this.colorIds}
        ${this.materialIds}
        ${this.seasonIds}
      `;
    },
  },
  methods: {
    ...mapActions(['moduleProducts/loadProductsData']),

    loadProductsData() {
      this.$store.dispatch('moduleProducts/loadProductsData', {
        limit: this.productsPerPage,
        page: this.currentPage,
        minPrice: this.minPrice,
        maxPrice: this.maxPrice,
        categoryId: this.categoryId,
        colorIds: this.colorIds,
        materialIds: this.materialIds,
        seasonIds: this.seasonIds,
      });
    },
  },
  watch: {
    watchableStates() {
      this.loadProductsData();
    },
    "$route.params.categoryId": {
      handler() {
        this.categoryId = this.$route.params.categoryId
          ? this.$route.params.categoryId
          : 0;
      },
      immediate: true,
    },
  },
  created() {
    this.loadProductsData();
  },
};
</script>

<style scoped lang="stylus"></style>
