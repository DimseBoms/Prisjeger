/*
Datamodell som definerer hva slags format dataen som hentes ut
eller skrives til databasen skal formes etter
 */
import mongoose from 'mongoose'

/* Dmitriy Safiullin */
const Vareliste = new mongoose.Schema({
    varer: {
        type: Array
    },},
    { collection: 'vareliste' })

export default mongoose.model('Vareliste', Vareliste)
