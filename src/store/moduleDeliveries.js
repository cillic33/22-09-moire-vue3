import AxiosApi from "@/api/axiosApi";

const moduleDeliveries = {
  namespaced: true,

  state: {
    deliveriesData: null,
    isDeliveriesDataLoading: false,
    deliveriesDataLoadingFail: "",
  },
  mutations: {
    updateDeliveriesData(state, data) {
      state.deliveriesData = data;
    },
    updateIsDeliveriesDataLoading(state, data) {
      state.isDeliveriesDataLoading = data;
    },
    updateDeliveriesDataLoadingFail(state, data) {
      state.deliveriesDataLoadingFail = data;
    },
  },
  actions: {
    async loadDeliveriesData(context) {
      try {
        context.commit("updateIsDeliveriesDataLoading", true);
        context.commit("updateDeliveriesDataLoadingFail", "");
        const response = await AxiosApi.getDeliveries();
        context.commit("updateDeliveriesData", response.data);
      } catch (error) {
        context.commit("updateDeliveriesDataLoadingFail", error.message);
      } finally {
        context.commit("updateIsDeliveriesDataLoading", false);
      }
    },
  },
};

export default moduleDeliveries;
