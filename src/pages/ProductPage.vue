<template>
  <main class="content container">

    <loading :active="isBasketDataLoading"/>

    <transition name="fade" mode="out-in">
      <div
        v-if="isProductDataLoading"
        key="isProductDataLoading"
        class="note__centered transition-fade-duration"
      >
        <fulfilling-bouncing-circle-spinner
          :animation-duration="4000"
          :size="30"
          :color="'#e02d71'"
        />
        <br/>
        Товар загружается...
      </div>

      <div
        v-else-if="productDataLoadingFail"
        key="productDataLoadingFail"
        class="note__error note__centered transition-fade-duration"
      >
        Произошла ошибка загрузки товара:<br/>
        "{{ productDataLoadingFail }}"<br/><br/>
        <button type="button" class="custom-button" @click.prevent="loadProductData">
          Попробуйте еще раз
        </button>
      </div>

      <div v-else key="productData">
        <router-link :to="{ name: 'main' }">Каталог</router-link>

        <div class="content__top">
          <BaseBreadcrumbs
            :pages="[
              { title: 'Каталог', name: 'main' },
              {
                title: product.category.title,
                name: 'main',
                params: { categoryId: product.category.id },
              },
              { title: product.title, name: '' },
            ]"
          ></BaseBreadcrumbs>
        </div>

        <section class="item">
          <ProductGallery
            :colors="product.colors"
            :color-id.sync="colorId"
            :title="product.title"
          />

          <div class="item__info">
            <span class="item__code">Артикул: {{ product.id }}</span>
            <h2 class="item__title">
              {{ product.title }}
            </h2>
            <div class="item__form">
              <form class="form" action="#" method="POST"
                    @submit.prevent="addToBasket(product.id, colorColorId, sizeId, amount)">
                <div class="item__row item__row--center">
                  <ProductCount v-model="amount"/>
                  <b class="item__price"> {{ price | numberFormat }} ₽ </b>
                </div>

                <div class="item__row">
                  <ProductsColors
                    :colors="product.colors"
                    :color-id.sync="colorId"
                    :product-id="product.id"
                  />

                  <fieldset class="form__block">
                    <legend class="form__legend">Размер</legend>
                    <label
                      class="form__label form__label--small form__label--select"
                      for="productCardCategory"
                    >
                      <select class="form__select"
                              name="category"
                              id="productCardCategory"
                              v-model="sizeId">
                        <option v-for="size in product.sizes" :key="size.id" :value="size.id">
                          {{ size.title }}
                        </option>
                      </select>
                    </label>
                  </fieldset>
                </div>

                <button class="item__button button button--primery"
                        type="submit"
                >
                  В корзину
                </button>
              </form>
            </div>
          </div>

          <div class="item__desc">
            <ul class="tabs">
              <li class="tabs__item" v-for="(tab, n) in tabs" :key="n">
                <button
                  :class="['tabs__link', { 'tabs__link--current': tab.name === currentTab }]"
                  @click="currentTab = tab.name"
                  :content="product.content"
                >
                  {{ tab.title }}
                </button>
              </li>
            </ul>

            <div class="item__content">
              <keep-alive>
                <component :is="currentTabComponent"></component>
              </keep-alive>
            </div>
          </div>
        </section>
      </div>
    </transition>
  </main>
</template>

<script>
import BaseBreadcrumbs from "@/components/base/BaseBreadcrumbs.vue";
import { FulfillingBouncingCircleSpinner } from "epic-spinners";
import numberFormat from "@/helpers/numberFormat";
import ProductTabInfo from "@/components/product/ProductTabInfo.vue";
import ProductTabDelivery from "@/components/product/ProductTabDelivery.vue";
import ProductGallery from "@/components/product/ProductGallery.vue";
import ProductsColors from "@/components/products/ProductsColors.vue";
import ProductCount from "@/components/product/ProductCount.vue";
import { mapState, mapActions } from "vuex";
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
  components: {
    BaseBreadcrumbs,
    FulfillingBouncingCircleSpinner,
    ProductTabInfo,
    ProductTabDelivery,
    ProductGallery,
    ProductsColors,
    ProductCount,
    Loading,
  },
  filters: {
    numberFormat,
  },
  data() {
    return {
      colorId: 0,
      colorColorId: 0,
      sizeId: 0,
      amount: 1,
      currentTab: "Info",
      tabs: [
        { name: "Info", title: "Информация о товаре" },
        { name: "Delivery", title: "Доставка и возврат" },
      ],
    };
  },
  computed: {
    ...mapState({
      productData: (state) => state.moduleProduct.productData,
      isProductDataLoading: (state) => state.moduleProduct.isProductDataLoading,
      productDataLoadingFail: (state) => state.moduleProduct.productDataLoadingFail,

      isBasketDataLoading: (state) => state.moduleBasket.isBasketDataLoading,
      basketDataLoadingFail: (state) => state.moduleBasket.basketDataLoadingFail,
      isBasketAddingSuccess: (state) => state.moduleBasket.isBasketAddingSuccess,
      basketAddingFail: (state) => state.moduleBasket.basketAddingFail,
    }),
    product() {
      return this.productData ? this.productData : {};
    },
    currentTabComponent() {
      return `ProductTab${this.currentTab}`;
    },
    price() {
      return this.product.price * this.amount;
    },
  },
  methods: {
    ...mapActions(["moduleProduct/loadProductData", "moduleBasket/addToBasket"]),
    loadProductData() {
      this.$store.dispatch("moduleProduct/loadProductData", this.$route.params.id);
    },
    addToBasket(productId, colorId, sizeId, quantity) {
      const body = {
        productId,
        colorId,
        sizeId,
        quantity,
      };
      this.$store.dispatch("moduleBasket/addToBasket", body);
    },
  },
  watch: {
    "$route.params.id": {
      handler() {
        this.loadProductData();
      },
      immediate: true,
    },
    product() {
      this.sizeId = this.product.sizes[0].id;
      this.colorId = this.product.colors[0].id;
    },
    colorId(value) {
      this.colorColorId = this.product.colors.find((item) => item.id === value).color.id;
    },
    isBasketAddingSuccess(value) {
      if (value === true) {
        this.$notify('<p>Товар добавлен в корзину</p><a href="#/cart">Перейти в корзину</a>');
      }
    },
    basketDataLoadingFail(value) {
      if (value) {
        this.$notify('Произошла ошибка загрузки данных корзины.');
      }
    },
    basketAddingFail(value) {
      if (value) {
        this.$notify('Произошла ошибка добавления товара в корзину.<br>Товар не добавлен.');
      }
    },
  },
};
</script>

<style scoped lang="stylus">
.colors
  &__value
    border 1px solid #c5c5c5

.tabs
  &__link
    border none
</style>
