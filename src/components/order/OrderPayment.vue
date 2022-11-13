<template>

  <transition name="fade" mode="out-in">
    <div v-if="isPaymentsDataLoading"
         key="isPaymentsDataLoading"
         class="note__centered transition-fade-duration"
    >
      <fulfilling-bouncing-circle-spinner
        :animation-duration="4000"
        :size="30"
        :color="'#e02d71'"
      />
      <br/>
      Данные по оплате загружаются...
    </div>

    <div v-else-if="paymentsDataLoadingFail"
         key="paymentsDataLoadingFail"
         class="note__error note__centered transition-fade-duration"
    >
      Произошла ошибка загрузки оплаты<br>
      "{{ paymentsDataLoadingFail }}"<br/><br/>
      <button type="button" class="custom-button" @click.prevent="loadPaymentsData(deliveryTypeId)">
        Попробуйте еще раз
      </button>
    </div>

    <div
      v-else
      key="paymentsData"
      class="payments__block"
    >
      <h3 class="cart__title">Оплата</h3>
      <ul class="cart__options options">
        <li class="options__item" v-for="(payment, n) in payments" :key="payment.id">
          <label class="options__label">
            <input class="options__radio sr-only"
                   type="radio"
                   name="pay"
                   :checked="n === 0"
                   :value="payment.id"
                   v-model="computedPaymentTypeId"
            >
            <span class="options__value">
            {{ payment.title }}
          </span>
          </label>
        </li>
      </ul>
    </div>

  </transition>

</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import { FulfillingBouncingCircleSpinner } from "epic-spinners";

export default {
  props: {
    paymentTypeId: {
      type: Number,
      required: true,
    },
    deliveryTypeId: {
      type: Number,
      required: true,
    },
  },
  components: {
    FulfillingBouncingCircleSpinner,
  },
  computed: {
    ...mapState({
      paymentsData: (state) => state.modulePayments.paymentsData,
      isPaymentsDataLoading: (state) => state.modulePayments.isPaymentsDataLoading,
      paymentsDataLoadingFail: (state) => state.modulePayments.paymentsDataLoadingFail,
    }),
    ...mapGetters({
      firstPaymentId: "modulePayments/firstPaymentId",
    }),
    payments() {
      return this.paymentsData ? this.paymentsData : [];
    },
    computedPaymentTypeId: {
      get() {
        return this.paymentTypeId;
      },
      set(value) {
        this.$emit("update:paymentTypeId", value);
      },
    },
  },
  methods: {
    ...mapActions({
      loadPaymentsData: "modulePayments/loadPaymentsData",
    }),
  },
  watch: {
    deliveryTypeId: {
      handler() {
        this.loadPaymentsData(this.deliveryTypeId);
      },
      immediate: true,
    },
    firstPaymentId(value) {
      this.computedPaymentTypeId = value;
    },
  },
};
</script>

<style scoped lang="stylus">
</style>
