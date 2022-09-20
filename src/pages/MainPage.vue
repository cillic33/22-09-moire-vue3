<template>
  <main class="content container">

    <BaseBreadcrumbs :products-count="productsCount"></BaseBreadcrumbs>

    <div class="content__catalog">
      <ProductsFilter :min-price.sync="minPrice"
                      :max-price.sync="maxPrice"
                      :category-id.sync="categoryId"
                      :page.sync="currentPage"
                      :color-ids.sync="colorIds"
                      :material-ids.sync="materialIds"
                      :season-ids.sync="seasonIds" />

      <div>
        <transition name="fade" mode="out-in">
          <div v-if="isProductsDataLoading"
               key="isProductsDataLoading"
               class="note__centered transition-fade-duration">
            <fulfilling-bouncing-circle-spinner
              :animation-duration="4000"
              :size="30"
              :color="'#e02d71'"/>
            <br>
            Товары загружаются...
          </div>

          <div v-else-if="productsDataLoadingFail"
               key="productsDataLoadingFail"
               class="note__error note__centered transition-fade-duration">
            Произошла ошибка загрузки товаров:<br>
            "{{ productsDataLoadingFail }}"<br><br>
            <button type="button" @click.prevent="loadProductsData">Попробуйте еще раз</button>
          </div>

          <div v-else key="products"
               class="transition-fade-duration">
            <div v-if="productsCount">
              <ProductsList :products="products"/>
              <BasePagination
                v-if="productsCount > productsPerPage"
                :products-count="productsCount"
                :products-per-page="productsPerPage"
                v-model="currentPage"/>
            </div>
            <div v-else сlass="note__error">Ничего не найдено</div>
          </div>
        </transition>

      </div>

    </div>
  </main>
</template>

<script>
import ProductsList from '@/components/ProductsList.vue';
import ProductsFilter from '@/components/ProductsFilter.vue';
import BasePagination from '@/components/BasePagination.vue';
import BaseBreadcrumbs from '@/components/BaseBreadcrumbs.vue';
import axios from 'axios';
import { FulfillingBouncingCircleSpinner } from 'epic-spinners';

require('vue2-animate/dist/vue2-animate.min.css');

export default {
  components: {
    ProductsList,
    ProductsFilter,
    BasePagination,
    FulfillingBouncingCircleSpinner,
    BaseBreadcrumbs,
  },
  data() {
    return {
      productsData: {},
      isProductsDataLoading: false,
      productsDataLoadingFail: '',

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
    products() {
      return this.productsData ? this.productsData.items : [];
    },
    productsCount() {
      return this.productsData.pagination ? this.productsData.pagination.total : 0;
    },
  },
  methods: {
    async loadProductsData() {
      try {
        this.isProductsDataLoading = true;
        this.productsDataLoadingFail = '';
        const response = await axios({
          method: 'get',
          url: 'https://vue-moire.skillbox.cc/api/products',
          params: {
            limit: this.productsPerPage,
            page: this.currentPage,
            minPrice: this.minPrice,
            maxPrice: this.maxPrice,
            categoryId: this.categoryId,
            colorIds: this.colorIds,
            materialIds: this.materialIds,
            seasonIds: this.seasonIds,
          },
          timeout: 2000,
        });
        this.productsData = response.data;
      } catch (error) {
        this.productsDataLoadingFail = error.message;
      } finally {
        this.isProductsDataLoading = false;
      }
    },
  },
  watch: {
    currentPage() {
      this.loadProductsData();
    },
    minPrice() {
      this.loadProductsData();
    },
    maxPrice() {
      this.loadProductsData();
    },
    categoryId() {
      this.loadProductsData();
    },
    colorIds() {
      this.loadProductsData();
    },
    materialIds() {
      this.loadProductsData();
    },
    seasonIds() {
      this.loadProductsData();
    },
  },
  created() {
    this.loadProductsData();
  },
};
</script>

<style scoped lang="stylus">
</style>
