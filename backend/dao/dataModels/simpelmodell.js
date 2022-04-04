import mongoose from 'mongoose'


const SimpelSchema = new mongoose.Schema({
    navn: {
        type: String
    }
})

export default mongoose.model('Prisdata', SimpelSchema)