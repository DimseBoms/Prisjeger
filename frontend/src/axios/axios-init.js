import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:6969/prisapi/",
  headers: {
    "Content-type": "application/json"
  }
});