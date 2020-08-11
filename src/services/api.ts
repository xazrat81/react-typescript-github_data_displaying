import axios from "axios";

export default axios.create({
  baseURL: "https://api.github.com",
  responseType: "json",
  headers: { 'Accept': 'application/vnd.github.v3+json' }
});