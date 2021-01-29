import axios from "axios";

const instance = axios.create({
  baseURL: "...", // API url should be here
});

export default instance;
