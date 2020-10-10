const express = require('express')
const router = express.Router()

const {ensureAuthenticated} = require("../config/auth.js")
// home page
router.get('/',(req, res) => {
    res.render('home.ejs')
})

//
router.get('/dashboard',ensureAuthenticated,(req,res)=>{
    console.log(req)
    res.render('dashboard',{
        user: req.user
    });
})

module.exports = router