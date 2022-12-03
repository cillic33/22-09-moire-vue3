<template>
  <div>
    <div v-if="isDeliveriesDataLoading">загрузка</div>

    <div v-else-if="deliveriesDataLoadingFail">ошибка {{ deliveriesDataLoadingFail }}</div>

    <div v-else>
      <div v-for="delivery in deliveries" :key="delivery.id">
        {{ delivery.title }} - {{ delivery.price | numberFormat }} ₽
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import numberFormat from "@/helpers/numberFormat";

export default {
  name: "ProductTabDelivery",
  filters: {
    numberFormat,
  },
  computed: {
    ...mapState({
      deliveriesData:
        (state) => state.moduleDeliveries.deliveriesData,
      isDeliveriesDataLoading:
        (state) => state.moduleDeliveries.isDeliveriesDataLoading,
      deliveriesDataLoadingFail:
        (state) => state.moduleDeliveries.deliveriesDataLoadingFail,
    }),
    deliveries() {
      return this.deliveriesData ? this.deliveriesData : [];
    },
  },
  methods: {
    ...mapActions({
      loadDeliveriesData: "moduleDeliveries/loadDeliveriesData",
    }),
  },
  created() {
    this.loadDeliveriesData();
  },
};
</script>

<style scoped></style>
