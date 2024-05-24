const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Secret key for JWT
const JWT_SECRET = 'your_secret_key';

// Dummy database (replace with your database)
const users = [
    { id: 1, email: 'user@example.com', passwordHash: '$2b$10$zjDQ26r7JVtgy.V1ddXrZem/DIjS0FQxBvFYX6AdKQrmv8vR2CZx6', role: 'user' }, // Password: password
    { id: 2, email: 'admin@example.com', passwordHash: '$2b$10$zjDQ26r7JVtgy.V1ddXrZem/DIjS0FQxBvFYX6AdKQrmv8vR2CZx6', role: 'admin' }, // Password: password
];

// Middleware to authenticate JWT token
function authenticateToken(req, res, next) {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized: Missing token' });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Forbidden: Invalid token' });
        }
        req.user = user;
        next();
    });
}

// Login route
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Find user by email
    const user = users.find(user => user.email === email);
    if (!user) {
        return res.status(401).json({ error: 'Unauthorized: Invalid email or password' });
    }

    // Validate password
    bcrypt.compare(password, user.passwordHash, (err, result) => {
        if (err || !result) {
            return res.status(401).json({ error: 'Unauthorized: Invalid email or password' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    });
});

// Protected route example
app.get('/protected-route', authenticateToken, (req, res) => {
    res.json({ message: 'This route is protected', user: req.user });
});

// Admin-only route example
app.get('/admin-only-route', authenticateToken, (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Forbidden: Admin access required' });
    }
    res.json({ message: 'Admin-only route', user: req.user });
});

const port = process.env.PORT || 8081;
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
