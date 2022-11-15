import AxiosApi from "@/api/axiosApi";

const moduleProducts = {
  namespaced: true,

  state: {
    productsData: null,
    isProductsDataLoading: false,
    productsDataLoadingFail: "",
  },
  mutations: {
    updateProductsData(state, data) {
      state.productsData = data;
    },
    updateIsProductsDataLoading(state, data) {
      state.isProductsDataLoading = data;
    },
    updateProductsDataLoadingFail(state, data) {
      state.productsDataLoadingFail = data;
    },
  },
  actions: {
    async loadProductsData(context, payload) {
      try {
        context.commit("updateIsProductsDataLoading", true);
        context.commit("updateProductsDataLoadingFail", "");
        const response = await AxiosApi.getProducts(payload);
        context.commit("updateProductsData", response.data);
      } catch (error) {
        context.commit("updateProductsDataLoadingFail", error.message);
      } finally {
        context.commit("updateIsProductsDataLoading", false);
      }
    },
  },
};

export default moduleProducts;
