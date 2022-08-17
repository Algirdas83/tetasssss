import express from 'express'
import database from '../database/connect.js'



const router = express.Router()



router.get('/login', (req, res) => {

    res.render('login')

})

router.post('/login', async (req, res) => {

    try {

        const userData = req.body

        const user = await database.query(`SELECT * FROM user WHERE email = '${userData.email}' AND password = '${userData.passwors}' `)
    
        if(!user[0].length >=1 )
        return res.render('login', {message:'Blogi prisijungimo duomenys'})


        req.session.loggedIn = true
        return  res.redirect('/admin')
        
    } catch {
        
    }
   

    
})

export default router