<template>
  <div>
    <loading :active="isBasketDataChanging"/>
    <ul class="cart__list">
      <li class="cart__item product" v-for="item in basketItems" :key="item.id">
        <BasketItem :item="item" />
      </li>
    </ul>
  </div>
</template>

<script>
import BasketItem from "@/components/basket/BasketItem.vue";
import { mapState } from "vuex";
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
  props: {
    basketItems: {
      type: Array,
      required: true,
    },
  },
  components: {
    BasketItem,
    Loading,
  },
  computed: {
    ...mapState({
      isBasketDataChanging: (state) => state.moduleBasket.isBasketDataChanging,
      isBasketChangeSuccess: (state) => state.moduleBasket.isBasketChangeSuccess,
      basketChangeFail: (state) => state.moduleBasket.basketChangeFail,
      isBasketDeleteSuccess: (state) => state.moduleBasket.isBasketDeleteSuccess,
    }),
  },
  watch: {
    isBasketChangeSuccess(value) {
      if (value) {
        this.$notify("Количество товара успешно изменено");
      }
    },
    isBasketDeleteSuccess(value) {
      if (value) {
        this.$notify("Товар удален из корзины");
      }
    },
    basketChangeFail(value) {
      if (value) {
        this.$notify({
          text: `Произошла ошибка: ${value}`,
          type: 'error',
        });
      }
    },
  },
};
</script>

<style scoped lang="stylus">
.product
  display block
</style>
