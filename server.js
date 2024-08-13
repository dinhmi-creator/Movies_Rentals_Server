const express = require("express");
const bodyParser = require('body-parser');
const mysql = require("mysql");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(cors({
  origin: 'http://flip1.engr.oregonstate.edu:31025',
  methods: 'GET,POST,PUT,DELETE',
}));
app.use(express.json());

const db = mysql.createConnection({
  host: 'classmysql.engr.oregonstate.edu',

  user: 'cs340_dinhmi', 
  password: '1130',
  database: 'cs340_dinhmi',
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err.stack);
    return;
  }
  console.log("Connected to the database as id " + db.threadId);
});

// ------------------ Payments ------------------

// Get all payments or filter by payment_method
app.get("/api/payments", (req, res) => {
  const { payment_method } = req.query;
  let query = "SELECT * FROM Payments";
  const queryParams = [];

  if (payment_method) {
    query += " WHERE payment_method LIKE ?";
    queryParams.push(`%${payment_method}%`);
  }

  db.query(query, queryParams, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);
  });
});

// Get a specific payment by ID
app.get("/api/payments/:id", (req, res) => {
  const paymentId = req.params.id;
  db.query("SELECT * FROM Payments WHERE payment_id = ?", [paymentId], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results[0]);
  });
});

// Create a new payment
app.post("/api/payments", (req, res) => {
  const { payment_date, payment_amount, payment_method, payment_status } = req.body;
  db.query("INSERT INTO Payments (payment_date, payment_amount, payment_method, payment_status) VALUES (?, ?, ?, ?)",
    [payment_date, payment_amount, payment_method, payment_status], (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.json({ id: results.insertId });
    });
});

// Update a payment by ID
app.put("/api/payments/:id", (req, res) => {
  const paymentId = req.params.id;
  const { payment_date, payment_amount, payment_method, payment_status } = req.body;
  db.query("UPDATE Payments SET payment_date = ?, payment_amount = ?, payment_method = ?, payment_status = ? WHERE payment_id = ?",
    [payment_date, payment_amount, payment_method, payment_status, paymentId], (err) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.sendStatus(200);
    });
});

// Delete a payment by ID
app.delete("/api/payments/:id", (req, res) => {
  const paymentId = req.params.id;
  db.query("DELETE FROM Payments WHERE payment_id = ?", [paymentId], (err) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.sendStatus(200);
  });
});

// ------------------ Rentals ------------------

// Get all rentals or filter by rental_id, movie_id, or customer_id
app.get("/api/rentals", (req, res) => {
  const { rental_id, movie_id, customer_id } = req.query;
  let query = "SELECT * FROM Rentals";
  const queryParams = [];
  let conditions = [];

  if (rental_id) {
    conditions.push("rental_id = ?");
    queryParams.push(parseInt(rental_id, 10));
  }

  if (movie_id) {
    conditions.push("movie_id = ?");
    queryParams.push(parseInt(movie_id, 10));
  }

  if (customer_id) {
    conditions.push("customer_id = ?");
    queryParams.push(parseInt(customer_id, 10));
  }

  if (conditions.length > 0) {
    query += " WHERE " + conditions.join(" AND ");
  }

  db.query(query, queryParams, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);
  });
});

// Get a specific rental by ID
app.get("/api/rentals/:id", (req, res) => {
  const rentalId = req.params.id;
  db.query("SELECT * FROM Rentals WHERE rental_id = ?", [rentalId], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results[0]);
  });
});

// Create a new rental
app.post("/api/rentals", (req, res) => {
  const { start_date, due_date, date_returned, payment_id, customer_id, movie_id } = req.body;
  db.query("INSERT INTO Rentals (start_date, due_date, date_returned, payment_id, customer_id, movie_id) VALUES (?, ?, ?, ?, ?, ?)",
    [start_date, due_date, date_returned, payment_id, customer_id, movie_id], (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.json({ id: results.insertId });
    });
});

// Update a rental by ID
app.put("/api/rentals/:id", (req, res) => {
  const rentalId = req.params.id;
  const { start_date, due_date, date_returned, payment_id, customer_id, movie_id } = req.body;
  db.query("UPDATE Rentals SET start_date = ?, due_date = ?, date_returned = ?, payment_id = ?, customer_id = ?, movie_id = ? WHERE rental_id = ?",
    [start_date, due_date, date_returned, payment_id, customer_id, movie_id, rentalId], (err) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.sendStatus(200);
    });
});

// Delete a rental by ID
app.delete("/api/rentals/:id", (req, res) => {
  const rentalId = req.params.id;
  db.query("DELETE FROM Rentals WHERE rental_id = ?", [rentalId], (err) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.sendStatus(200);
  });
});

// ------------------ Movies ------------------

