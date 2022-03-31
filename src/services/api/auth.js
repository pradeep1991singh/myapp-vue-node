import http from "../http";

export default {
  register(user) {
    return http.post({ url: `/api/user/register`, data: user });
  },
  login(user) {
    return http.post({ url: `/api/user/login`, data: user });
  },
  logout() {
    return http.delete({ url: "/api/user/logout" });
  },
};
