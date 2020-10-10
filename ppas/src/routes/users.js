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
    const {username} = req.body
    if(!username){
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
                    password: '123'
                })
                bcrypt.genSalt(10, (err,salt) =>
                bcrypt.hash(newUser.password,salt,(err,hash) =>{
                    if(err) throw err;
                    newUser.password = hash
                    newUser.save().then((value) =>{
                        console.log(value)
                        req.flash('success_msg','You are now registere!')
                        res.redirect('/users/login')
                    }).catch(valeu => console.log(value))
                }))

            }
        })
    }
    
})

// get logout
router.get('/logout', (req, res) =>{
    
})
module.exports = router