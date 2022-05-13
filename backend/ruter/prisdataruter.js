import express from 'express'
import prisdataModell from '../datamodeller/prisdataModell.js'
import varelisteModell from '../datamodeller/varelisteModell.js'
const ruter = express.Router()

// home
ruter.get('/', (req, res) => {
    res.send('Home Page')
})
// returnerer all prishistorikk
ruter.get('/historikk', async function(req, res) {
    try {
        const prisdata = await prisdataModell.find()
        res.json(prisdata)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
 })
 // returnerer vareliste
ruter.get('/vareliste', async function(req, res) {
    try {
        const vareliste = await varelisteModell.findOne()
        res.json(vareliste.varer)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
// returnerer butikkliste
ruter.get('/butikkliste', async function (req, res) {
    try {
        const prisdata = await prisdataModell.findOne()
        res.json(prisdata.butikker)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
// TODO:
// spørringer basert på pris
// hent alle data innenfor spesifisert tid
// hent alle data for en vare
// hent alle data for en butikk



export default ruter
