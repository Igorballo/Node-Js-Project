const express = require("express")
const router = express.Router()

const contacts = [{ "name": 'Igor ballo', "message": 'I love myself' }, { "name": 'Fousseni Chourik', "message": 'I love my Job' }]
router.get("/", (req, res) => {
    
    res.send(contacts)
})

router.get("/:id", (req, res) => {
    res.send(contacts[req.params.id])
})

module.exports = router