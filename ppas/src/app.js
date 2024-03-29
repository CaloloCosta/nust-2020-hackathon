const express = require('express')
const router = express.Router()
const app = express()
const mongoose = require('mongoose')
const ejsLayout = require('express-ejs-layouts')
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');

app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/resources', express.static(__dirname + 'public/resources'))
// app.use(express.static(__dirname + '../public/css'));
require("./config/passport")(passport)
// mongoose
mongoose.connect('mongodb://localhost/test',{useNewUrlParser: true, useUnifiedTopology : true})
.then(() => console.log('connected,,'))
.catch((err)=> console.log(err));

app.set('view engine','ejs')
app.use(ejsLayout)

app.use(express.urlencoded({extended: false}))

//express session
app.use(session({
    secret : 'secret',
    resave : true,
    saveUninitialized : true
   }));
app.use(passport.initialize());
app.use(passport.session());
   //use flash
   app.use(flash());
   app.use((req,res,next)=> {
     res.locals.success_msg = req.flash('success_msg');
     res.locals.error_msg = req.flash('error_msg');
     res.locals.error  = req.flash('error');
   next();
   })

const port = 3000

// Routes
app.use('/',require('./routes/index'))
app.use('/users',require('./routes/users'))
// app.get('/',(req, res) => {
//     res.send('Hello World!')
// })

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})