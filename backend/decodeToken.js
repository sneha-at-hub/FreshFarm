import jwt from 'jsonwebtoken';

// Sample JWT token received after admin login
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IkhhcmkiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE3MTQ4MzY5MzZ9.zrLW0HT3qiTNKUbrpncAU3JvMwMHKlQv4babZHno9Vk';

// JWT secret key (make sure it matches the one used for signing the token)
const JWT_SECRET = 'your_secret_key';

// Verify the JWT token and decode its payload
jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
        console.error('Failed to verify token:', err);
        // Handle error
    } else {
        // Check if the decoded token indicates admin privileges
        if (decoded.isAdmin) {
            // If isAdmin is true, it's an admin user
            console.log('Admin details:', decoded);
        } else {
            console.log('This token does not belong to an admin.');
        }
    }
});