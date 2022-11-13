<template>
  <main class="content container">
    <div class="content__top">
      <BaseBreadcrumbs
        :pages="[
          { title: 'Каталог', name: 'main' },
          { title: 'Корзина', name: 'cart' },
          { title: 'Оформление заказа', name: '' },
        ]"
      ></BaseBreadcrumbs>

      <div class="content__row">
        <h1 class="content__title">Оформление заказа</h1>
      </div>
    </div>

    <section class="cart">
      <form class="cart__form form" @submit.prevent="orderSubmit">
        <div class="cart__field">

          <OrderForm :data.sync="formData" :errors="orderDataLoadingErrors"/>

          <div class="cart__options-error">{{ orderDataLoadingErrors.deliveryTypeId }}</div>
          <div class="cart__options">
            <OrderDelivery :delivery-type-id.sync="deliveryTypeId"/>
            <br>
            <OrderPayment :payment-type-id.sync="paymentTypeId"
                          :delivery-type-id="deliveryTypeId"
            />
          </div>
        </div>

        <div class="cart__block">
          <OrderProducts :products="basketProducts"
                         :is-loading="isBasketDataLoading"
                         :loading-fail="basketDataLoadingFail"
          />

          <div class="cart__total">
            <p>Доставка: <b>бесплатно</b></p>
            <p>
              Итого: <b>{{ basketCount }}</b>
              товара на сумму <b>{{ basketTotalPrice | numberFormat }} ₽</b>
            </p>
          </div>

          <button class="cart__button button button--primery" type="submit">
            Оформить заказ
          </button>
        </div>

        <div class="cart__error form__error-block" v-if="orderDataLoadingFail">
          <h4>Заявка не отправлена!</h4>
          <p>
            {{ orderDataLoadingFail }}
          </p>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import BaseBreadcrumbs from "@/components/base/BaseBreadcrumbs.vue";
import OrderForm from "@/components/order/OrderForm.vue";
import OrderDelivery from "@/components/order/OrderDelivery.vue";
import OrderPayment from "@/components/order/OrderPayment.vue";
import OrderProducts from "@/components/order/OrderProducts.vue";
import { mapState, mapGetters, mapActions } from "vuex";
import numberFormat from "@/helpers/numberFormat";

export default {
  components: {
    BaseBreadcrumbs,
    OrderForm,
    OrderDelivery,
    OrderPayment,
    OrderProducts,
  },
  data() {
    return {
      formData: {},
      deliveryTypeId: 1,
      paymentTypeId: 1,
    };
  },
  filters: {
    numberFormat,
  },
  computed: {
    ...mapState({
      basketData: (state) => state.moduleBasket.basketData,
      isBasketDataLoading: (state) => state.moduleBasket.isBasketDataLoading,
      basketDataLoadingFail: (state) => state.moduleBasket.basketDataLoadingFail,

      orderData: (state) => state.moduleOrder.orderData,
      isOrderDataLoading: (state) => state.moduleOrder.isOrderDataLoading,
      orderDataLoadingFail: (state) => state.moduleOrder.orderDataLoadingFail,
      orderDataLoadingErrors: (state) => state.moduleOrder.orderDataLoadingErrors,
    }),
    ...mapGetters({
      basketCount: "moduleBasket/basketCount",
      basketTotalPrice: "moduleBasket/basketTotalPrice",
    }),
    basketProducts() {
      return this.basketData ? this.basketData.items : [];
    },
  },
  methods: {
    ...mapActions({
      sendOrder: "moduleOrder/sendOrder",
      loadBasketData: "moduleBasket/loadBasketData",
    }),
    orderSubmit() {
      const body = {
        name: this.formData.name ? this.formData.name : '',
        address: this.formData.address ? this.formData.address : '',
        phone: this.formData.phone ? this.formData.phone : '',
        email: this.formData.email ? this.formData.email : '',
        deliveryTypeId: this.deliveryTypeId,
        paymentTypeId: this.paymentTypeId,
        comment: this.formData.comment ? this.formData.comment : '',
      };
      this.sendOrder(body);
    },
  },
  watch: {
    orderData(value) {
      if (value) {
        this.formData = {};
        this.loadBasketData();
        this.$router.push({
          name: 'orderSuccess',
          params: { id: value.id },
        });
      }
    },
  },
};
</script>

<style scoped lang="stylus">
.cart__options-error
  font-size 11px
  line-height 14px
  color #e02d71
</style>
