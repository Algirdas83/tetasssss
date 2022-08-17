
import express from 'express'
import auth from '../middlewarer/auth.js'
import database from '../database/connect.js'
//Admin handlebars start

const router = express.Router()

router.get('/admin',(auth), async (req, res) => {

    const machines = await database.query(`SELECT id, machine_name, about, img FROM warMachines`)



    res.render('admin', {machines: machines[0]})
})

//Admin handlebars end


export default router