const express = require('express')
const router = express.Router()
const User = require("../models/user.js")
const Connect = require("../models/Connect.js")

var multer  =   require('multer');
var upload = multer({dest: 'documents/'})
let u = ['','Student','Supervisor','HOD']
const {ensureAuthenticated} = require("../config/auth.js")
// home page
router.get('/',(req, res) => {
    res.render('home.ejs')
})

router.post('/approve',ensureAuthenticated,async (req,res)=>{
    console.log(req.body)
    User.findByIdAndUpdate({_id:req.body.stid},{"status":"Approved by HDC"},function(err, result){
        if(err){
            res.send(err)
        }
        else{
            console.log(result)
            res.redirect('/dashboard')
        }
    })

})


router.post('/final',ensureAuthenticated,async (req,res)=>{
    console.log(req.body)
    User.findByIdAndUpdate({_id:req.body.stid},{"status":"Final Admission"},function(err, result){
        if(err){
            res.send(err)
        }
        else{
            console.log(result)
            res.redirect('/dashboard')
        }
    })

})
//
router.get('/dashboard',ensureAuthenticated,async (req,res)=>{
    
    ut = u[req.user.userType]
    console.log(u[req.user.userType])
    console.log(req.user)
    if(req.user.userType == 3){
        let students = await User.find({userType: 1}).exec()
        console.log(students)
        res.render('dashboard',{
            user: req.user,
            ut: ut,
            students: students
        });
    }
    else if(req.user.userType == 5){
        let students = await User.find({userType: 1}).exec()
        res.render('dashboard',{
            user: req.user,
            ut: ut,
            students: students
        });
    }
    else{
        res.render('dashboard',{
        user: req.user,
        ut: ut
    });

    }
    
})

router.post('/connect',ensureAuthenticated,(req,res) =>{
    console.log(req.body)
    Connect.findOne({suid: req.body.suid,stid: req.body.stid}).exec((err,con) => {
        if(con){
            errors.push({msg: 'Connection done alredy'})
            res.render('/dashboard',{ 
                errors,
                con
            })
        }
        else {
            const newConnection = new Connect({
                suid: req.body.suid,
                stid: req.body.stid,
                status: false
            })
            newConnection.save().then((value) =>{
                console.log(value)
                res.redirect('/dashboard')
            })
            .catch(value => console.log(value))
        }
    })
})
router.post('/search',ensureAuthenticated,async (req,res) => {
    let interest = req.body.interest
    users = await User.find({userType: 1,skillset: { $eq : interest }}).exec()
    console.log(users)
    res.render('dashboard', {
        user: req.user,
        ut: u[req.user.userType],
        users: users
    })
})

router.post('/upload',upload.single('document'),(req,res) =>{
   
    console.log("Body: ",req.user)
    let id = req.user._id
    console.log(req.body)
    console.log(`id: ${id}`)
    User.findByIdAndUpdate({_id:id},{"status":"Approval In Standby"},function(err, result){
        if(err){
            res.send(err)
        }
        else{
            res.redirect('/dashboard')
        }
    })
    
})



module.exports = router