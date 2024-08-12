SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;

-- Create Memberships table
CREATE TABLE Memberships (
  membership_id INT AUTO_INCREMENT PRIMARY KEY,
  membership_type VARCHAR(300) NOT NULL,
  membership_discount DECIMAL(5,2) NOT NULL
);

-- Insert values into Memberships
INSERT INTO Memberships (membership_type, membership_discount)
VALUES
  ('Standard', 5.00),
  ('Premium', 25.00),
  ('Deluxe', 50.00);

-- Create Customers table
CREATE TABLE Customers (
  customer_id INT AUTO_INCREMENT PRIMARY KEY,
  customer_name VARCHAR(300) NOT NULL,
  phone_number VARCHAR(14),
  membership_id INT,
  FOREIGN KEY (membership_id) REFERENCES Memberships(membership_id) ON DELETE SET NULL,
  CONSTRAINT unique_phone_number UNIQUE (phone_number) -- Ensuring unique phone numbers
);

-- Insert values into Customers
INSERT INTO Customers (customer_name, phone_number, membership_id)
VALUES
  ('John Doe', '123-456-7890', 1),
  ('Jane Smith', '987-654-3210', 2),
  ('Alice Johnson', '555-555-5555', 2),
  ('Bob Brown', '222-222-2222', 1),
  ('Carol White', '111-222-3333', 1);

-- Create Payments table
CREATE TABLE Payments (
  payment_id INT AUTO_INCREMENT PRIMARY KEY,
  payment_date DATE NOT NULL,
  payment_amount DECIMAL(19,2) NOT NULL CHECK (payment_amount >= 0), -- Ensure positive payment amounts
  payment_method VARCHAR(45) NOT NULL,
  payment_status VARCHAR(45)
);

-- Insert values into Payments
INSERT INTO Payments (payment_date, payment_amount, payment_method, payment_status)
VALUES
  ('2024-06-07', 5.99, 'Credit Card', 'Completed'),
  ('2024-06-12', 3.99, 'Credit Card', 'Completed'),
  ('2024-06-17', 4.99, 'Cash', 'Completed'),
  ('2024-06-09', 13.98, 'Debit Card', 'Completed'),
  ('2024-06-12', 7.99, 'Credit Card', 'Completed');

-- Create Movies table
CREATE TABLE Movies (
  movie_id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(300) NOT NULL,
  genre VARCHAR(45),
  release_date DATE,
  price DECIMAL(19,2) NOT NULL CHECK (price >= 0), -- Ensure positive prices
  amount INT NOT NULL DEFAULT 0 CHECK (amount >= 0) -- Ensure non-negative inventory amounts
);

-- Insert values into Movies
INSERT INTO Movies (title, genre, release_date, price, amount)
VALUES
  ('Inception', 'Sci-Fi', '2010-07-16', 5.99, 10),
  ('The Matrix', 'Sci-Fi', '1999-03-31', 3.99, 5),
  ('Interstellar', 'Sci-Fi', '2014-11-07', 4.99, 7),
  ('The Godfather', 'Crime', '1972-03-24', 6.99, 4),
  ('Pulp Fiction', 'Crime', '1994-10-14', 7.99, 6),
  ('They Shoot Horses Dont They', 'Drama', '1969-12-10', 6.99, 5);

-- Create Rentals table
-- This table serves as the junction table for the M:M relationship between Customers and Movies
CREATE TABLE Rentals (
  rental_id INT AUTO_INCREMENT PRIMARY KEY,
  start_date DATE NOT NULL,
  due_date DATE NOT NULL,
  date_returned DATE,
  payment_id INT,
  customer_id INT,
  movie_id INT,
  FOREIGN KEY (payment_id) REFERENCES Payments(payment_id) ON DELETE SET NULL,
  FOREIGN KEY (customer_id) REFERENCES Customers(customer_id) ON DELETE SET NULL,
  FOREIGN KEY (movie_id) REFERENCES Movies(movie_id) ON DELETE SET NULL
);

-- Insert values into Rentals
INSERT INTO Rentals (start_date, due_date, date_returned, payment_id, customer_id, movie_id)
VALUES
  ('2024-06-01', '2024-06-08', '2024-06-07', 1, 1, 1),
  ('2024-06-05', '2024-06-12', NULL, 2, 2, 2),
  ('2024-06-03', '2024-06-17', NULL, 3, 3, 3),
  ('2024-06-03', '2024-06-17', '2024-06-09', 4, 4, 6),
  ('2024-06-03', '2024-06-10', '2024-06-09', 4, 4, 4),
  ('2024-06-06', '2024-06-13', '2024-06-12', 5, 5, 5);

-- Enable foreign key check
SET FOREIGN_KEY_CHECKS=1;

-- Commit the transaction
COMMIT;