const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Anuja@2005",
  database: "coffee"
});

db.connect(err => {
  if (err) {
    console.log("DB Error:", err);
  } else {
    console.log("MySQL Connected");
  }
});

app.post("/reserve", (req, res) => {
  const { name, email, contact, table_no, date } = req.body;

  const sql = "INSERT INTO reservations (name, email, contact, table_no, date) VALUES (?, ?, ?, ?, ?)";

db.query(sql, [name, email, contact, table_no, date], (err) => {
  if (err) {
    console.log("FULL ERROR:", err);
    return res.send("Error ");
  }
  res.send("Booking Successful ");
});
});

app.listen(5000, () => {
  console.log("Server running on port 5000 ");
});
app.post("/order", (req, res) => {
  const { items, total } = req.body;

  console.log("DATA RECEIVED:", items, total); 

  const sql = "INSERT INTO orders (items, total) VALUES (?, ?)";

  db.query(sql, [items, total], (err) => {
    if (err) {
      console.log("SQL ERROR:", err);
      return res.send("Error");
    }
      res.send("Order Placed");
  });
});