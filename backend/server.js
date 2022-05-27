import express, { application } from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import prisdataruter from './ruter/ruter.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
// initialiserer express og henter nødvendige variabler fra .env
dotenv.config()
const port = process.env.PORT || 8000
const app = express()
app.use(cookieParser())

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

  // Setter cors config

  app.use(cors({credentials: true}));
  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept",
      "Access-Control-Allow-Methods", "GET,POST"
    );
    next();
  });
  

/*
    app.use( function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "http://localhost:3000");
     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
     res.header("Access-Control-Allow-Credentials", "true");
     res.header("Access-Control-Allow-Methods", "GET,POST");
      next();
    })
  */
  
app.use('/api', prisdataruter)

app.listen(port, () => console.log(`Backend server startet på port: ${port}`))
