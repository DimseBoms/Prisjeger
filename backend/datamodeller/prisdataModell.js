import mongoose from 'mongoose'


const Prisdata = new mongoose.Schema({
    dato: {
        type: String
    },
    butikker: {
        type: Array
    },
    varer: {
        type: Object
    }
})

export default mongoose.model('Prisdata', Prisdata)
