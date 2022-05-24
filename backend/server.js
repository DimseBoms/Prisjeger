import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import prisdataruter from './ruter/ruter.js'
import cors from 'cors'

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
app.use(express.json())
app.use(express.urlencoded({
    extended: true
  }));
// Henter dotenv for cors config. Denne konfigurasjonen eksisterer kun på server
// så den vil allitid være localhost dersom prosjektet kjøres lokalt på egen maskin.
const CORS_URL = process.env.BASEURL || "http://localhost"
// Setter cors config
app.use(cors())
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", CORS_URL);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})
app.use('/api', prisdataruter)

app.listen(port, () => console.log(`Backend server startet på port: ${port}`))
