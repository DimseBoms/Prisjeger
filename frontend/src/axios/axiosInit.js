import axios from "axios";

export default axios.create({
  baseURL: "http://prisjeger-app.duckdns.org:6969/api/",
  headers: {
    "Content-type": "application/json"
  }
});