/*
Example api demo with cats
*/

const express = require('express'); //Import Express
const app = express();
app.use(express.json())
const mysql = require('mysql');
 
var pool = mysql.createPool({
    connectionLimit : 10,
    host: "localhost",
    user: "root",
    password: "kissa",
    database : "tarmocats"
  });


// CREATE
 app.post('/cats/add', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        const { id, name, age, imgsrc } = req.body
        connection.query('INSERT INTO cat SET name=?, age=?, imgsrc=?', [name, age, imgsrc, id], (err, rows) => {
            connection.release() // return the connection to pool
            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }
            
            console.log('The cat data is: \n', rows)
        })
    })
});

// READ
// Get all cats
app.get('/cats', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log('connected as id ' + connection.threadId)
        connection.query('SELECT * from cat', (err, rows) => {
            connection.release() // return the connection to pool

            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }

            // if(err) throw err
            console.log('The data from cats table are: \n', rows)
        })
    })
})
// Get cat by id
app.get('/cats/:id', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        connection.query('SELECT * FROM cat WHERE id = ?', [req.params.id], (err, rows) => {
            connection.release() // return the connection to pool
            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }
            
            console.log('The cat data is: \n', rows)
        })
    })
});

// UPDATE   
app.put('/cats/:id', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)

        const { id, name, age, imgsrc } = req.body

        connection.query('UPDATE cat SET name = ?, age = ?, imgsrc = ? WHERE id = ?', [name, age, imgsrc, id] , (err, rows) => {
            connection.release() // return the connection to pool

            if(!err) {
                res.send(`Cat with the id: ${id} has been updated.`)
            } else {
                console.log(err)
            }

        })

        console.log(req.body)
    })
})

// DELETE
app.delete('/cats/:id', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        connection.query('DELETE FROM cat WHERE id = ?', [req.params.id], (err, rows) => {
            connection.release() // return the connection to pool
            if (!err) {
                res.send(`Cat with the record ID ${[req.params.id]} has been removed.`)
            } else {
                console.log(err)
            }
            
            console.log('The data from cats table are: \n', rows)
        })
    })
});
   

   

//PORT ENVIRONMENT VARIABLE
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}..`));