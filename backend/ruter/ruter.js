import express from 'express'
import prisdataModell from '../datamodeller/prisdataModell.js'
import varelisteModell from '../datamodeller/varelisteModell.js'
import brukerModell from '../datamodeller/brukerModell.js'
import logger from '../Logger.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
const ruter = express.Router()

// home
ruter.get('/', (req, res) => {
    console.log("Ny forespørsel etter index")
    res.send('Home Page')
})
// returnerer all prishistorikk
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
ruter.get('/vare/:navn', async function (req, res) {
    console.log(`Ny forespørsel etter vare: ${req.params.navn}`)
    let brukernavn = req.cookies.bruker
    logger.info('bruker: ' + brukernavn + ' ' + 'henter prisdata for en vare')
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
                    delSvar.priser[butikk] = element.varer[req.params.navn].at(i)
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
ruter.get('/vare/:navn/:fradato', async function (req, res) {
    console.log(`Ny forespørsel etter vare: ${req.params.navn} fra ${req.params.fradato}`)
    let brukernavn = req.cookies.bruker
    logger.info('bruker: ' + brukernavn + ' ' + 'all prisdata for en vare fra et tidspunkt')
    try {
        let prisdata = await prisdataModell.find({
            dato: {$gte: req.params.fradato}
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
                    delSvar.priser[butikk] = element.varer[req.params.navn].at(i)
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
ruter.get('/vare/:navn/:fradato/:tildato', async function (req, res) {
    console.log(`Ny forespørsel etter vare: ${req.params.navn} fra ${req.params.fradato} til ${req.params.tildato}`)
    let brukernavn = req.cookies.bruker
    logger.info('bruker: ' + brukernavn + ' ' + 'henter prisdata for en vare mellom to tidspunkt ')
    try {
        let prisdata = await prisdataModell.find({
            dato: {$gte: req.params.fradato, $lte: req.params.tildato}
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
                    delSvar.priser[butikk] = element.varer[req.params.navn].at(i)
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
ruter.get('/butikk/:butikk', async function (req, res) {
    console.log(`Ny forespørsel etter butikk: ${req.params.butikk}`)
    let brukernavn = req.cookies.bruker
    logger.info('bruker: ' + brukernavn + ' ' + 'henter prisdata for en butikk')
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
                let butikkIndeks = finnButikkIndeks(element, req.params.butikk)

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
ruter.get('/butikk/:butikk/:fradato', async function (req, res) {
    console.log(`Ny forespørsel etter butikk: ${req.params.butikk} fra ${req.params.fradato}`)
    let brukernavn = req.cookies.bruker
    logger.info('bruker: ' + brukernavn + ' ' + 'henter prisdata for en butikk fra en dato')
    try {
        let prisdata = await prisdataModell.find({
            dato: {$gte: req.params.fradato}
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
                let butikkIndeks = finnButikkIndeks(element, req.params.butikk)

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
ruter.get('/butikk/:butikk/:fradato/:tildato', async function (req, res) {
    console.log(`Ny forespørsel etter butikk: ${req.params.butikk} fra ${req.params.fradato} til ${req.params.tildato}`)
    let brukernavn = req.cookies.bruker
    logger.info('bruker: ' + brukernavn + ' ' + 'henter all prisdata for en butikk mellom to datoer')
    try {
        let prisdata = await prisdataModell.find({
            dato: {$gte: req.params.fradato, $lte: req.params.tildato}
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
                let butikkIndeks = finnButikkIndeks(element, req.params.butikk)

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
            let dbSvar = response.handlelister
            let utSvar = []
            dbSvar.forEach(handleliste => {
                utSvar.push(Object.keys(handleliste)[0])
                console.log(utSvar)
            })
            let responsArr = []
            utSvar.forEach(element => {
                if (element !== undefined) {
                  responsArr.push(element);
                }
              });
            res.json(responsArr.reverse())
        }
    }).sort(
        {dato: -1}
    );
})
// henter spesifikk handleliste ut fra nøkkel for en bruker
ruter.get('/handlelister/:epost/:tittel', async function (req, res) {
    console.log(`Ny forespørsel etter handleliste: ${req.params.tittel} for epost: ${req.params.epost}`)
    let brukernavn = req.cookies.bruker
    logger.info('bruker: ' + brukernavn + ' ' + 'henter handlelistene sine ')
    brukerModell.findOne({ epost: req.params.epost }, function (error, response) {
        if (error){
            console.log(error);
            res.status(500).json({ message: error.message })
        }
        else{
            let dbSvar = response.handlelister
            dbSvar = dbSvar.filter(value => JSON.stringify(value) !== '{}');
            let harSendt = false
            dbSvar.forEach(handleliste => {
                if (Object.keys(handleliste) == req.params.tittel) {
                    res.json(handleliste[req.params.tittel])
                    harSendt = true
                }
            })
            if (!harSendt) res.json({ message: "Ingen handlelister funnet"})
        }
    }).sort(
        {dato: -1}
    );
})

// Legger til ny tom handleliste
ruter.post('/handlelister/:epost/:tittel/add', async function (req, res) {
    console.log(`${req.params.epost} legger til handleliste: ${req.params.tittel}`)
    logger.info(`${req.params.epost} legger til handleliste: ${req.params.tittel}`)
    // første databasespørring for å finne ut om handlelisten eksisterer fra før
    let dbSvar
    brukerModell.findOne({ epost: req.params.epost}, function (error, response) {
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
                res.json()
            } catch (err ){ // feil i input parametere
                console.log(err)
                res.json( { statuskode: 0, melding: "API mottok uforventet respons fra databasen, trolig feil i inpur parameter" } )
            }
        }
    });
})

// Legger til vare i handleliste
ruter.post('/handlelister/:epost/:tittel/add/:vare', async function (req, res) {
    console.log(`${req.params.epost} legger til ${req.params.vare} i handleliste: ${req.params.tittel}`)
    logger.info(`${req.params.epost} legger til ${req.params.vare} i handleliste: ${req.params.tittel}`)
    // første databasespørring for å finne ut om handlelisten eksisterer fra før
    let dbSvar
    brukerModell.findOne({ epost: req.params.epost}, function (error, response) {
        if (error) {
            console.log(error);
            res.status(500).json({ message: error.message })
        }
        else {
            try {
                dbSvar = response.handlelister
                // hjelpemetode for å inserte liste
                res.json(leggTilVare(dbSvar, req.params.epost, req.params.tittel, req.params.vare))
            } catch (err ){ // feil i input parametere
                console.log(err)
                res.json( { statuskode: 0, melding: "API mottok uforventet respons fra databasen, trolig feil i inpur parameter" } )
            }
        }
    });
})

// hjelpemetode for å legge til antall på vare i handleliste
function leggTilVare(dbSvar, epost, tittel, vare) {
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
}

// Fjerner vare fra handleliste
ruter.post('/handlelister/:epost/:tittel/pop/:vare', async function (req, res) {
    console.log(`${req.params.epost} fjerner ${req.params.vare} fra handleliste: ${req.params.tittel}`)
    logger.info(`${req.params.epost} fjerner ${req.params.vare} fra handleliste: ${req.params.tittel}`)
    // første databasespørring for å finne ut om handlelisten eksisterer fra før
    let dbSvar
    brukerModell.findOne({ epost: req.params.epost}, function (error, response) {
        if (error) {
            console.log(error);
            res.status(500).json({ message: error.message })
        }
        else {
            try {
                dbSvar = response.handlelister
                console.log(dbSvar)
                // hjelpemetode for å inserte liste
                res.json(fjernVare(dbSvar, req.params.epost, req.params.tittel, req.params.vare))
            } catch (err) { // feil i input parametere
                console.log(err)
                res.json( { statuskode: 0, melding: "API mottok uforventet respons fra databasen, trolig feil i inpur parameter" } )
            }
        }
    });
})

// hjelpemetode for å dekrementere/fjerne vare fra handleliste eller slette handleliste hvis tom
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
ruter.post('/handlelister/:epost/:tittel/remove/', async function (req, res) {
    console.log(`${req.params.epost} fjerner ${req.params.vare} fra handleliste: ${req.params.tittel}`)
    logger.info(`${req.params.epost} fjerner ${req.params.vare} fra handleliste: ${req.params.tittel}`)
    // første databasespørring for å finne ut om handlelisten eksisterer fra før
    let dbSvar
    brukerModell.findOne({ epost: req.params.epost}, function (error, response) {
        if (error) {
            console.log(error);
            res.status(500).json({ message: error.message })
        }
        else {
            try {
                dbSvar = response.handlelister
                console.log(dbSvar)
                // hjelpemetode for å slette liste
                slettHandleliste(dbSvar, req.params.epost, req.params.tittel)
                res.json({ melding: "Slettet liste" })
            } catch (err) { // feil i input parametere
                console.log(err)
                res.json( { statuskode: 0, melding: "API mottok uforventet respons fra databasen, trolig feil i inpur parameter" } )
            }
        }
    });
})

// Hjelpefunksjon for å slette handleliste
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
function sjekkSlett(handleliste, tittel) {
    let teller = 0
    for (let vare in handleliste[tittel]) {
        let verdi = handleliste[tittel][vare]
        if (verdi > 0) teller += verdi
    }
    return teller <= 0
}

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
    return vareArray.sort()
}
// Hjelpemetode for å finne en butikks tilsvarende indeks i hvert element i databasen
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
    res.cookie('loggerCookie','loggerDenne')
     let sts = req.params.status;
     let nivå = req.params.lvl;
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
        logger.info('bruker:' + req.cookies.bruker + 'oppdaterte lognivå til' + nivå + 'skrudde logger på');
        res.send('skiftet loggprotokol');

    
   
    
    
})
//Tore broberg, metode for å slette en bruker 
ruter.get('/slettbruker/:bruker', async function(req, res){
    let brukerNavn= req.params.bruker   
     logger.info('sletter bruker:' + ' '  + brukerNavn)
     res.clearCookie('bruker')
    brukerModell.findOneAndDelete(brukerNavn)

})
//Tore broberg registrerer bruker -- kilde for bearbeidet kode her 
ruter.post('/testpost', async function (req, res) {
        let epost = req.body.epost;
        let passord = req.body.passord;
        const nyBruker = {epost, passord};
        console.log('dette er en ny bruker'+ JSON.stringify(nyBruker));
     try{
  brukerModell.findOne({epost: req.body.epost}).then(bruker=> {
            if (bruker){
                res.json('bruker eksisterer allerede');
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
                        brukerModell.create(nyBruker);
                        console.log('lagt ny bruker'+ JSON.stringify(nyBruker))

                    })
                });
                console.log(nyBruker.passord)
                res.json('bruker regisrert')    
                console.log('bruker oppretett')    
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
        const epost = req.body.epost;
        const passord = req.body.passord;
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

//Tore brober, henter loggen for å sende til klient 
ruter.get('/hentLogg', async function (req, res){
    console.log('tester hentlogg')
    fs.readFile('loggInfo.log', 'utf-8', function(err, data){
        res.json(data)
        console.log(data)
          })
      
})
//Tore broberg, hjelpemetode for å opprette cookie som identifiserer bruker på serversiden
ruter.get('/lagCTest/:epost', async function (req, res){
    res.cookie('bruker', req.params.epost )
    res.end()
})
// TODO:
// spørringer basert på pris
// hent alle data innenfor spesifisert tid
// hent alle data for en vare
// hent alle data for en butikk



export default ruter
