import Vue from "vue";
import Vuex from "vuex";
import AxiosApi from "@/api/axiosApi";

Vue.use(Vuex);

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

const moduleCategories = {
  namespaced: true,

  state: {
    categoriesData: null,
    isCategoriesDataLoading: false,
    categoriesDataLoadingFail: "",
  },
  mutations: {
    updateCategoriesData(state, data) {
      state.categoriesData = data;
    },
    updateIsCategoriesDataLoading(state, data) {
      state.isCategoriesDataLoading = data;
    },
    updateCategoriesDataLoadingFail(state, data) {
      state.categoriesDataLoadingFail = data;
    },
  },
  actions: {
    async loadCategoriesData(context) {
      try {
        context.commit("updateIsCategoriesDataLoading", true);
        context.commit("updateCategoriesDataLoadingFail", "");
        const response = await AxiosApi.getCategories();
        context.commit("updateCategoriesData", response.data);
      } catch (error) {
        context.commit("updateCategoriesDataLoadingFail", error.message);
      } finally {
        context.commit("updateIsCategoriesDataLoading", false);
      }
    },
  },
};

const moduleColors = {
  namespaced: true,

  state: {
    colorsData: null,
    isColorsDataLoading: false,
    colorsDataLoadingFail: "",
  },
  mutations: {
    updateColorsData(state, data) {
      state.colorsData = data;
    },
    updateIsColorsDataLoading(state, data) {
      state.isColorsDataLoading = data;
    },
    updateColorsDataLoadingFail(state, data) {
      state.colorsDataLoadingFail = data;
    },
  },
  actions: {
    async loadColorsData(context) {
      try {
        context.commit("updateIsColorsDataLoading", true);
        context.commit("updateColorsDataLoadingFail", "");
        const response = await AxiosApi.getColors();
        context.commit("updateColorsData", response.data);
      } catch (error) {
        context.commit("updateColorsDataLoadingFail", error.message);
      } finally {
        context.commit("updateIsColorsDataLoading", false);
      }
    },
  },
};

const moduleMaterials = {
  namespaced: true,

  state: {
    materialsData: null,
    isMaterialsDataLoading: false,
    materialsDataLoadingFail: "",
  },
  mutations: {
    updateMaterialsData(state, data) {
      state.materialsData = data;
    },
    updateIsMaterialsDataLoading(state, data) {
      state.isMaterialsDataLoading = data;
    },
    updateMaterialsDataLoadingFail(state, data) {
      state.materialsDataLoadingFail = data;
    },
  },
  actions: {
    async loadMaterialsData(context) {
      try {
        context.commit("updateIsMaterialsDataLoading", true);
        context.commit("updateMaterialsDataLoadingFail", "");
        const response = await AxiosApi.getMaterials();
        context.commit("updateMaterialsData", response.data);
      } catch (error) {
        context.commit("updateMaterialsDataLoadingFail", error.message);
      } finally {
        context.commit("updateIsMaterialsDataLoading", false);
      }
    },
  },
};

const moduleSeasons = {
  namespaced: true,

  state: {
    seasonsData: null,
    isSeasonsDataLoading: false,
    seasonsDataLoadingFail: "",
  },
  mutations: {
    updateSeasonsData(state, data) {
      state.seasonsData = data;
    },
    updateIsSeasonsDataLoading(state, data) {
      state.isSeasonsDataLoading = data;
    },
    updateSeasonsDataLoadingFail(state, data) {
      state.seasonsDataLoadingFail = data;
    },
  },
  actions: {
    async loadSeasonsData(context) {
      try {
        context.commit("updateIsSeasonsDataLoading", true);
        context.commit("updateSeasonsDataLoadingFail", "");
        const response = await AxiosApi.getSeasons();
        context.commit("updateSeasonsData", response.data);
      } catch (error) {
        context.commit("updateSeasonsDataLoadingFail", error.message);
      } finally {
        context.commit("updateIsSeasonsDataLoading", false);
      }
    },
  },
};

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
    async loadProductData(context, payload) {
      try {
        context.commit("updateIsProductDataLoading", true);
        context.commit("updateProductDataLoadingFail", "");
        const response = await AxiosApi.getProduct(payload);
        context.commit("updateProductData", response.data);
      } catch (error) {
        context.commit("updateProductDataLoadingFail", error.message);
      } finally {
        context.commit("updateIsProductDataLoading", false);
      }
    },
  },
};

const store = new Vuex.Store({
  modules: {
    moduleProducts,
    moduleCategories,
    moduleColors,
    moduleMaterials,
    moduleSeasons,
    moduleDeliveries,
    moduleProduct,
  },
});

export default store;
