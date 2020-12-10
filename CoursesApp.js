const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const express = require('express');
const app = express();
//const auth = require("./Middlewares/Middleware2");
const { urlencoded } = require('express');
const helmet = require("helmet");
const morgan = require("morgan");
const config = require("config");
const courses = require('./routes/courses');
const customers = require('./routes/customers');
const DebugStartUp = require("debug")('app:startup')
const DBDebugger = require("debug")('app:db')
const user = require('./routes/users');
const authen = require('./routes/auth');

const home = require('./routes/home');
if (!config.get('JwtPrivateKey')){

    console.error('Fatal Error : jwtprivatelkey is not defined')
    process.exit(1);
}


mongoose.connect('mongodb://localhost/courses')
.then(()=>console.log('mongodb is connected'))
.catch(err => console.error('MongoDB is not connected..'));

 app.set("view engine","pug")
 app.set("views","./views")

//console.log("Node_ENV : "`${process.env.NODE_ENV}`);
app.get("env")
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(express.static("public"));
app.use(helmet());
app.use('/api/courses', courses)
app.use('/api/customer', customers)
app.use('/api/auth', authen)
app.use('/api/user', user)



app.use('/', home)

// console.log("Application name" + config.get("name"))
// console.log("Mail" + config.get("mail.host"))
// console.log("Mail" + config.get("mail.password"))



//  if(app.get('env') === 'development' && 'production'){

//  app.use(morgan('tiny'));

//  DebugStartUp("Morgan Enabled");

// }
DBDebugger("The DataBase Has Been Connected");

//app.use(logger);
//app.use(auth);





const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));