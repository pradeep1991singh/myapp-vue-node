import http from "../http";

export default {
  getAll() {
    return http.get({ url: "/api/transactions" });
  },
};
