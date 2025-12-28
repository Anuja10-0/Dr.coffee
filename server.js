const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files (CSS, JS, images) from your project folder
app.use(express.static(path.join(__dirname, 'public')));

// ================= DATABASE CONNECTION =================
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",        // XAMPP default
  database: "drcoffee",
  port: 3306           // change to 3307 ONLY if MySQL uses 3307
});

// Connect to database
db.connect(err => {
  if (err) {
    console.error("❌ Database connection failed");
    console.error(err);
    return;
  }
  console.log("✅ Database connected");
});

// ================= SERVE HTML PAGE =================
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// ================= BOOK TABLE ROUTE =================
app.post("/book-table", (req, res) => {
  console.log("📩 Form data received:", req.body);
de
  const { firstName, lastName, email, phone, date } = req.body;

  // Validation
  if (!firstName || !lastName || !email || !phone || !date) {
    return res.status(400).send("All fields are required");
  }

  const sql = `
    INSERT INTO bookings 
    (first_name, last_name, email, phone, booking_date)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(sql, [firstName, lastName, email, phone, date], (err, result) => {
    if (err) {
      console.error("❌ Error inserting data:", err);
      return res.status(500).send("Error saving data");
    }

    console.log("✅ Data inserted, ID:", result.insertId);
    
  
   
  });
});

// ================= START SERVER =================
app.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000");
  console.log("📝 Visit: http://localhost:3000");
});



