import axios from "axios";

const instance = axios.create({
  // URL:
  baseURL: "http://localhost:5001/clone-c113d/us-central1/api",
});

export default instance;
