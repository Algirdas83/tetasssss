
import mysql from 'mysql2/promise'


const connection = await mysql.createConnection({

    host: 'pauliuspetrunin.lt',
    user:'bit',     
    password: 'kulokas',  
    database: 'AlgirdasL'
})


export default  connection