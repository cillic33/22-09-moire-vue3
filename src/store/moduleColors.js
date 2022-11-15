import AxiosApi from "@/api/axiosApi";

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

export default moduleColors;
