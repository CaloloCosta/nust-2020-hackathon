const express = require('express')
const router = express.Router()
const User = require("../models/user.js")
const bcrypt = require('bcrypt')
const passport = require('passport')




// post login
router.post('/login', (req, res, next) =>{
    console.log(req.body)
    passport.authenticate('local',{
        successRedirect : '/dashboard',
        failureRedirect : '/users/login',
        failureFlash : true,
    })(req,res,next);
})

// get login
router.get('/login', (req, res, next) =>{
    res.render('home')
})

// post register
router.post('/register', (req, res, next) =>{
    let errors = []
    console.log(req.body)
      
    const {username,fullname,citizenship,skillset,qualification,interest,motivation} = req.body
    if(!username || !fullname || !citizenship || !skillset || !qualification || !interest || !motivation){
        errors.push({msg: "Please fill in all fields"})
    }

    if(errors.length > 0){
        res.render('home',{
            errors: errors
        })
    }
    else{
        User.findOne({username: username}).exec((err,user) => {
            console.log(user)
            if(user){
                errors.push({msg: 'email alredy registered'})
                res.render('home',{ 
                    errors,
                    user
                })
            }
            else {
                const newUser = new User({
                    username: username,
                    fullname: fullname,
                    citizenship: citizenship,
                    // skillset: skillset.split(" "),
                    qualification: qualification,
                    // interest: interest.split(" "),
                    // motivation:motivation,
                    password: 'nust123',
                    userType: 5,
                    // status: 'Please upload your proposal'
                })
                bcrypt.genSalt(10, (err,salt) =>
                bcrypt.hash(newUser.password,salt,(err,hash) =>{
                    if(err) throw err;
                    newUser.password = hash
                    newUser.save().then((value) =>{
                        console.log(value)
                        req.flash('success_msg','You are now registere!')
                        res.redirect('/users/login')
                    })
                    .catch(value=> console.log(value));
                }))

            }
        })
    }
    
})





// var storage =   multer.diskStorage({
//   destination: function (req, file, callback) {
//     callback(null, './files');
//   },
//   filename: function (req, file, callback) {
//     callback(null, file.fieldname + '-' + Date.now());
//   }
// });
// var upload = multer({ storage : storage}).single('document');

// // app.get('/',function(req,res){
// //       res.sendFile(__dirname + "/index.html");
// // });

// router.post('/upload',function(req,res){
//     console.log(req.body)
//     upload(req,res,function(err) {
//         if(err) {
//             return res.end("Error uploading file.");
//         }
//         res.end("File is uploaded");
//     });
// });


// get logout
router.get('/logout', (req, res) =>{
    req.logout();
    req.flash('success_msg','Now logged out');
    res.redirect('/users/login');
})
module.exports = router