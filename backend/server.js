/*
Initialisering og konfigurasjon av backend express server og ruter.
Forfattere: Tore Broberg, Dmitriy Safiullin
*/
import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import prisdataruter from './ruter/ruter.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'

// initialiserer express og henter nødvendige variabler fra .env
dotenv.config()
const port = process.env.PORT || 8000
const app = express()

// databasetilkobling
mongoose.pluralize(null); // må være der for å unngå mongoose idioti
mongoose.connect(process.env.MONGODB_CONN_URI)
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Koblet til database'))

// setter opp middleware og lovlige datatyper
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({
    extended: true
  }));
app.use(cors())
app.use(cors({credentials: true}));
/*
process.env.CORS_URL = "http://prisjeger-app.duckdns.org:3000" dersom programmet kjøres
på tjener og "http://localhost:3000" dersom programmet kjøres lokalt på egen maskin.
Dette gjøres for å unngå CORS error
*/
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", process.env.CORS_URL);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
})
app.use('/api', prisdataruter)

app.listen(port, () => console.log(`Backend server startet på port: ${port}`))
