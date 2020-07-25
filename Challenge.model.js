const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let Challenge = new Schema({
  clocklimit: {
    type: Number
  },
  clockincrement: {
    type: Number
  },
  timeControl: {
    type: String
  },
  id: {
    type: String
  },
  url: {
    type: String
  },
  urlWhite: {
    type: String
  },
  urlBlack: {
    type: String
  },
  variant: {
    type: String,
    enum: ["standard","chess960","crazyhouse","antichess","atomic","horde","kingOfTheHill","racingKings","threeCheck"]
  }
});

module.exports = mongoose.model('Challenge', Challenge);
