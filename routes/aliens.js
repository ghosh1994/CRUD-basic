console.log('Hello World')
const express = require('express')
const router = express.Router()

router.get('/', (req, res) => { //this will receive all routes and send below in response
    res.send('Get request successfully received.')
})

module.exports = router //export the 'router' module so that app.js can access 'router'