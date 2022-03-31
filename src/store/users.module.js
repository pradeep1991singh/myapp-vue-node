import auth from "../services/api/auth";

export default {
  state: () => ({
    user: {},
    alertMessage: "",
    alertType: "",
  }),

  mutations: {
    loadUser(state, user) {
      state.user = user;
      localStorage.setItem("accessToken", user.token);
    },
    userFailure(state, { message, type }) {
      state.alertMessage = message;
      state.alertType = type;
    },
  },

  actions: {
    register(context, creds) {
      auth
        .register(creds)
        .then((res) => {
          console.log(res);
          context.commit("loadUser", res);
          context.commit("userFailure", {
            message: "Register successfully",
            type: "error",
          });
        })
        .catch((error) => {
          context.commit("userFailure", {
            message: error.message,
            type: "error",
          });
        });
    },
    login(context, creds) {
      auth
        .login(creds)
        .then((res) => {
          console.log(res);
          context.commit("loadUser", res);
        })
        .catch((error) => {
          context.commit("userFailure", {
            message: error.message,
            type: "error",
          });
        });
    },
    logout(context) {
      auth
        .login()
        .then((res) => {
          console.log(res);
          context.commit("loadUser", {});
        })
        .catch((error) => {
          context.commit("userFailure", error.message);
        });
    },
  },
};
