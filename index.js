// import { constants } from 'buffer'
import express from 'express'
import {engine} from 'express-handlebars'
import mysql from 'mysql2/promise'


const app = express()

// lets you use custom css styles
app.use('/publick', express.static('publick'))

// lets you use post method "req.body"
app.use(express.urlencoded({
    extends: true
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

    const user = await connection.query(`SELECT name, email, password FROM user  `)

    console.log(user[0]);
    res.render('home')
})

//home handlebars end


//login handlebars start


app.get('/login', (req, res) => {

    res.render('login')

})

app.post('/login', async (req, res) => {

    const userData = req.body

    const user = await connection.query(`SELECT * FROM user WHERE email = '${userData.email}' AND password = '${userData.passwors}' `)

    if(user[0].length >=1 )
    return res.redirect('/admin')


    return  res.render('login')
})

//login handlebars end

//Admin handlebars start

app.get('/admin', (req, res) => {

    res.render('admin')
})

//Admin handlebars end




app.listen(3000)
