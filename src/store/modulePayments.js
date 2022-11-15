import AxiosApi from "@/api/axiosApi";

const modulePayments = {
  namespaced: true,

  state: {
    paymentsData: null,
    isPaymentsDataLoading: false,
    paymentsDataLoadingFail: "",
  },
  mutations: {
    updatePaymentsData(state, data) {
      state.paymentsData = data;
    },
    updateIsPaymentsDataLoading(state, data) {
      state.isPaymentsDataLoading = data;
    },
    updatePaymentsDataLoadingFail(state, data) {
      state.paymentsDataLoadingFail = data;
    },
  },
  getters: {
    firstPaymentId(state) {
      return state.paymentsData ? state.paymentsData[0].id : undefined;
    },
  },
  actions: {
    async loadPaymentsData(context, deliveryTypeId) {
      try {
        context.commit("updateIsPaymentsDataLoading", true);
        context.commit("updatePaymentsDataLoadingFail", "");
        const response = await AxiosApi.getPayments(deliveryTypeId);
        context.commit("updatePaymentsData", response.data);
      } catch (error) {
        context.commit("updatePaymentsDataLoadingFail", error.message);
      } finally {
        context.commit("updateIsPaymentsDataLoading", false);
      }
    },
  },
};

export default modulePayments;
