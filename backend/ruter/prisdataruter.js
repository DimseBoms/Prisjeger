import express from 'express'
import prisdataModell from '../datamodeller/prisdataModell.js'
const ruter = express.Router()

// home
ruter.get('/', (req, res) => {
    res.send('Home Page')
})
// returnerer all prishistorikk
ruter.get('/findall', async function(req, res) {
    try {
        const prisdata = await prisdataModell.find()
        res.json(prisdata)
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
