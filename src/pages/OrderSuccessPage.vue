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

      <h1 class="content__title">
        Заказ оформлен <span>№ {{ order.id }}</span>
        <span class="order__status" v-if="status">{{ status }}</span>
      </h1>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <p class="cart__message">
            Благодарим за&nbsp;выбор нашего магазина.
            На&nbsp;Вашу почту придет письмо с&nbsp;деталями заказа.
            Наши менеджеры свяжутся с&nbsp;Вами в&nbsp;течение часа для уточнения деталей доставки.
          </p>

          <ul class="dictionary">
            <li class="dictionary__item">
              <span class="dictionary__key">
                Получатель
              </span>
              <span class="dictionary__value">
                {{ order.name }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Адрес доставки
              </span>
              <span class="dictionary__value">
                {{ order.address }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Телефон
              </span>
              <span class="dictionary__value">
                {{ order.phone }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Email
              </span>
              <span class="dictionary__value">
                {{ order.email }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Способ оплаты
              </span>
              <span class="dictionary__value">
                {{ order.paymentType }}
              </span>
            </li>
          </ul>
        </div>

        <div class="cart__block">
          <OrderProducts :products="orderProducts"
                         :is-loading="isOrderDataLoading"
                         :loading-fail="orderDataLoadingFail"
          />
          <div class="cart__total">
            <p>{{ delivery }}: <b>{{ deliveryPrice | numberFormat }} ₽</b></p>
            <p>Итого:
              <b>{{ totalCount }}</b>
              товара на сумму
              <b>{{ totalPrice | numberFormat }} ₽</b>
            </p>
          </div>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import BaseBreadcrumbs from "@/components/base/BaseBreadcrumbs.vue";
import { mapState, mapActions } from "vuex";
import OrderProducts from "@/components/order/OrderProducts.vue";
import numberFormat from "@/helpers/numberFormat";

export default {
  components: {
    BaseBreadcrumbs,
    OrderProducts,
  },
  filters: {
    numberFormat,
  },
  computed: {
    ...mapState({
      orderData: (state) => state.moduleOrder.orderData,
      isOrderDataLoading: (state) => state.moduleOrder.isOrderDataLoading,
      orderDataLoadingFail: (state) => state.moduleOrder.orderDataLoadingFail,
    }),
    order() {
      return this.orderData ? this.orderData : {};
    },
    orderId() {
      return this.$route.params.id ? this.$route.params.id.toString() : '0';
    },
    orderProducts() {
      return this.orderData ? this.orderData.basket.items : [];
    },
    deliveryPrice() {
      return this.orderData ? this.orderData.deliveryType.price : 0;
    },
    delivery() {
      return this.orderData ? this.orderData.deliveryType.title : '';
    },
    totalCount() {
      return this.orderData ? this.orderData.basket.items.length : 0;
    },
    totalPrice() {
      return this.orderData ? this.orderData.totalPrice : 0;
    },
    status() {
      return this.orderData ? this.orderData.status.title : '';
    },
  },
  methods: {
    ...mapActions({
      loadOrderData: "moduleOrder/loadOrderData",
    }),
  },
  watch: {
    orderId: {
      handler() {
        if (this.orderData && this.orderData.id === this.orderId) {
          return;
        }
        this.loadOrderData(this.orderId);
      },
      immediate: true,
    },
  },
};
</script>

<style scoped lang="stylus">
.order__status
  background #ffdda0
  color #c96600
  font-size 10px
  padding 6px 8px 5px
  margin 0 0 0 14px
</style>
