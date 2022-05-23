import mongoose from 'mongoose'

const Brukere = new mongoose.Schema({

    epost: {type: String, required: true},
    passord: {type: String, required: true},
    handlelister: {type: Array}
}, 
{ collection: 'brukere' } )


export default mongoose.model('Brukere', Brukere)
