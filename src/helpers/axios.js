import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5001/clone-c113d/us-central1/api",
}); // api endpoint

export default instance;
