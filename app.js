const express = require('express');
const mongoose = require('mongoose');
// AlienDBex is the database name
const url = 'mongodb://localhost/AlienDBex'

// starting express server
const app = express();

// to avoid warning, using useNewUrlParser 
mongoose.connect(url, { useNewUrlParser: true });

// creating connection object, which may take some time.
const con = mongoose.connection;
// Print a message when connected
con.on('open', function() {
    console.log('Connected...');
})