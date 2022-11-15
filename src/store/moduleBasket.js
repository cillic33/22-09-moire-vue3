import AxiosApi from "@/api/axiosApi";

const moduleBasket = {
  namespaced: true,

  state: {
    basketData: null,
    isBasketDataLoading: false,
    basketDataLoadingFail: "",

    isBasketAddingSuccess: false,
    basketAddingFail: "",

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
        context.commit("updateBasketChangeFail", "");
        const userAccessKey = context.rootGetters["moduleUser/getUserAccessKey"];
        const response = await AxiosApi.putBasket(userAccessKey, body);
        context.commit("updateBasketData", response.data);
        if (userAccessKey === "") {
          context.commit("moduleUser/updateUserAccessKey", response.data.user.accessKey, {
            root: true,
          });
        }
      } catch (error) {
        context.commit("updateBasketChangeFail", error.message);
      } finally {
        context.commit("updateIsBasketDataLoading", false);
      }
    },
    async deleteFromBasket(context, body) {
      try {
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
        context.commit("updateIsBasketDataLoading", false);
      }
    },
  },
};

export default moduleBasket;