// Get all movies or filter by title and/or genre
app.get("/api/movies", (req, res) => {
  const { title, genre } = req.query;
  let query = "SELECT * FROM Movies";
  const queryParams = [];

  if (title) {
    query += queryParams.length ? " AND title LIKE ?" : " WHERE title LIKE ?";
    queryParams.push(`%${title}%`);
  }

  if (genre) {
    query += queryParams.length ? " AND genre LIKE ?" : " WHERE genre LIKE ?";
    queryParams.push(`%${genre}%`);
  }

  db.query(query, queryParams, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);
  });
});

// Get a specific movie by ID
app.get("/api/movies/:id", (req, res) => {
  const movieId = req.params.id;
  db.query("SELECT * FROM Movies WHERE movie_id = ?", [movieId], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results[0]);
  });
});

// Create a new movie
app.post("/api/movies", (req, res) => {
  const { title, genre, release_date, price, amount } = req.body;
  db.query("INSERT INTO Movies (title, genre, release_date, price, amount) VALUES (?, ?, ?, ?, ?)",
    [title, genre, release_date, price, amount], (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.json({ id: results.insertId });
    });
});

// Update a movie by ID
app.put("/api/movies/:id", (req, res) => {
  const movieId = req.params.id;
  const { title, genre, release_date, price, amount } = req.body;
  db.query("UPDATE Movies SET title = ?, genre = ?, release_date = ?, price = ?, amount = ? WHERE movie_id = ?",
    [title, genre, release_date, price, amount, movieId], (err) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.sendStatus(200);
    });
});

// Delete a movie by ID
app.delete("/api/movies/:id", (req, res) => {
  const movieId = req.params.id;
  db.query("DELETE FROM Movies WHERE movie_id = ?", [movieId], (err) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.sendStatus(200);
  });
});

// ------------------ Customers ------------------

// Get all customers or filter by customer_name
app.get("/api/customers", (req, res) => {
  const { customer_name } = req.query;
  let query = "SELECT * FROM Customers";
  const queryParams = [];

  if (customer_name) {
    query += " WHERE customer_name LIKE ?";
    queryParams.push(`%${customer_name}%`);
  }

  db.query(query, queryParams, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);
  });
});

// Get a specific customer by ID
app.get("/api/customers/:id", (req, res) => {
  const customerId = req.params.id;
  db.query("SELECT * FROM Customers WHERE customer_id = ?", [customerId], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results[0]);
  });
});

// Create a new customer
app.post("/api/customers", (req, res) => {
  const { customer_name, phone_number, membership_id } = req.body;
  db.query("INSERT INTO Customers (customer_name, phone_number, membership_id) VALUES (?, ?, ?)",
    [customer_name, phone_number, membership_id || null], (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.json({ id: results.insertId });
    });
});

// Update a customer by ID
app.put("/api/customers/:id", (req, res) => {
  const customerId = req.params.id;
  const { customer_name, phone_number, membership_id } = req.body;
  db.query("UPDATE Customers SET customer_name = ?, phone_number = ?, membership_id = ? WHERE customer_id = ?",
    [customer_name, phone_number, membership_id || null, customerId], (err) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.sendStatus(200);
    });
});

// Delete a customer by ID
app.delete("/api/customers/:id", (req, res) => {
  const customerId = req.params.id;
  db.query("DELETE FROM Customers WHERE customer_id = ?", [customerId], (err) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.sendStatus(200);
  });
});

// ------------------ Memberships ------------------

// Get all memberships
app.get("/api/memberships", (req, res) => {
  db.query("SELECT * FROM Memberships", (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);
  });
});

// Get a specific membership by ID
app.get("/api/memberships/:id", (req, res) => {
  const membershipId = req.params.id;
  db.query("SELECT * FROM Memberships WHERE membership_id = ?", [membershipId], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results[0]);
  });
});

// Create a new membership
app.post("/api/memberships", (req, res) => {
  const { membership_type, membership_discount } = req.body;
  db.query("INSERT INTO Memberships (membership_type, membership_discount) VALUES (?, ?)",
    [membership_type, membership_discount], (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.json({ id: results.insertId });
    });
});

// Update a membership by ID
app.put("/api/memberships/:id", (req, res) => {
  const membershipId = req.params.id;
  const { membership_type, membership_discount } = req.body;
  db.query("UPDATE Memberships SET membership_type = ?, membership_discount = ? WHERE membership_id = ?",
    [membership_type, membership_discount, membershipId], (err) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.sendStatus(200);
    });
});

// Delete a membership by ID
app.delete("/api/memberships/:id", (req, res) => {
  const membershipId = req.params.id;
  db.query("DELETE FROM Memberships WHERE membership_id = ?", [membershipId], (err) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.sendStatus(200);
  });
});

// Start the server
app.listen(30858, () => {
  console.log(`listening on port`);
});

