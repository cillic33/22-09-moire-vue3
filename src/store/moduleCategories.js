import AxiosApi from "@/api/axiosApi";

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

export default moduleCategories;
