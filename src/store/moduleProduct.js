import AxiosApi from "@/api/axiosApi";

const moduleProduct = {
  namespaced: true,

  state: {
    productData: null,
    isProductDataLoading: false,
    productDataLoadingFail: "",
  },
  mutations: {
    updateProductData(state, data) {
      state.productData = data;
    },
    updateIsProductDataLoading(state, data) {
      state.isProductDataLoading = data;
    },
    updateProductDataLoadingFail(state, data) {
      state.productDataLoadingFail = data;
    },
  },
  actions: {
    async loadProductData(context, id) {
      try {
        context.commit("updateIsProductDataLoading", true);
        context.commit("updateProductDataLoadingFail", "");
        const response = await AxiosApi.getProduct(id);
        context.commit("updateProductData", response.data);
      } catch (error) {
        context.commit("updateProductDataLoadingFail", error.message);
      } finally {
        context.commit("updateIsProductDataLoading", false);
      }
    },
  },
};

export default moduleProduct;
