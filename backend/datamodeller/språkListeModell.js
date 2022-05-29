import mongoose from 'mongoose'

/* Dmitriy Safiullin */
const Språkliste = new mongoose.Schema({
    språkdata: {
        type: Array
    }},
    { collection: 'språk' })

    
export default mongoose.model('Språkliste', Språkliste)
