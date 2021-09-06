/*
Example api demo with cats
*/
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
  }

const express = require('express'); 
const app = express();
app.use(express.json())
const mysql = require('mysql');
 
var pool = mysql.createPool({
    connectionLimit : 10,
    host: process.env.DB_HOST,
    port: process.env.PORT,
    user: process.env.DB_USER,
    password: process.env.PASSWD,
    database : process.env.DB_NAME
  });

  app.get('/api/', function (req, res) {
    res.send("Hello from cat api root!");
  });

// CREATE
 app.post('/api/cats/add', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        const { id, name, age, imgsrc } = req.body
        connection.query('INSERT INTO cat SET name=?, age=?, imgsrc=?', [name, age, imgsrc, id], (err, rows) => {
            connection.release() // return the connection to pool
            if (!err) {
                res.send(JSON.stringify(rows))
            } else {
                console.log(err)
            }
        })
        connection.release();
    })
});

// READ
// Get all cats
app.get('/api/cats', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log('connected as id ' + connection.threadId)
        connection.query('SELECT * from cat', (err, rows) => {
            connection.release() 

            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }
        })
        connection.release();
    })
})
// Get cat by id
app.get('/api/cats/:id', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        connection.query('SELECT * FROM cat WHERE id = ?', [req.params.id], (err, rows) => {
            connection.release() 
            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }
        })
        connection.release();
    })
});

// UPDATE   
app.put('/api/cats/:id', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)

        const { id, name, age, imgsrc } = req.body

        connection.query('UPDATE cat SET name = ?, age = ?, imgsrc = ? WHERE id = ?', [name, age, imgsrc, id] , (err, rows) => {
            connection.release() 

            if(!err) {
                res.send(`Cat with the id: ${id} has been updated.`)
            } else {
                console.log(err)
            }

        })
        connection.release();
    })
})

// DELETE
app.delete('/api/cats/:id', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        connection.query('DELETE FROM cat WHERE id = ?', [req.params.id], (err, rows) => {
            connection.release()
            if (!err) {
                res.send(`Cat with the record ID ${[req.params.id]} has been removed.`)
            } else {
                console.log(err)
            }
        })
        connection.release();
    })
});
      

//PORT ENVIRONMENT VARIABLE
app.listen();