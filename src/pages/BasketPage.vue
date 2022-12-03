<template>
  <main class="content container">
    <div class="content__top">
      <BaseBreadcrumbs
        :pages="[
          { title: 'Каталог', name: 'main' },
          { title: 'Корзина', name: '' },
        ]"
      ></BaseBreadcrumbs>

      <div class="content__row">
        <h1 class="content__title">Корзина</h1>
        <span class="content__info"> {{ basketCount }} товара </span>
      </div>
    </div>

    <div v-if="basketCount === 0 && isBasketDataLoading === false">
      Ваша корзина пуста<br><br>
      <router-link :to="{name: 'main'}" tag="button" class="custom-button">
        Перейти в каталог
      </router-link>
    </div>

    <transition name="fade" mode="out-in">

      <div
        v-if="isBasketDataLoading"
        key="isBasketDataLoading"
        class="note__centered"
      >
        <fulfilling-bouncing-circle-spinner
          :animation-duration="4000"
          :size="30"
          :color="'#e02d71'"
        />
        <br/>
        Корзина загружается...
      </div>

      <div
        v-else-if="basketDataLoadingFail"
        key="basketDataLoadingFail"
        class="note__error note__centered"
      >
        Произошла ошибка загрузки корзины:<br/>
        "{{ basketDataLoadingFail }}"<br/><br/>
        <button type="button" class="custom-button" @click.prevent="loadBasketData()">
          Попробуйте еще раз
        </button>
      </div>

      <section v-else class="cart" key="cartData">
        <form class="cart__form form" action="#" method="POST">
          <div class="cart__field">
            <BasketList :basket-items="basket.items"/>
          </div>

          <div class="cart__block">
            <p class="cart__desc">Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе</p>
            <p class="cart__price">Итого: <span>{{ basketTotalPrice | numberFormat }} ₽</span></p>

            <router-link :to="{name: 'order'}"
                         tag="button"
                         class="cart__button button button--primery"
                         :disabled="basketCount === 0 || isBasketDataChanging"
            >
              Оформить заказ
            </router-link>
          </div>
        </form>
      </section>

    </transition>

  </main>
</template>

<script>
import BaseBreadcrumbs from "@/components/base/BaseBreadcrumbs.vue";
import BasketList from "@/components/basket/BasketList.vue";
import { FulfillingBouncingCircleSpinner } from "epic-spinners";
import { mapState, mapGetters, mapActions } from "vuex";
import numberFormat from "@/helpers/numberFormat";

export default {
  components: {
    BaseBreadcrumbs,
    BasketList,
    FulfillingBouncingCircleSpinner,
  },
  filters: {
    numberFormat,
  },
  computed: {
    ...mapState({
      basketData: (state) => state.moduleBasket.basketData,
      isBasketDataLoading: (state) => state.moduleBasket.isBasketDataLoading,
      basketDataLoadingFail: (state) => state.moduleBasket.basketDataLoadingFail,
      isBasketDataChanging: (state) => state.moduleBasket.isBasketDataChanging,
    }),
    ...mapGetters({
      basketCount: "moduleBasket/basketCount",
      basketTotalPrice: "moduleBasket/basketTotalPrice",
    }),
    basket() {
      return this.basketData ? this.basketData : {};
    },
  },
  methods: {
    ...mapActions({ loadBasketData: "moduleBasket/loadBasketData" }),
  },
};
</script>

<style scoped></style>
