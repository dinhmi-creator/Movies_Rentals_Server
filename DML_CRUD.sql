-- Data Manipulation Queries for the Movie Rental System

-- Insert a new customer
INSERT INTO Customers (customer_name, phone_number, membership_id)
VALUES ({{customer_name}}, {{phone_number}}, {{membership_id}});

-- Update a customer's membership
UPDATE Customers
SET membership_id = {{new_membership_id}}
WHERE customer_id = {{customer_id}};

-- Delete a customer
DELETE FROM Customers
WHERE customer_id = {{customer_id}};

-- Insert a new movie
INSERT INTO Movies (title, genre, release_date, price, amount)
VALUES ({{title}}, {{genre}}, {{release_date}}, {{price}}, {{amount}});

-- Update movie price
UPDATE Movies
SET price = {{new_price}}
WHERE movie_id = {{movie_id}};

-- Delete a movie
DELETE FROM Movies
WHERE movie_id = {{movie_id}};

-- Insert a new payment
INSERT INTO Payments (payment_date, payment_amount, payment_method, payment_status)
VALUES ({{payment_date}}, {{payment_amount}}, {{payment_method}}, {{payment_status}});

-- Update payment status
UPDATE Payments
SET payment_status = {{new_payment_status}}
WHERE payment_id = {{payment_id}};

-- Delete a payment
DELETE FROM Payments
WHERE payment_id = {{payment_id}};

-- Insert a new rental
INSERT INTO Rentals (start_date, due_date, date_returned, payment_id, customer_id, movie_id)
VALUES ({{start_date}}, {{due_date}}, {{date_returned}}, {{payment_id}}, {{customer_id}}, {{movie_id}});

-- Update rental return date
UPDATE Rentals
SET date_returned = {{date_returned}}
WHERE rental_id = {{rental_id}};

-- Delete a rental
DELETE FROM Rentals
WHERE rental_id = {{rental_id}};

-- Fetch all movies
SELECT * FROM Movies;

-- Fetch all customers
SELECT * FROM Customers;

-- Fetch all rentals for a customer
SELECT * FROM Rentals
WHERE customer_id = {{customer_id}};

-- Fetch all payments for a customer
SELECT * FROM Payments
WHERE payment_id IN (
    SELECT payment_id
    FROM Rentals
    WHERE customer_id = {{customer_id}}
);

-- Fetch rental details for a specific rental
SELECT *
FROM Rentals
WHERE rental_id = {{rental_id}};

-- Fetch all movies rented by a specific customer
SELECT Movies.*
FROM Movies
JOIN Rentals ON Movies.movie_id = Rentals.movie_id
WHERE Rentals.customer_id = {{customer_id}};

-- Fetch all customers who rented a specific movie
SELECT Customers.*
FROM Customers
JOIN Rentals ON Customers.customer_id = Rentals.customer_id
WHERE Rentals.movie_id = {{movie_id}};

-- Fetch all rentals for a specific movie
SELECT Rentals.*
FROM Rentals
WHERE movie_id = {{movie_id}};

-- Insert a new customer
INSERT INTO Customers (customer_name, phone_number, membership_id)
VALUES ({{customer_name}}, {{phone_number}}, {{membership_id}});

-- Update a customer's membership
UPDATE Customers
SET membership_id = {{new_membership_id}}
WHERE customer_id = {{customer_id}};

-- Delete a customer
DELETE FROM Customers
WHERE customer_id = {{customer_id}};

-- Insert a new movie
INSERT INTO Movies (title, genre, release_date, price, amount)
VALUES ({{title}}, {{genre}}, {{release_date}}, {{price}}, {{amount}});

-- Update movie price
UPDATE Movies
SET price = {{new_price}}
WHERE movie_id = {{movie_id}};

-- Delete a movie
DELETE FROM Movies
WHERE movie_id = {{movie_id}};

-- Insert a new payment
INSERT INTO Payments (payment_date, payment_amount, payment_method, payment_status)
VALUES ({{payment_date}}, {{payment_amount}}, {{payment_method}}, {{payment_status}});

-- Update payment status
UPDATE Payments
SET payment_status = {{new_payment_status}}
WHERE payment_id = {{payment_id}};

-- Delete a payment
DELETE FROM Payments
WHERE payment_id = {{payment_id}};

-- Insert a new rental
INSERT INTO Rentals (start_date, due_date, date_returned, payment_id, customer_id, movie_id)
VALUES ({{start_date}}, {{due_date}}, {{date_returned}}, {{payment_id}}, {{customer_id}}, {{movie_id}});

-- Update rental return date
UPDATE Rentals
SET date_returned = {{date_returned}}
WHERE rental_id = {{rental_id}};

-- Delete a rental
DELETE FROM Rentals
WHERE rental_id = {{rental_id}};

-- Fetch all movies
SELECT * FROM Movies;

-- Fetch all customers
SELECT * FROM Customers;

-- Fetch all rentals for a customer
SELECT *
FROM Rentals
WHERE customer_id = {{customer_id}};

-- Fetch all rentals for a specific movie
SELECT *
FROM Rentals
WHERE movie_id = {{movie_id}};

-- Fetch all payments for a customer
SELECT *
FROM Payments
WHERE payment_id IN (
    SELECT payment_id
    FROM Rentals
    WHERE customer_id = {{customer_id}}
);

-- Fetch rental details for a specific rental
SELECT *
FROM Rentals
WHERE rental_id = {{rental_id}};

-- Fetch all movies rented by a specific customer
SELECT Movies.*
FROM Movies
JOIN Rentals ON Movies.movie_id = Rentals.movie_id
WHERE Rentals.customer_id = {{customer_id}};

-- Fetch all customers who rented a specific movie
SELECT Customers.*
FROM Customers
JOIN Rentals ON Customers.customer_id = Rentals.customer_id
WHERE Rentals.movie_id = {{movie_id}};