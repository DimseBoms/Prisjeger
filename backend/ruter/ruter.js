/*
Konfigurasjon av backend ruter. Disse funksjonene innehar logikken som skal behandle forespørsler
og konstruere svar samt definere hvilke URL adresser disse skal være tilgjengelige på. Denne filen
kan anses å være kjernen av backend API'et
Forfattere: Tore Broberg, Dmitriy Safiullin
*/
import express from 'express'
import prisdataModell from '../datamodeller/prisdataModell.js'
import varelisteModell from '../datamodeller/varelisteModell.js'
import brukerModell from '../datamodeller/brukerModell.js'
import logger from '../Logger.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import sanitize from 'mongo-sanitize'
const ruter = express.Router()
import fs from 'fs'

// home
/* Dmitriy Safiullin */
ruter.get('/', (req, res) => {
    console.log("Ny forespørsel etter index")
    res.send('Prisjeger PrisAPI')
})
// returnerer all prishistorikk
/* Dmitriy Safiullin */
ruter.get('/historikk', async function(req, res) {
    console.log("Ny forespørsel etter all prishistorikk")
    let brukernavn = req.cookies.bruker
    logger.info('bruker: ' + brukernavn + ' ' + 'henter all prishistorikk')
    try {
        let prisdata = await prisdataModell.find().sort(
            {dato: -1}
        )        
        res.json(prisdata)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    
    }
 })
 // henter oppdaterte priser
 /* Dmitriy Safiullin */
 ruter.get('/siste', async function(req, res) {
    console.log("Ny forespørsel etter siste oppdaterte priser")
    let brukernavn = req.cookies.bruker
    logger.info('bruker: ' + brukernavn + ' ' + 'henter siste priser')
    try {
        let prisdata = await prisdataModell.find().sort( // henter data fra databasen
            {dato: -1}
        )
        let varer = utvinnVarer(prisdata)
        let mangler = []
        let svar = { //lager variabel som skal sendes tilbake som respons
            butikker: [],
            dato: new Date().toISOString().slice(0, 10), // dagens dato i ISO format
            varer: {}
        }  // itererer prisdata-objekt for å hente ut mest oppdaterte pris for hver eneste vare
        prisdata.forEach((element) => {
            for (let vare in element.varer) {
                if (!(vare in svar.varer)) {
                    svar.varer[vare] = element.varer[vare]
                }
            }
        })
        res.json(svar)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
})
 // returnerer vareliste
 /* Dmitriy Safiullin */
ruter.get('/vareliste', async function(req, res) {
    let brukernavn = req.cookies.bruker
    logger.info('bruker: ' + brukernavn + ' ' + 'henter vareliste')
    console.log("Ny forespørsel etter vareliste")
    try {
        let prisdata = await prisdataModell.find().sort(
            {dato: -1}
        )
        res.json(utvinnVarer(prisdata))
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
})
// returnerer butikkliste
/* Dmitriy Safiullin */
ruter.get('/butikkliste', async function (req, res) {
    console.log("Ny forespørsel etter butikkliste")
    let brukernavn = req.cookies.bruker
    logger.info('bruker: ' + brukernavn + ' ' + 'henter butikkliste')
    try {
        let prisdata = await prisdataModell.find().sort(
            {dato: -1}
        )
        res.json(utvinnButikker(prisdata))
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
})
// Metode for å vise all prisdata for en vare
/* Dmitriy Safiullin */
ruter.get('/vare/:navn', async function (req, res) {
    console.log(`Ny forespørsel etter vare: ${req.params.navn}`)
    let brukernavn = req.cookies.bruker
    let vnavn = req.params.navn
    let pNavn = sanitize(req.params.navn)
    logger.info('bruker: ' + brukernavn + ' ' + 'henter prisdata for :' + '' + vnavn)
    try {
        let prisdata = await prisdataModell.find().sort(
            {dato: -1}
        )
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
                    delSvar.priser[butikk] = element.varer[pNavn].at(i)
                    i++
                })
                svar.push(delSvar)
            } catch (error) {
                // Feilen som oppstår her er ikke fatal
                // console.log(`Vare eksisterer ikke for dato: ${element.dato}`)
            }
        })
        res.json(svar)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
})
// Metode for å vise all prisdata for en vare fra tidspunkt
/* Dmitriy Safiullin */
ruter.get('/vare/:navn/:fradato', async function (req, res) {
    console.log(`Ny forespørsel etter vare: ${req.params.navn} fra ${req.params.fradato}`)
    let brukernavn = req.cookies.bruker
    let pNavn = sanitize(req.params.navn)
    let fdato = sanitize(req.params.fradato)
    logger.info('bruker: ' + brukernavn + ' ' + 'all prisdata for :' + '' + pNavn +''+ 'fra:' +''+fdato )
    try {
        let prisdata = await prisdataModell.find({
            dato: {$gte: fdato}
        }).sort(
            {dato: -1}
        )
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
                    delSvar.priser[butikk] = element.varer[pNavn].at(i)
                    i++
                })
                svar.push(delSvar)
            } catch (error) {
                // Feilen som oppstår her er ikke fatal
                // console.log(`Vare eksisterer ikke for dato: ${element.dato}`)
            }
        })
        res.json(svar)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
})
// Metode for å vise all prisdata for en vare fra tidspunkt til et tidspunkt
/* Dmitriy Safiullin */
ruter.get('/vare/:navn/:fradato/:tildato', async function (req, res) {
    console.log(`Ny forespørsel etter vare: ${req.params.navn} fra ${req.params.fradato} til ${req.params.tildato}`)
    let brukernavn = req.cookies.bruker
    let fdato = sanitize(req.params.fradato)
    let tdato = sanitize(req.params.tildato)
    let vnavn = sanitize(req.params.navn)
    logger.info('bruker: ' + brukernavn + ' ' + 'henter prisdata for' + ' ' + vnavn + '' + 'mellom' + '' + fdato + '' + 'og' + ' ' + tdato)
        try {
        let prisdata = await prisdataModell.find({
            dato: {$gte: fdato, $lte: tdato}
        }).sort(
            {dato: -1}
        )
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
                    delSvar.priser[butikk] = element.varer[vnavn].at(i)
                    i++
                })
                svar.push(delSvar)
            } catch (error) {
                // Feilen som oppstår her er ikke fatal
                // console.log(`Vare eksisterer ikke for dato: ${element.dato}`)
            }
        })
        res.json(svar)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
})
// Metode for å vise all prisdata for en butikk
/* Dmitriy Safiullin */
ruter.get('/butikk/:butikk', async function (req, res) {
    console.log(`Ny forespørsel etter butikk: ${req.params.butikk}`)
    let brukernavn = req.cookies.bruker
    let pbutikk = sanitize(req.params.butikk)
    logger.info('bruker: ' + brukernavn + ' ' + 'henter prisdata for :' + '' + pbutikk )
    try {
        let prisdata = await prisdataModell.find().sort(
            {dato: -1}
        )
        let svar = []
        prisdata.forEach((element) => {
            try {
                let delSvar = {
                    dato: "",
                    varer: {}
                }
                delSvar.dato = element.dato
                let butikkIndeks = finnButikkIndeks(element, pbutikk)

                for (let vare in element.varer) {
                    let i = 0
                    element.varer[vare].forEach((pris) => {
                        if (i == butikkIndeks) {
                            delSvar.varer[vare] = pris
                        }
                        i++
                    })
                }
                svar.push(delSvar)
            } catch (error) {
                console.log(error)
            }
        })
        res.json(svar)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
})
// Metode for å vise all prisdata for en butikk fra en dato
/* Dmitriy Safiullin */
ruter.get('/butikk/:butikk/:fradato', async function (req, res) {
    console.log(`Ny forespørsel etter butikk: ${req.params.butikk} fra ${req.params.fradato}`)
    let brukernavn = req.cookies.bruker
    let pbutikk = sanitize(req.params.butikk)
    let fdato = sanitize(req.params.fradato)
    logger.info('bruker: ' + brukernavn + ' ' + 'henter prisdata for :' + '' + pbutikk + ' ' + 'fra følgende dato :' + '' + fdato)    
    try {
        let prisdata = await prisdataModell.find({
            dato: {$gte: fdato}
        }).sort(
            {dato: -1}
        )
        let svar = []
        prisdata.forEach((element) => {
            try {
                let delSvar = {
                    dato: "",
                    varer: {}
                }
                delSvar.dato = element.dato
                let butikkIndeks = finnButikkIndeks(element, pbutikk)

                for (let vare in element.varer) {
                    let i = 0
                    element.varer[vare].forEach((pris) => {
                        if (i == butikkIndeks) {
                            delSvar.varer[vare] = pris
                        }
                        i++
                    })
                }
                svar.push(delSvar)
            } catch (error) {
                console.log(error)
            }
        })
        res.json(svar)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
})
// Metode for å vise all prisdata for en butikk fra en dato til en dato
/* Dmitriy Safiullin */
ruter.get('/butikk/:butikk/:fradato/:tildato', async function (req, res) {
    console.log(`Ny forespørsel etter butikk: ${req.params.butikk} fra ${req.params.fradato} til ${req.params.tildato}`)
    let brukernavn = req.cookies.bruker
    let pbutikk = sanitize(req.params.butikk)
    let fdato = sanitize(req.params.fradato)
    let tdato = sanitize(req.params.tildato)

    logger.info('bruker: ' + brukernavn + ' ' + 'henter all prisdata for :' + ' ' + pbutikk + '' + ' fra :' + fdato + '' + 'til :' + '' + tdato)
    try {
        let prisdata = await prisdataModell.find({
            dato: {$gte: fdato, $lte: tdato}
        }).sort(
            {dato: -1}
        )
        let svar = []
        prisdata.forEach((element) => {
            try {
                let delSvar = {
                    dato: "",
                    varer: {}
                }
                delSvar.dato = element.dato
                let butikkIndeks = finnButikkIndeks(element, pbutikk)

                for (let vare in element.varer) {
                    let i = 0
                    element.varer[vare].forEach((pris) => {
                        if (i == butikkIndeks) {
                            delSvar.varer[vare] = pris
                        }
                        i++
                    })
                }
                svar.push(delSvar)
            } catch (error) {
                console.log(error)
            }
        })
        res.json(svar)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
})
// henter liste over handlelister
/* Dmitriy Safiullin */
ruter.get('/handlelister/:epost', async function (req, res) {
    console.log(`Ny forespørsel etter handlelister for epost: ${req.params.epost}`)
    let brukernavn = req.cookies.bruker
    logger.info('bruker: ' + brukernavn + ' ' + 'henter handlelistene sine ')
    brukerModell.findOne({ epost: req.params.epost}, function (error, response) {
        if (error){
            console.log(error);
            res.status(500).json({ message: error.message })
        }
        else{
            try {
                //console.log("Handlelister: \n" + response)
                let dbSvar = response.handlelister
                let utSvar = []
                dbSvar.forEach(handleliste => {
                    utSvar.push(Object.keys(handleliste)[0])
                    // console.log(utSvar)
                })
                let responsArr = []
                utSvar.forEach(element => {
                    if (element !== undefined) {
                      responsArr.push(element);
                    }
                  });
                res.json(responsArr.reverse())
            } catch (error) {
                // console.log(error)
                res.json( {melding: "Ingen handlelister funnet"} )
            }
        }
    }).sort(
        {dato: -1}
    );
})
// henter spesifikk handleliste ut fra nøkkel for en bruker
/* Dmitriy Safiullin */
ruter.get('/handlelister/:epost/:tittel', async function (req, res) {
    console.log(`Ny forespørsel etter handleliste: ${req.params.tittel} for epost: ${req.params.epost}`)
    let brukernavn = req.cookies.bruker
    let pLsite = sanitize(req.params.tittel)
    let pNavn = sanitize(req.params.epost)
    logger.info('bruker: ' + brukernavn + ' ' + 'henter handleliste :' + pLsite)
    brukerModell.findOne({ epost: pNavn }, function (error, response) {
        if (error){
            console.log(error);
            res.status(500).json({ message: error.message })
        }
        else{
            let dbSvar = response.handlelister
            dbSvar = dbSvar.filter(value => JSON.stringify(value) !== '{}');
            let harSendt = false
            dbSvar.forEach(handleliste => {
                if (Object.keys(handleliste) == pLsite) {
                    res.json(handleliste[pLsite])
                    harSendt = true
                }
            })
            if (!harSendt) res.json({ message: "Ingen handlelister funnet"})
        }
    }).sort(
        {dato: -1}
    );
})

// Metode for å håndtere live data på server. Denne finner ut hvilke data som er utdatert
// hos klienten og returnerer informasjon om dette.
/* Dmitriy Safiullin */
ruter.get('/sjekkoppdatert/:tidspunkt/:epost/:session/:handleliste', async function (req, res) {
    console.log(`${req.params.epost} sjekker om de er oppdatert via session: ${req.params.session}`)
    let brukernavn = req.cookies.epost
    let session = req.params.session
    let pLsite = sanitize(req.params.handleliste)
    let pNavn = sanitize(req.params.epost)
    logger.info('bruker: ' + brukernavn + ' ' + 'ser etter oppdateringer :' + pLsite + " : " + session)
    brukerModell.findOne({ epost: pNavn }, function (error, response) {
        if (error){
            console.log(error);
            res.status(500).json({ message: error.message })
        }
        else{
            //TODO: Få denne metoden til å returnere et svar som inneholder informasjon om:
            /* prisdataen er utdatert på klient,
               handlelisten er utdatert på klient,
               tidspunktet som serveren har benyttet for å kalkulere om data er utdatert  */
            let dbSvar = response.handlelister
            dbSvar = dbSvar.filter(value => JSON.stringify(value) !== '{}');
            let harSendt = false
            dbSvar.forEach(handleliste => {
                if (Object.keys(handleliste) == pLsite) {
                    res.json(handleliste[pLsite])
                    harSendt = true
                }
            })
            if (!harSendt) res.json({ message: "Ingen handlelister funnet"})
        }
    }).sort(
        {dato: -1}
    );
})

// Hjelpemetode for å hente nåværende tidspunkt i "yyyy-MM-dd hh:mm:ss" format
function nåTid(dateObj) {
    let year = dateObj.getFullYear()
    let month = dateObj.getMonth()
    month = ('0' + month).slice(-2)
    // To make sure the month always has 2-character-format. For example, 1 => 01, 2 => 02
    let date = dateObj.getDate()
    date = ('0' + date).slice(-2)
    // To make sure the date always has 2-character-format
    let hour = dateObj.getHours()
    hour = ('0' + hour).slice(-2)
    // To make sure the hour always has 2-character-format
    let minute = dateObj.getMinutes()
    minute = ('0' + minute).slice(-2)
    // To make sure the minute always has 2-character-format
    let second = dateObj.getSeconds()
    second = ('0' + second).slice(-2)
    // To make sure the second always has 2-character-format
    return `${year}-${month}-${date} ${hour}:${minute}:${second}`
}

// Hjelpemetode for å legge til elementer i livedata logg på DB
function pushLogg(brukerModell, epost, session, handleliste, hendelsesbeskrivelse) {
    // lager indre logg objekt
    let nyLogg = {
        tid: [nåTid(new Date())],
        sessionId: [session],
        hendelse: [hendelsesbeskrivelse]
    } // pusher objekt til DB
    brukerModell.updateOne({
        epost: epost
    }, {$push: {
        [`handlelistelogg.${handleliste}`]: nyLogg
    }} ).then(svar => {
        console.log(svar)
    })
}

// Legger til ny tom handleliste
/* Dmitriy Safiullin */
ruter.post('/handlelister/:epost/:tittel/add/:session', async function (req, res) {
    console.log(`${req.params.epost} legger til handleliste: ${req.params.tittel}`)
    logger.info(`${req.params.epost} legger til handleliste: ${req.params.tittel}`)
    // første databasespørring for å finne ut om handlelisten eksisterer fra før
    let dbSvar
    brukerModell.findOne({ epost: sanitize(req.params.epost)}, function (error, response) {
        if (error) {
            console.log(error);
            res.status(500).json({ message: error.message })
        }
        else {
            try {
                dbSvar = response.handlelister
                // legger til liste
                let nyHandleliste = { [req.params.tittel]: {} }
                dbSvar.push(nyHandleliste)
                brukerModell.updateOne({
                    epost: req.params.epost
                }, {$set: {
                    handlelister: dbSvar
                }} ).then(svar => {
                    console.log(svar)
                })
                // legger til ny handlelistelogg i database
                pushLogg(
                    brukerModell,
                    response,
                    req.params.epost,
                    req.params.session,
                    req.params.tittel,
                    "Legger til ny tom handleliste"
                )
                // sender svar
                res.json()
            } catch (err ){ // feil i input parametere
                console.log(err)
                res.json( { statuskode: 0, melding: "API mottok uforventet respons fra databasen, trolig feil i inpur parameter" } )
            }
        }
    });
})

// Legger til vare i handleliste
/* Dmitriy Safiullin */
ruter.post('/handlelister/:epost/:tittel/add/:vare/:session', async function (req, res) {
    console.log(`${req.params.epost} legger til ${req.params.vare} i handleliste: ${req.params.tittel}`)
    logger.info(`${req.params.epost} legger til ${req.params.vare} i handleliste: ${req.params.tittel}`)
    // første databasespørring for å finne ut om handlelisten eksisterer fra før
   let pEpost = sanitize(req.params.epost)
    let dbSvar
    brukerModell.findOne({ epost: pEpost}, function (error, response) {
        if (error) {
            console.log(error);
            res.status(500).json({ message: error.message })
        }
        else {
            try {
                dbSvar = response.handlelister
                // hjelpemetode for å inserte liste
                res.json(leggTilVare(response, dbSvar, pEpost, sanitize(req.params.tittel), sanitize(req.params.vare), response.handlelistelogg, req.params.session))
            } catch (err ){ // feil i input parametere
                console.log(err)
                res.json( { statuskode: 0, melding: "API mottok uforventet respons fra databasen, trolig feil i input parameter" } )
            }
        }
    });
})

// hjelpemetode for å legge til antall på vare i handleliste
/* Dmitriy Safiullin */
function leggTilVare(response, dbSvar, epost, tittel, vare, handlelistelogg, session) {
    // insert spørring for å oppdatere vare dersom listen finnes fra før
        let harSendt = false
        // brukerens handlelister itereres
        dbSvar.forEach(handleliste => {
            // hvis den korrekte handlelisten blir funnet
            if (Object.keys(handleliste) == tittel) {
                harSendt = true
                // Begynner å bli litt kryptisk her men det må testes om den gamle verdien eksisterer.
                // Dersom den gjør det skal den inkrementeres, hvis ikke skal den settes til 1.
                // Grunnen til at det står pakket i en try/catch er fordi det kan bli nullpointer/undef err.
                let gammelAnt
                try {
                    gammelAnt = handleliste[tittel][vare]
                } catch (error) {
                    // verdi finnes ikke fra før
                }
                if (gammelAnt === undefined) gammelAnt = 0
                console.log(`gammelant+1: ${gammelAnt + 1}`)
                handleliste[tittel][vare] = gammelAnt + 1
                console.log(dbSvar)
                // sender spørring
                brukerModell.updateOne({
                    epost: epost
                }, {$set: {
                    handlelister: dbSvar
                }} ).then(svar => {
                    console.log(svar)
                })
            }
        })
        // Legger til ny liste dersom den ikke finnes fra før
    if (!harSendt) {
        console.log("!harsendt")
        let nyHandleliste = { [tittel]: {[vare]: 1} }
        dbSvar.push(nyHandleliste)
        brukerModell.updateOne({
            epost: epost
        }, {$set: {
            handlelister: dbSvar
        }} ).then(svar => {
            console.log(svar)
        })
    }
    // loggfører hendelse
    pushLogg(
        brukerModell,
        response,
        epost,
        session,
        tittel,
        `Legger til ${vare} i ${tittel}`
    )
}

// Fjerner vare fra handleliste
/* Dmitriy Safiullin */
ruter.post('/handlelister/:epost/:tittel/pop/:vare/:session', async function (req, res) {
    console.log(`${req.params.epost} fjerner ${req.params.vare} fra handleliste: ${req.params.tittel}`)
    logger.info(`${req.params.epost} fjerner ${req.params.vare} fra handleliste: ${req.params.tittel}`)
    // første databasespørring for å finne ut om handlelisten eksisterer fra før
    let dbSvar
    brukerModell.findOne({ epost: sanitize(req.params.epost)}, function (error, response) {
        if (error) {
            console.log(error);
            res.status(500).json({ message: error.message })
        }
        else {
            try {
                dbSvar = response.handlelister
                console.log(dbSvar)
                // loggfører hendelse
                pushLogg(
                brukerModell,
                response,
                req.params.epost,
                req.params.session,
                req.params.tittel,
                `Sletter ${req.params.vare} fra ${req.params.tittel}`
                )
                // hjelpemetode for å fjerne liste
                res.json(fjernVare(dbSvar, sanitize(req.params.epost), sanitize(req.params.tittel), sanitize(req.params.vare)))
            } catch (err) { // feil i input parametere
                console.log(err)
                res.json( { statuskode: 0, melding: "API mottok uforventet respons fra databasen, trolig feil i inpur parameter" } )
            }
        }
    });
})

// hjelpemetode for å dekrementere/fjerne vare fra handleliste eller slette vare fra handleliste hvis den nulles ut
/* Dmitriy Safiullin */
ruter.post('/handlelister/:epost/:tittel/delete/:vare/:session', async function(req, res){
    let dbSvar
    brukerModell.findOne({ epost: sanitize(req.params.epost)}, function (error, response) {
        if (error) {
            console.log(error);
            res.status(500).json({ message: error.message })
        }
        else {
            try {
                dbSvar = response.handlelister
                console.log(dbSvar)
                // loggfører hendelse
                pushLogg(
                    brukerModell,
                    response,
                    req.params.epost,
                    req.params.session,
                    req.params.tittel,
                    `Sletter ${req.params.vare} fra ${req.params.tittel}`
                )
                // hjelpemetode for å inserte liste
                res.json(fjern(dbSvar, sanitize(req.params.epost), sanitize(req.params.tittel), sanitize(req.params.vare)))
            } catch (err) { // feil i input parametere
                console.log(err)
                res.json( { statuskode: 0, melding: "API mottok uforventet respons fra databasen, trolig feil i input parameter" } )
            }
        }
    });
})

function fjern(dbSvar, epost, tittel, vare){
    dbSvar.forEach(handleliste => {
        console.log(handleliste)
        if (Object.keys(handleliste) == tittel) {
         delete handleliste[tittel][vare]       
        
        }
        brukerModell.updateOne({
            epost: epost
        }, {$set: {
            handlelister: dbSvar
        }} ).then(svar => {
            console.log(svar)
        })
    })
}
    
function fjernVare(dbSvar, epost, tittel, vare) {
    // insert spørring for å oppdatere vare dersom listen finnes fra før
    console.log(dbSvar)
        // brukerens handlelister itereres
        dbSvar.forEach(handleliste => {
            console.log(handleliste)
            // hvis den korrekte handlelisten blir funnet
            if (Object.keys(handleliste) == tittel) {
                // Begynner å bli litt kryptisk her men det må testes om den gamle verdien eksisterer.
                // Dersom den gjør det skal den dekrementeres.
                // Grunnen til at det står pakket i en try/catch er fordi det kan bli nullpointer/undef err.
                let gammelAnt
                try {
                    gammelAnt = handleliste[tittel][vare]
                } catch (error) {
                    // verdi finnes ikke fra før
                }
                if (gammelAnt === undefined) gammelAnt = 0
                console.log(`gammelant+1: ${gammelAnt - 1}`)
                handleliste[tittel][vare] = gammelAnt - 1
                // Fjerner vare fra handleliste hvis den blir tom
                if (handleliste[tittel][vare] <= 0) delete handleliste[tittel][vare]
                console.log(dbSvar)

                // sender spørring
                brukerModell.updateOne({
                    epost: epost
                }, {$set: {
                    handlelister: dbSvar
                }} ).then(svar => {
                    console.log(svar)
                })
                
            }
        })
}

// Rute for å slette handleliste
/* Dmitriy Safiullin */
ruter.post('/handlelister/:epost/:tittel/remove/:session', async function (req, res) {
    console.log(`${req.params.epost} fjerner ${req.params.vare} fra handleliste: ${req.params.tittel}`)
    logger.info(`${req.params.epost} fjerner ${req.params.vare} fra handleliste: ${req.params.tittel}`)
    // første databasespørring for å finne ut om handlelisten eksisterer fra før
    let dbSvar
    brukerModell.findOne({ epost: sanitize(req.params.epost)}, function (error, response) {
        if (error) {
            console.log(error);
            res.status(500).json({ message: error.message })
        }
        else {
            try {
                dbSvar = response.handlelister
                console.log(dbSvar)
                // hjelpemetode for å slette liste
                slettHandleliste(dbSvar, sanitize(req.params.epost), sanitize(req.params.tittel))
                // loggfører hendelse
                pushLogg(
                    brukerModell,
                    response,
                    req.params.epost,
                    req.params.session,
                    req.params.tittel,
                    `Sletter ${req.params.vare} fra ${req.params.tittel}`
                )
                res.json({ melding: "Slettet liste" })
            } catch (err) { // feil i input parametere
                console.log(err)
                res.json( { statuskode: 0, melding: "API mottok uforventet respons fra databasen, trolig feil i inpur parameter" } )
            }
        }
    });
})

// Hjelpefunksjon for å slette handleliste
/* Dmitriy Safiullin */
function slettHandleliste(dbSvar, epost, tittel) {
    let gammelDbSvar = dbSvar
    gammelDbSvar = gammelDbSvar.filter((elem) => elem[tittel] != tittel);
    gammelDbSvar = gammelDbSvar.filter(value => JSON.stringify(value) !== '{}');
    console.log("SLETTHANDLeLISTE")
    console.log(gammelDbSvar)
    console.log("Sletter liste: " + tittel)
    dbSvar.forEach(function(item){ delete item[tittel] });
    brukerModell.updateOne({
        epost: epost
    }, {$unset: {
        handlelister: 0
    }} ).then(svar => {
        console.log(svar)
    })
    brukerModell.updateOne({
        epost: epost
    }, {$set: {
        handlelister: gammelDbSvar
    }} ).then(svar => {
        console.log(svar)
    })
}

// Hjelpefunksjon som sjekker om en handleliste er tom, dersom den er det så returnerer den true
/* Dmitriy Safiullin */
function sjekkSlett(handleliste, tittel) {
    let teller = 0
    for (let vare in handleliste[tittel]) {
        let verdi = handleliste[tittel][vare]
        if (verdi > 0) teller += verdi
    }
    return teller <= 0
}

// Hjelpemetode for å hente alle nåværende butikker fra prisdata
/* Dmitriy Safiullin */
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
/* Dmitriy Safiullin */
function utvinnVarer(prisdata) {
    let vareArray = []
    prisdata.forEach((element) => {
        Object.keys(element.varer).forEach((vare) => {
            if (!vareArray.includes(vare)) vareArray.push(vare)
        })
    })
    return vareArray.sort()
}
// Hjelpemetode for å finne en butikks tilsvarende indeks i hvert element i databasen
/* Dmitriy Safiullin */
function finnButikkIndeks(element, butikkNavn) {
    let i = 0
    let svar = -1
    element.butikker.forEach((butikk) => {
        if (butikk == butikkNavn) svar = i
        i++
    })
    return svar
}

// Tore Broberg, metode for å sette lognivå, og å skrue logføring av/på
ruter.get('/logger/:lvl/:status', async(req, res)=>{
        
    console.log(req.cookies.bruker)
    let brukernavn = req.cookies.bruker
     let sts = sanitize(req.params.status);
     let nivå = sanitize(req.params.lvl);
     let logState ;
     if(sts === 'true'){
         console.log('skiftet til false ')
         logState = true;
     }
     else{logState= false}
           logger.info('bruker: ' + brukernavn + ' ' + 'skiftet lognivå til' + ' : '+ nivå)

     
       
        logger.level = nivå;
        logger.silent=logState;
        console.log(sts, nivå);
        logger.info('bruker:' + req.cookies.bruker + ' ' + 'oppdaterte lognivå til :' + '' + nivå );
        res.send('skiftet loggprotokol');

    
   
    
    
})
//Tore broberg, metode for å slette en bruker 
ruter.get('/slettbruker/:bruker', async function(req, res){
    let brukerNavn= sanitize(req.params.bruker)   
     logger.info('sletter bruker:' + ' '  + brukerNavn)
     res.clearCookie('bruker')
    brukerModell.findOneAndDelete(brukerNavn)

})
//Tore broberg registrerer bruker - brukt følgende kilde for å bearbeide kode:
//https://github.com/codedamn/full-mern-stack-video  
ruter.post('/regist', async function (req, res) {
        let epost = sanitize(req.body.epost);
        let passord = sanitize(req.body.passord);
        console.log(epost)
        const nyBruker = {epost, passord};
        console.log('dette er en ny bruker'+ JSON.stringify(nyBruker));
     try{
  brukerModell.findOne({epost: epost}).then(bruker=> {
            if (bruker){
                res.json('brukerEKS');
                console.log('bruker eksisterer')    
            }
            else{
            logger.info('bruker: ' + epost + ' ' + 'opprettet')

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(nyBruker.passord, salt, (error, hash)=> {
                        if(error){
                            console.log('feil med passordkryptering')
                        }    
                        nyBruker.passord = hash;
                        console.log(nyBruker)
                        brukerModell.create(nyBruker);
                        console.log('lagt ny bruker'+ JSON.stringify(nyBruker))

                    })
                });
                console.log(nyBruker.passord)
                res.json('bruker regisrert')    
                console.log('bruker opprettet')    
            }
    }) }
    catch(error){
        console.log(error);
    }
})

//Tore broberg, metode for å logge ut, sletter cookie som er knytte til brukeren 
ruter.get('/logUt', async function(req, res){
    let brukernavn = req.cookies.bruker
    logger.info('bruker: ' + brukernavn + ' ' + 'logget ut')

    console.log('cookies som ble slettet nå :' +req.cookies.bruker)
    res.clearCookie('bruker')
    res.end()
})
//Tore broberg, metode for å logge inn, sjekker brukernavn og passord mot epost, og kryptert passord i databasen 

ruter.post('/login',async function (req, res) {   
        console.log('request')
        const epost = sanitize(req.body.epost);
        const passord = sanitize(req.body.passord);
        const bruker = {epost, passord};
        console.log(bruker)

        try{ 

    
     let finnbruker =  await brukerModell.findOne({epost});
          if(!finnbruker){
          res.json('bruker finnes ikke')
      }
else{
          bcrypt.compare(bruker.passord, finnbruker.passord).then(liktPw=>{
              if(!liktPw){
                  res.json({melding: 'feil passord', bruker: null})

              }
              else{
                logger.info('bruker: ' + epost + ' ' + 'logget inn')
            
                const token = jwt.sign(
                    {
                        epost: bruker.epost,
                    },
                    'hemmelig'
                )
               res.json({melding: 'innlogget', bruker: token})   
        }  
            })
   
        }
        }
    catch(error){

    }
})


//SKAL POSTE VARE TIL HANDLELISTE, GJØR IKKE DET ENNÅ 
ruter.post('/handleListe', async function (req, res){
    console.log('skjer det noe her')
const brukerEpost = req.body.epost;
const vareNavn = (req.body.vare);
console.log(JSON.stringify(vareNavn)+ 'vareshit')
console.log(brukerEpost + 'epost')
let finnbruker =  await brukerModell.findOne({brukerEpost});
          if(!finnbruker){
          res.json('bruker finnes ikke')
      }
     // {$push: {handlelister : JSON.stringify(vareNavn)}},
else{
  
    brukerModell.findOneAndUpdate(
        {epost: brukerEpost, handlelister:[0]},
        {$inc: {vareNavn: 1}}
     
        )
    

}
})
 //TESTMETODE --- SKAL UT I FERDIG VERSJON ---- 
ruter.get('/cTest', async function (req, res) {
   // res.setHeader('Set-Cookie',['type=ninja', 'language=javascript']);
   console.log('sjekker om cookies lever' ,req.cookies.bruker)

   const cook = req.cookies.bruker;

   logger.info('leser cookie', cook)
   //res.cookie('epic', 'cookie')
   let cook1 = req.cookies.bruker;

    
/*    res.cookie('lol', 'true');
    res.cookie('test', 'dette',{
           maxAge: 5000,
           sameSite: "lax",
           path: "/icons", 
    });
    console.log('cookies1', req.cookies);
*/
    res.send()
})

//Tore broberg, henter loggen for å sende til klient 
ruter.get('/hentLogg', async function (req, res){
    let brukernavn = req.cookies.bruker
   try{
    //var array = require("fs").readFileSync("loggInfo.log").toString().split("\\n");
    console.log('tester hentlogg')
    fs.readFile('loggInfo.log', 'utf-8', function(err, data){
        res.send(data)
        console.log(data)
          })}
          catch(err){res.send(err)}
      
})
//Tore broberg, hjelpemetode for å opprette cookie som identifiserer bruker på serversiden
ruter.get('/lagCTest/:epost', async function (req, res){
    res.cookie('bruker', sanitize(req.params.epost) )
    res.end()
})
// TODO:
// spørringer basert på pris
// hent alle data innenfor spesifisert tid
// hent alle data for en vare
// hent alle data for en butikk
ruter.get('/adminSjekk', async function(req, res){
    let brukernavn = req.cookies.bruker

    if(brukernavn === 'admin@admin.com'){
        res.json('OK')
    }
    else{
        res.json('!OK')
    }
})



export default ruter
