//console.log('helloooooo')
const express = require('express');
const mongoose = require('mongoose');

const url = 'mongodb://localhost/Swarnadeep' // AlienDBex is the database name

const app = express(); // starting express server

mongoose.connect(url, { useNewUrlParser: true }); // to avoid warning, using useNewUrlParser 


const con = mongoose.connection; // creating connection object, which may take some time.

con.on('open', () => {
    console.log('Connected with port number..'); // Print a message when connected
})

app.use(express.json()) // Telling express that I want to use JSON here

const alienRouter = require('./routes/aliens') // Creating router for all routing purpose in aliens.js
app.use('/aliens', alienRouter) //Adding a middleware, which will send all '/aliens' request to alienRouter

app.listen(9000, () => {
    console.log('Server started on Port 9000') //listening server
})
