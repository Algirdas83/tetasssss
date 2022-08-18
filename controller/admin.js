
import express, { query } from 'express'
import auth from '../middlewarer/auth.js'
import database from '../database/connect.js'
import upload from '../middlewarer/uploade.js'




const router = express.Router()

router.get('/admin',(auth), async (req, res) => {

    const machines = await database.query(`SELECT id, machine_name, about, img FROM warMachines`)



    res.render('admin', {machines: machines[0]})
})

router.get('/admin/add',(req, res) => {


    res.render('adminAdd')
})




router.post('/admin/add',upload.single('image'),  async(req, res) => {

    const data = req.body
    const imgFile = req.file
    console.log(imgFile)

    const machines = await database.query(`INSERT INTO warMachines(machine_name, about, img) VALUES ('${data.machine}', '${data.about}', '${imgFile.path}')`)

    res.redirect('/admin')
})


router.get('/admin/edit/:id', async (req, res) => {

    const id = req.params.id
    const machines = await database.query(`SELECT machine_name, about, img FROM warMachines WHERE id = ${id}`)
    
    res.render('adminEdit', {change:machines[0]})
})

router.post('/admin/edit/:id', auth,upload.single('image'), async(req, res) =>{

    const id = req.params.id
    const updateData = req.body
    const machines = await database.query(`UPDATE warMachines SET  machine_name='${updateData.name}', about='${updateData.about}', img= '${updateData.image}' WHERE id = ${id} `)

return res.redirect('/admin')
})



router.get('/admin/delete/:id', (auth), async (req, res) => {

    const id = req.params.id

    const machines = await database.query(`DELETE FROM warMachines WHERE id = ${id}  `)


    console.log(id);

    return res.redirect('/admin')

})

//Admin handlebars end


export default router