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

export default moduleUser;
