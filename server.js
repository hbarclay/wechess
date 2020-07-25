const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const crypto = require('crypto');
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

const app = express();
const routes = express.Router();

app.use(cors());
app.use(bodyParser.json());

//app.use(express.static('public'));

let Challenge = require('./Challenge.model');

mongoose.connect('mongodb://127.0.0.1:27017/wechess', {useNewUrlParser: true});
const connection = mongoose.connection;

connection.once('open', () => {console.log("MongoDB connection established")});
connection.on('error', console.error.bind(console, 'MongoDB connection error:'));


routes.route('/challenge').post((req, res) => {
  var challenge = new Challenge(req.body);
  let salt = crypto.randomBytes(16);
  const hash = crypto.createHash('sha1');
  hash.update(salt);
  let id = hash.digest('hex');

  challenge.id = id.toString('hex');

  var urlWhite = '';
  var urlBlack = '';

  // create Lichess Challenge
  // TODO: make promise-based
  // or switch libraries (Axios?)
  let xhr = new XMLHttpRequest();

  xhr.open('POST', 'https://lichess.org/api/challenge/open', true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

  // TODO: Change to promise-based
  xhr.addEventListener('load', () => {
    let reply = JSON.parse(xhr.responseText);
    challenge.urlWhite = reply.urlWhite;
    challenge.urlBlack = reply.urlBlack;
    // FIXME: breaks if correspondence
    challenge.timeControl = reply.challenge.timeControl.show;
    challenge.variant = reply.variant;

    // Return local challenge ID
    challenge.save()
    .then(challenge => {
      console.log("Challenge saved");
      res.status(200).json({'challenge': { 'id' : challenge.id}});
    })
    .catch(err => {
      res.status(400).send('create challenge failed');
    });
  });

  xhr.send(`clock.limit=${challenge.clocklimit*60}&clock.increment=${challenge.clockincrement}`);
});

routes.route('/:id').get((req, res) => {
  let idparam = req.params.id;
  Challenge.find({id: idparam }, (err, docs) => {
    if (err) {
      res.status(500).send('Find challenge failed');
    } else {
      if(docs.length) {
        res.status(200).json(docs[0]);
      } else {
        res.status(400).send('No challenge');
      }
    }
  });
});

const port = process.env.PORT || 4000;

app.use('/api', routes);

app.listen(port, () => {console.log(`server running on port ${port}`)});

