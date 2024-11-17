-- Create the users table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO users (username, password_hash, email) VALUES ('admin', 'password', 'admin@gmail.com');
-- Create the GetUserByUsername stored procedure
CREATE PROCEDURE GetUserByUsername(IN input_username VARCHAR(255))
BEGIN
    SELECT id, username, password_hash, email, created_at
    FROM users
    WHERE username = input_username;
END
