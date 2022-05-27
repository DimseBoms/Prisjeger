import axios from "axios";

// Laster "http://prisjeger-app.duckdns.org:6969/api/"" dersom programmet kjøres på tjener
// og "http://localhost:6969/api/" dersom programmet kjøres lokalt på egen maskin
const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:6969/api/"

export default axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-type": "application/json"
  },
  withCredentials: true
});