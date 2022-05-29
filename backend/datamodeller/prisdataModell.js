import mongoose from 'mongoose'

/* Dmitriy Safiullin */
const Prisdata = new mongoose.Schema({
    dato: {
        type: String
    },
    butikker: {
        type: Array
    },
    varer: {
        type: Object
    }},
    { collection: 'prisdata' })

    
export default mongoose.model('Prisdata', Prisdata)
