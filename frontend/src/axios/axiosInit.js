import axios from "axios";
import dotenv from 'dotenv'

// Henter dotenv på server. Denne vil alltid vøre localhost dersom du kjører
// prosjektet lokalt da denne konfigurasjonsfilen kun eksisterer på server
dotenv.config()
const BASEURL = process.env.BASEURL || "http://localhost:6969/api/"

export default axios.create({
  baseURL: BASEURL,
  headers: {
    "Content-type": "application/json"
  }
});