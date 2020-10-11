const mongoose = require('mongoose');
const ConnectSchema  = new mongoose.Schema({
  suid:{
    type: String,
    required: true
  },
  stid:{
    type: String,
    required: true
  },
  status:{
    type: Boolean,
    required: false
  }
});

const Connect= mongoose.model('Connect',ConnectSchema);
module.exports = Connect;