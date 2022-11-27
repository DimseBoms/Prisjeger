/*
Datamodell som definerer hva slags format dataen som hentes ut
eller skrives til databasen skal formes etter
 */
//Tore Broberg 
import mongoose from 'mongoose'

const Brukere = new mongoose.Schema({

    epost: {type: String, required: true},
    passord: {type: String, required: true},
    handlelister: {type: Array},
    handlelistelogg: {type: Array}
}, 
{ collection: 'brukere' } )


export default mongoose.model('Brukere', Brukere)
