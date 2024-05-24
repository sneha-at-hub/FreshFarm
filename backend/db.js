// db.js
const mysql = require('mysql');

// Function to establish database connection
function connectDB() {
  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "", // Enter your MySQL password
    database: "Signup"
  });

  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to database:', err);
      return;
    }
    console.log('Connected to MySQL database');
  });

  return connection;
}

module.exports = connectDB;
