// import { constants } from 'buffer'
import express from 'express'
import {engine} from 'express-handlebars'
import mysql from 'mysql2/promise'
import session from 'express-session'
import auth from './midllewear/auth.js'


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


// Lets connect to mysql data base

const connection = await mysql.createConnection({

    host: 'localhost',
    user:'root',     
    password: '',  
    database: 'steel'
})






//home handlebars start
app.get('/', async (req, res) => {

    const user = await connection.query(`SELECT machine_name, about, img FROM warMachines  `)

    res.render('home', {machines: user[0]})
})

//home handlebars end


//login handlebars start


app.get('/login', (req, res) => {

    res.render('login')

})

app.post('/login', async (req, res) => {

    try {

        const userData = req.body

        const user = await connection.query(`SELECT * FROM user WHERE email = '${userData.email}' AND password = '${userData.passwors}' `)
    
        if(!user[0].length >=1 )
        return res.render('login', {message:'Blogi prisijungimo duomenys'})


        req.session.loggedIn = true
        return  res.redirect('/admin')
        
    } catch {
        
    }
   

    
})

//login handlebars end

//Admin handlebars start

app.get('/admin',(auth), async (req, res) => {

    const machines = await connection.query(`SELECT id, machine_name, about, img FROM warMachines`)



    res.render('admin', {machines: machines[0]})
})

//Admin handlebars end




app.listen(3000)
