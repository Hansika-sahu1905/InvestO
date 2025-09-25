
CREATE DATABASE user_system;

USE user_system;


CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  date_of_birth DATE NOT NULL
);



CREATE TABLE sessions (
    id INT AUTO_INCREMENT PRIMARY KEY,        
    user_id INT,                            
    session_start TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    session_end TIMESTAMP,                  
    FOREIGN KEY (user_id) REFERENCES users(id) 
);
CREATE INDEX idx_username ON users(username);
CREATE INDEX idx_email ON users(email);

CREATE TABLE trip_details (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    current_location VARCHAR(255) NOT NULL,
    travel_date DATE NOT NULL,
    season VARCHAR(50) NOT NULL,
    budget DECIMAL(10,2) NOT NULL,
    selected_destination VARCHAR(255) NOT NULL,
    favorite BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);





