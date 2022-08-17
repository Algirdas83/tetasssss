import express from 'express'
import database from '../database/connect.js'

const router = express.Router()



router.get('/', async (req, res) => {

    const user = await database.query(`SELECT machine_name, about, img FROM warMachines  `)

    res.render('home', {machines: user[0]})
})


export default router

