const mongoose = require('mongoose');
const UserSchema  = new mongoose.Schema({
  userType:{
    type: Number,
    required: true
  },
  username :{
      type  : String,
      required : true
  } ,
password :{
    type  : String,
    required : true
},
fullname :{
  type  : String,
  required : true
} , 
citzenship :{
  type  : String,
  required : false
} ,
qualification :{
  type  : String,
  required : false
} ,
motivation :{
  type  : String,
  required : false
} ,
skillset:{
  type: [String],
  required: false
},
interest:{
  type: [String],
  required: false
}
});
const User= mongoose.model('User',UserSchema);

module.exports = User;