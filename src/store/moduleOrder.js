import AxiosApi from "@/api/axiosApi";

const moduleOrder = {
  namespaced: true,

  state: {
    orderData: null,
    isOrderDataLoading: false,
    orderDataLoadingFail: "",
    orderDataLoadingErrors: {},
  },
  mutations: {
    updateOrderData(state, data) {
      state.orderData = data;
    },
    updateIsOrderDataLoading(state, data) {
      state.isOrderDataLoading = data;
    },
    updateOrderDataLoadingFail(state, data) {
      state.orderDataLoadingFail = data;
    },
    updateOrderDataLoadingErrors(state, data) {
      state.orderDataLoadingErrors = data;
    },
  },
  actions: {
    async sendOrder(context, data) {
      try {
        context.commit("updateIsOrderDataLoading", true);
        context.commit("updateOrderDataLoadingFail", "");
        context.commit("updateOrderDataLoadingErrors", {});
        const userAccessKey = context.rootGetters["moduleUser/getUserAccessKey"];
        const response = await AxiosApi.postOrder(userAccessKey, data);
        context.commit("updateOrderData", response.data);
      } catch (error) {
        context.commit("updateOrderDataLoadingFail", error.response.data.error.message);
        context.commit("updateOrderDataLoadingErrors", error.response.data.error.request);
      } finally {
        context.commit("updateIsOrderDataLoading", false);
      }
    },
    async loadOrderData(context, data) {
      try {
        context.commit("updateIsOrderDataLoading", true);
        context.commit("updateOrderDataLoadingFail", "");
        const userAccessKey = context.rootGetters["moduleUser/getUserAccessKey"];
        const response = await AxiosApi.getOrder(userAccessKey, data);
        context.commit("updateOrderData", response.data);
      } catch (error) {
        context.commit("updateOrderDataLoadingFail", error.message);
      } finally {
        context.commit("updateIsOrderDataLoading", false);
      }
    },
  },
};

export default moduleOrder;
