// Object Orienteited progrmamig vadovaujas archutekturine metadologija MVC

// MVC issisifruoja kaip:
//Model atsakingas uz duomenu strukturos perdavima (kitaip duomenu padavimas, paemimas), viskas yra susije su kreipimusi i duomenu baza
//View kaip pavizdys yra musu handlebars sablonai
//Controller kontroleris tai yra visi musu sukurti routai

// import mysql from 'mysql2/promise'
// import { constants } from 'buffer'
import express from 'express'
import {engine} from 'express-handlebars'
import session from 'express-session'
import admin from './controller/admin.js'
import home from './controller/home.js'
import login from './controller/login.js'
import imageUploade from './middlewarer/uploade.js'

const app = express()

// lets you use custom css styles
app.use('/publick', express.static('publick'))

// lets you use post method "req.body"
app.use(express.urlencoded({
    extends: true
}))

// lets use session module configuration
app.use(session({
    secret:'stasiukynai',
    resave: false,
    saveUninitialized: false,
    cookie:{
        
        maxAge: 60000
        
    }

}))

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

// routo home importinimo konfigas
app.use(home)
// routo login importinimo konfigas
app.use(login)
// routo admin importinimo konfigas
app.use(admin)


// Lets connect to mysql data base

// const database = await mysql.createdatabase({

//     host: 'localhost',
//     user:'root',     
//     password: '',  
//     database: 'steel'
// })


// Jungimasisi prie isorinio  serverio



const port = process.env.PORT || 3000









app.listen(port)



// hroku page adresas https://app-wartechnic.herokuapp.com/