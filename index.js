/*
Example api demo with cats
*/
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
  }

const express = require('express'); 
const app = express();
app.use(express.json())
const query = require('./db/cats.js');



app.get('/api/', function (req, res) {
    res.json({ message: "Hello from cat api!"});
});

// GET
app.get('/api/cats', query.getCats);
app.get('/api/cats/:id',query.getCatById);

// POST
 app.post('/api/cats/add', query.createCat);

// PUT   
app.put('/api/cats/:id', query.updateCat);

// DELETE
app.delete('/api/cats/:id', query.deleteCat);
      

app.listen(process.env.PORT || 3000, () => {
    console.log('Listening...');
});