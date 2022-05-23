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
  
app.use(cors())
app.use('/api', prisdataruter)

app.listen(port, () => console.log(`Backend server startet på port: ${port}`))
