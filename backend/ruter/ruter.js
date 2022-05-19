import express from 'express'
import prisdataModell from '../datamodeller/prisdataModell.js'
import varelisteModell from '../datamodeller/varelisteModell.js'
import brukerModell from '../datamodeller/brukerModell.js'

const ruter = express.Router()

// home
ruter.get('/', (req, res) => {
    res.send('Home Page')
})
// returnerer all prishistorikk
ruter.get('/historikk', async function(req, res) {
    try {
        let prisdata = await prisdataModell.find()
        res.json(prisdata)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
 })
 // returnerer vareliste
ruter.get('/vareliste', async function(req, res) {
    try {
        let prisdata = await prisdataModell.find()
        res.json(utvinnVarer(prisdata))
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
// returnerer butikkliste
ruter.get('/butikkliste', async function (req, res) {
    try {
        let prisdata = await prisdataModell.findOne()
        res.json(prisdata.butikker)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
// Metode for å vise all prisdata for en vare
ruter.get('/vare/:navn', async function (req, res) {
    try {
        let vareNavn = req.params.navn
        let prisdata = await prisdataModell.find()
        let svar = []
        prisdata.forEach((element) => {
            try {
                let delSvar = {
                    dato: "",
                    priser: {}
                }
                delSvar.dato = element.dato
                let i = 0
                element.butikker.forEach((butikk) => {
                    delSvar.priser[butikk] = element.varer[req.params.navn].at(i)
                    i++
                })
                svar.push(delSvar)
            } catch (error) {
                // console.log(`Vare eksisterer ikke for dato: ${element.dato}`)
            }
        })
        res.json(svar)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
})
// henter handlelister for en epost/bruker
ruter.get('/handlelister/:epost', async function (req, res) {
    brukerModell.findOne({ epost: req.params.epost}, function (error, response) {
        if (error){
            console.log(error);
            res.status(500).json({ message: error.message })
        }
        else{
            res.json(response.handlelister)
        }
    });
})

// Hjelpemetode for å hente alle nåværende butikker fra prisdata
function utvinnButikker(prisdata) {
    let butikkArray = []
    prisdata.forEach((element) => {
        element.butikker.forEach((butikk) => {
            if (!butikkArray.includes(butikk)) butikkArray.push(butikk)
        })
    })
    return butikkArray
}
// Hjelpemetode for å hente alle nåværende varer ut fra prisdata
function utvinnVarer(prisdata) {
    let vareArray = []
    prisdata.forEach((element) => {
        Object.keys(element.varer).forEach((vare) => {
            if (!vareArray.includes(vare)) vareArray.push(vare)
        })
    })
    return vareArray
}

// TODO:
// spørringer basert på pris
// hent alle data innenfor spesifisert tid
// hent alle data for en vare
// hent alle data for en butikk



export default ruter
