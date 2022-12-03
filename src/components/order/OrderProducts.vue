<template>
  <div class="cart__orders-wrap">
    <transition name="fade" mode="out-in">
      <div
        v-if="isLoading"
        key="isLoading"
        class="note__centered cart__orders-note"
      >
        <fulfilling-bouncing-circle-spinner
          :animation-duration="4000"
          :size="30"
          :color="'#e02d71'"
        />
        <br/>
        Данные о товарах загружаются...
      </div>

      <div
        v-else-if="loadingFail"
        key="loadingFail"
        class="note__error note__centered"
      >
        Произошла ошибка загрузки товаров:<br/>
        "{{ loadingFail }}"<br/><br/>
        <button type="button" class="custom-button" @click.prevent="">Попробуйте еще раз</button>
      </div>

      <ul v-else-if="products.length" key="cartOrdersData" class="cart__orders">
        <OrderProduct v-for="item in products" :key="item.id" :item="item"></OrderProduct>
      </ul>

      <div v-else class="cart__orders" key="cartOrdersDataEmpty">
        Список товаров пуст
      </div>
    </transition>
  </div>
</template>

<script>
import { FulfillingBouncingCircleSpinner } from "epic-spinners";
import OrderProduct from "@/components/order/OrderProduct.vue";

export default {
  props: {
    products: {
      type: Array,
      required: true,
    },
    isLoading: {
      type: Boolean,
      required: true,
    },
    loadingFail: {
      type: String,
      required: true,
    },
  },
  components: {
    FulfillingBouncingCircleSpinner,
    OrderProduct,
  },
};
</script>

<style scoped lang="stylus">
.cart
  &__orders
    border none
    margin 0 -30px

    &-wrap
      border-bottom 1px solid #dedede
      margin 0 0 25px

    &-note
      padding 0 0 20px
</style>
