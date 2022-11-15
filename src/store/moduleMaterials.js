import AxiosApi from "@/api/axiosApi";

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

export default moduleMaterials;
