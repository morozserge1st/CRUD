const express = require('express');
const app = express();
const db = require('./database.js');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const HOST_PORT = 5000;
app.listen(HOST_PORT, () => {
  console.log('Сервер запущен на ' + HOST_PORT);
});

app.get('/api/v1/users', (req, res) => {
  db.serialize(() => { 
    const sql = 'SELECT * FROM users';
    const params = [];

    db.all(sql, params, (err, rows) => {
      if (err) {
        res.status(400).json({"error":err.message});
        return;
      }
      res.json({
        "message":"success",
        "data":rows
      });
    });   
  });
});

app.post('/api/v1/user/', (req, res) => {
  const data = {
    name: req.body.name,
    email: req.body.email,
    dob : req.body.dob
  }
  
  db.serialize(() => {
    const sql ='INSERT INTO users (name, email, dob) VALUES (?,?,?)';
    const params = [data.name, data.email, data.dob];

    db.run(sql, params, (err) => {
      if (err){
        res.status(400).json({"error": err.message});
        return;
      }
      res.json({
        "message": "success",
        "data": data,
        "id" : this.lastID
      });
    });
  });
});

// Delete
app.delete('/api/v1/user/:id', (req, res) => {
  db.serialize(() => {
    const sql = 'DELETE FROM users WHERE id=?;';
    const params = [req.params.id];
    
    db.run(sql, params, (err) => {
      if (err) {
          res.status(400).json({"error": res.message});
          return;
      }
      res.json({"message":"deleted", rows: this.changes});
    });
  });
});

// Update
app.get('/api/v1/user/:id', (req, res) => {
  db.serialize(() => { 
    const sql = 'SELECT * FROM users WHERE id=?';
    const params = [req.params.id];

    db.get(sql, params, (err, row) => {
      if (err) {
        res.status(400).json({"error":err.message});
        return;
      }
      res.json({
        "message":"success",
        "data":row
      });
    });
  });
});

app.patch("/api/v1/user/:id", (req, res) => {
  const data = {
    name: req.body.name,
    email: req.body.email,
    dob : req.body.dob
  }

  db.serialize(() => {
    const sql = `UPDATE users SET 
      name = coalesce(?,name), 
      email = COALESCE(?,email), 
      dob = coalesce(?,dob) 
      WHERE id = ?`;
    const params = [data.name, data.email, data.password, req.params.id];

    db.run(sql, params, (err) => {
      if (err) {
        res.status(400).json({"error": res.message});
        return;
      }
      res.json({
        message: "success",
        data: data
      });
    });
  });
});

// Path route
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
