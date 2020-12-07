'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const { handleClients, handleEachClient, handleAddClient, handleDeleteClient } = require('./handlers/clientHandlers');
const { handleTest, handleWord, handleGuess } = require('./handlers/hangmanHandlers');

express()
  .use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
  })
  .use(morgan('tiny'))
  .use(express.static('public'))
  .use(bodyParser.json())
  .use(express.urlencoded({ extended: false }))

  // endpoints for Exercise 2
  .get('/clients', handleClients)
  .get('/client/:id', handleEachClient)
  .post('/clients', handleAddClient)
  .delete('/client/:id', handleDeleteClient)

  // endpoints for Exercise 3
  .get('/hangman/word/:id', handleTest)
  .get('/hangman/word', handleWord)
  .get('/hangman/guess/:id/:letter', handleGuess)

  .listen(8000, () => console.log(`Listening on port 8000`));
