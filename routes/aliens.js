const express = require('express')
const router = express.Router()

const Alien = require('../model/alien')

//To work with database, We have to send async request.
router.get('/', async(req, res) => { //this will receive all routes and send below in response
    //res.send('Get request successfully received.')
    try {
        const aliens = await Alien.find(); //Finding Alien in db and waiting for response
        res.json(aliens) //sending whole Aliens data as a json format
    } catch (err) {
        res.send('Error ' + err);
    }
})

router.post('/', async(req, res) => {
    const alien = new Alien({
        name: req.body.name,
        tech: req.body.tech,
        subscribed: req.body.subscribed
    })

    try {
        const a1 = await alien.save()
        res.json(a1)
    } catch (err) {
        res.send('Error ' + err)
    }
})


module.exports = router //export the 'router' module so that app.js can access 'router'