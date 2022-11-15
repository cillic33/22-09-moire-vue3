import AxiosApi from "@/api/axiosApi";

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

export default moduleSeasons;
