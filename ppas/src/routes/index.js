const express = require('express')
const router = express.Router()

// home page
router.get('/register',(req, res) => {
    res.render('home.ejs')
})

//
router.get('/dashboard',(req,res)=>{
    res.render('dashboard');
})

module.exports = router