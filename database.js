const sqlite3 = require('sqlite3').verbose();

const DBLINK = 'db.sqlite';

const db = new sqlite3.Database(DBLINK, sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
    throw err;
  } else {
    console.log('Connected to the database.');
    const sql = `CREATE TABLE users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name text, 
      email text, 
      dob text
      )`;
    db.run(sql, (err) => err);
  }
});

module.exports = db;
