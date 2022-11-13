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

const moduleBasket = {
  namespaced: true,

  state: {
    basketData: null,
    isBasketDataLoading: false,
    basketDataLoadingFail: "",

    isBasketAddingSuccess: false,
    basketAddingFail: "",

    isBasketDataChanging: false,
    isBasketChangeSuccess: false,
    basketChangeFail: "",

    isBasketDeleteSuccess: false,
  },
  mutations: {
    updateBasketData(state, data) {
      state.basketData = data;
    },
    updateIsBasketDataLoading(state, data) {
      state.isBasketDataLoading = data;
    },
    updateBasketDataLoadingFail(state, data) {
      state.basketDataLoadingFail = data;
    },
    updateIsBasketAddingSuccess(state, data) {
      state.isBasketAddingSuccess = data;
    },
    updateBasketAddingFail(state, data) {
      state.basketAddingFail = data;
    },
    updateIsBasketDataChanging(state, data) {
      state.isBasketDataChanging = data;
    },
    updateIsBasketChangeSuccess(state, data) {
      state.isBasketChangeSuccess = data;
    },
    updateBasketChangeFail(state, data) {
      state.basketChangeFail = data;
    },
    updateIsBasketDeleteSuccess(state, data) {
      state.isBasketDeleteSuccess = data;
    },
  },
  getters: {
    basketCount(state) {
      return state.basketData ? state.basketData.items.length : 0;
    },
    basketTotalPrice(state) {
      return state.basketData
        ? state.basketData.items.reduce((acc, item) => acc + item.price * item.quantity, 0)
        : 0;
    },
  },
  actions: {
    async loadBasketData(context) {
      try {
        context.commit("updateIsBasketDataLoading", true);
        context.commit("updateBasketDataLoadingFail", "");
        const userAccessKey = context.rootGetters["moduleUser/getUserAccessKey"];
        const response = await AxiosApi.getBasket(userAccessKey);
        context.commit("updateBasketData", response.data);
        if (userAccessKey === "") {
          context.commit("moduleUser/updateUserAccessKey", response.data.user.accessKey, {
            root: true,
          });
        }
      } catch (error) {
        context.commit("updateBasketDataLoadingFail", error.message);
      } finally {
        context.commit("updateIsBasketDataLoading", false);
      }
    },
    async addToBasket(context, body) {
      try {
        context.commit("updateIsBasketDataLoading", true);
        context.commit("updateIsBasketAddingSuccess", false);
        context.commit("updateBasketAddingFail", "");
        const userAccessKey = context.rootGetters["moduleUser/getUserAccessKey"];
        const response = await AxiosApi.postBasket(userAccessKey, body);
        context.commit("updateBasketData", response.data);
        if (userAccessKey === "") {
          context.commit("moduleUser/updateUserAccessKey", response.data.user.accessKey, {
            root: true,
          });
        }
        context.commit("updateIsBasketAddingSuccess", true);
      } catch (error) {
        context.commit("updateBasketAddingFail", error.message);
        context.commit("updateIsBasketAddingSuccess", false);
      } finally {
        context.commit("updateIsBasketDataLoading", false);
      }
    },
    async changeBasket(context, body) {
      try {
        context.commit("updateIsBasketDataChanging", true);
        context.commit("updateIsBasketChangeSuccess", false);
        context.commit("updateBasketChangeFail", "");
        const userAccessKey = context.rootGetters["moduleUser/getUserAccessKey"];
        const response = await AxiosApi.putBasket(userAccessKey, body);
        context.commit("updateBasketData", response.data);
        if (userAccessKey === "") {
          context.commit("moduleUser/updateUserAccessKey", response.data.user.accessKey, {
            root: true,
          });
        }
        context.commit("updateIsBasketChangeSuccess", true);
      } catch (error) {
        context.commit("updateBasketChangeFail", error.message);
        context.commit("updateIsBasketChangeSuccess", false);
      } finally {
        context.commit("updateIsBasketDataChanging", false);
      }
    },
    async deleteFromBasket(context, body) {
      try {
        context.commit("updateIsBasketDataChanging", true);
        context.commit("updateIsBasketDeleteSuccess", false);
        context.commit("updateBasketChangeFail", "");
        const userAccessKey = context.rootGetters["moduleUser/getUserAccessKey"];
        const response = await AxiosApi.deleteBasket(userAccessKey, body);
        context.commit("updateBasketData", response.data);
        if (userAccessKey === "") {
          context.commit("moduleUser/updateUserAccessKey", response.data.user.accessKey, {
            root: true,
          });
        }
        context.commit("updateIsBasketDeleteSuccess", true);
      } catch (error) {
        context.commit("updateBasketChangeFail", error.message);
        context.commit("updateIsBasketDeleteSuccess", false);
      } finally {
        context.commit("updateIsBasketDataChanging", false);
      }
    },
  },
};

const moduleUser = {
  namespaced: true,

  state: {
    userAccessKey: "",
  },
  mutations: {
    updateUserAccessKey(state, userAccessKey) {
      state.userAccessKey = userAccessKey;
      localStorage.setItem("userAccessKey", userAccessKey);
    },
  },
  getters: {
    getUserAccessKey(state) {
      return state.userAccessKey;
    },
  },
};

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

const store = new Vuex.Store({
  modules: {
    moduleProducts,
    moduleCategories,
    moduleColors,
    moduleMaterials,
    moduleSeasons,
    moduleDeliveries,
    modulePayments,
    moduleProduct,
    moduleBasket,
    moduleUser,
    moduleOrder,
  },
});

export default store;
