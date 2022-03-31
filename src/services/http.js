import axios from "axios";

const http = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

export default {
  async request(config) {
    try {
      const response = await http.request(config);
      return response.data;
    } catch (err) {
      console.log("request error. err: ", err.message);
      console.log("http service errored");
      throw err;
    }
  },

  get(config) {
    const getConf = Object.assign({}, config, { method: "get" });
    return this.request(getConf);
  },

  post(config) {
    const postConf = Object.assign({}, config, { method: "post" });
    return this.request(postConf);
  },

  put(config) {
    const putConf = Object.assign({}, config, { method: "put" });
    return this.request(putConf);
  },

  delete(config) {
    const deleteConf = Object.assign({}, config, { method: "delete" });
    return this.request(deleteConf);
  },
};
