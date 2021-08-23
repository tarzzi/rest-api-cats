const express = require('express'); //Import Express
const app = express();
const mysql = require('mysql');
 
var pool = mysql.createPool({
    connectionLimit : 10,
    host: "localhost",
    user: "root",
    password: "kissa",
    database : "tarmocats"
  });
  

// Get all cats
app.get('', (req, res) => {
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

// CREATE
app.post('/', (req, res) => {
    return res.send('Received a POST HTTP method');
  });

// READ
app.get('/', (req, res) => {
    return res.send('Received a GET HTTP method');
  });

// UPDATE   
app.put('/', (req, res) => {
    return res.send('Received a PUT HTTP method');
  });

// DELETE
app.delete('/', (req, res) => {
    return res.send('Received a DELETE HTTP method');
  });
   

   


//PORT ENVIRONMENT VARIABLE
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}..`));