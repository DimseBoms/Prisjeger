import mongoose from 'mongoose'

/* Dmitriy Safiullin */
const Vareliste = new mongoose.Schema({
    varer: {
        type: Array
    },},
    { collection: 'vareliste' })

export default mongoose.model('Vareliste', Vareliste)
