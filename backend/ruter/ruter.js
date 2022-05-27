import express, { response } from 'express'
import prisdataModell from '../datamodeller/prisdataModell.js'
import brukerModell from '../datamodeller/brukerModell.js'
import logger from '../Logger.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
const ruter = express.Router()

import fs from 'fs'

// home
ruter.get('/', (req, res) => {
    res.send('Home Page')
})
// returnerer all prishistorikk
ruter.get('/historikk', async function(req, res) {
    let brukernavn = req.cookies.bruker
    logger.info('bruker: ' + brukernavn + ' ' + 'henter all prishistorikk')

    try {
        let prisdata = await prisdataModell.find().sort(
            {dato: -1}
        )        
        res.json(prisdata)
    } catch (error) {
        res.status(500).json({ message: error.message })
    
    }
 })
 // returnerer vareliste
ruter.get('/vareliste', async function(req, res) {
    let brukernavn = req.cookies.bruker
    logger.info('bruker: ' + brukernavn + ' ' + 'henter vareliste')

    try {
        let prisdata = await prisdataModell.find().sort(
            {dato: -1}
        )
        res.json(utvinnVarer(prisdata))
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
// returnerer butikkliste
ruter.get('/butikkliste', async function (req, res) {
    let brukernavn = req.cookies.bruker
    logger.info('bruker: ' + brukernavn + ' ' + 'henter butikkliste')

    try {
        let prisdata = await prisdataModell.find().sort(
            {dato: -1}
        )
        res.json(utvinnButikker(prisdata))
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
// Metode for å vise all prisdata for en vare
ruter.get('/vare/:navn', async function (req, res) {
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
                        // console.log(`Vare: ${vare}, pris: ${pris}, index: ${i}, butikkindeks: ${butikkIndeks}`)
                        if (i == butikkIndeks) {
                            delSvar.varer[vare] = pris
                        }
                        i++
                    })
                }

                // element.varer.forEach((vare) => {
                //     delSvar.varer[vare] = element.varer[req.params.navn].at(butikkIndeks)
                // })
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
                        // console.log(`Vare: ${vare}, pris: ${pris}, index: ${i}, butikkindeks: ${butikkIndeks}`)
                        if (i == butikkIndeks) {
                            delSvar.varer[vare] = pris
                        }
                        i++
                    })
                }

                // element.varer.forEach((vare) => {
                //     delSvar.varer[vare] = element.varer[req.params.navn].at(butikkIndeks)
                // })
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
                        // console.log(`Vare: ${vare}, pris: ${pris}, index: ${i}, butikkindeks: ${butikkIndeks}`)
                        if (i == butikkIndeks) {
                            delSvar.varer[vare] = pris
                        }
                        i++
                    })
                }

                // element.varer.forEach((vare) => {
                //     delSvar.varer[vare] = element.varer[req.params.navn].at(butikkIndeks)
                // })
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
// henter handlelister for en epost/bruker
ruter.get('/handlelister/:epost', async function (req, res) {
    let brukernavn = req.cookies.bruker
    logger.info('bruker: ' + brukernavn + ' ' + 'henter handlelistene sine ')

    brukerModell.findOne({ epost: req.params.epost}, function (error, response) {
        if (error){
            console.log(error);
            res.status(500).json({ message: error.message })
        }
        else{
            res.json(response.handlelister)
        }
    }).sort(
        {dato: -1}
    );
})

// Post metoder


// Hjelpemetode for å hente alle nåværende butikker fra prisdata
function utvinnButikker(prisdata) {
    let butikkArray = []
    console.log(prisdata)
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
