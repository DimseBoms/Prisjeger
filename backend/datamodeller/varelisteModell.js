import mongoose from 'mongoose'


const Vareliste = new mongoose.Schema({
    varer: {
        type: Array
    },},
    { collection: 'vareliste' })

export default mongoose.model('Vareliste', Vareliste)
