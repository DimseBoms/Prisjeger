import express from 'express'
const ruter = express.Router()

// hent alle data
ruter.get('/', (req, res) => {

})
// hent alle data for en måned
ruter.get('/:måned', (req, res) => {
    
})
// hent alle data for en vare
ruter.get('/:varenr', (req, res) => {
    
})

module.exports = ruter