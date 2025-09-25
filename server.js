const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const app = express();

const connection = mysql.createConnection({
  host: 'your-host',
  user: 'your-username',
  password: 'your-password',
  database: 'your-db-name'
});


connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to MySQL database.');
});

app.use(express.json());
app.use(cors());


app.post('/register', (req, res) => {
  const { username, password, email, date_of_birth, name } = req.body;

  bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
    if (err) {
      console.error('Error hashing password:', err);
      return res.status(500).json({ message: 'Error processing request' });
    }

    const query = 'INSERT INTO users (username, password_hash, email, date_of_birth, name) VALUES (?, ?, ?, ?,?)';
    connection.query(query, [username, hashedPassword, email, date_of_birth, name], (err) => {
      if (err) {
        console.error('Error registering user:', err);
        return res.status(500).json({ message: 'Error processing request' });
      }

      res.status(200).json({ message: 'User registered successfully' });
    });
  });
});


app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const query = 'SELECT * FROM users WHERE username = ?';
    connection.query(query, [username], (err, results) => {
        if (err) {
            console.error('Error fetching user:', err);
            return res.status(500).json({ message: 'Error processing request' });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        const user = results[0];
        
        bcrypt.compare(password, user.password_hash, (err, isMatch) => {
            if (err) {
                console.error('Error comparing password:', err);
                return res.status(500).json({ message: 'Error processing request' });
            }

            if (!isMatch) {
                return res.status(401).json({ message: 'Invalid password' });
            }

            res.status(200).json({ 
                message: 'Login successful',
                user: {
                    username: user.username,
                    name: user.name,
                    email: user.email,
                    date_of_birth: user.date_of_birth
                }
            });
        });
    });
});


app.get('/users', (req, res) => {
  const query = 'SELECT * FROM users';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching users:', err);
      return res.status(500).json({ message: 'Error fetching users' });
    }
    res.status(200).json(results);
  });
});


app.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  const query = 'SELECT * FROM users WHERE id = ?';
  connection.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Error fetching user:', err);
      return res.status(500).json({ message: 'Error fetching user' });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(results[0]);
  });
});

app.listen(3001, () => {
  console.log('Server is running on http://localhost:3001');
});
