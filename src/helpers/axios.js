import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5001/clone-f8cb2/us-central1/api",
}); // api endpoint

export default instance;
