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
// hent alle data for en måned
// hent alle data for en vare


export default ruter
