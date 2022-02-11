import axios from "axios";

axios.defaults.baseURL = "http://localhost:1372/api";

const http = {
  get: axios.get,
  post: axios.post,
};

export default http;
