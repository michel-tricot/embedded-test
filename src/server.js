require('dotenv').config();

const express = require('express');
const path = require('path');
const db = require('./db');
const api = require('./api');
const app = express();
const port = 3000;
const cookieParser = require('cookie-parser');

// Helper function to set authentication cookie
function setAuthCookie(res, email) {
    res.cookie('userEmail', email, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
    });
}

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cookieParser());

// Middleware to read user from cookie
app.use((req, res, next) => {
    const userEmail = req.cookies.userEmail;
    if (userEmail) {
        try {
            const user = db.findUser(decodeURIComponent(userEmail));
            if (user) {
                req.user = user;
            }
        } catch (error) {
            console.error('Error reading user from cookie:', error);
        }
    }
    next();
});

// Serve static files from the static directory
app.use(express.static(path.join(__dirname, '../static')));

// Route for the root path
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../static/index.html'));
});

// Endpoint to handle logout
app.post('/api/logout', (req, res) => {
    res.clearCookie('userEmail', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
    });
    res.json({ message: 'Logged out successfully' });
});

// Endpoint to create a new user
app.post('/api/users', async (req, res) => {
    const { email } = req.body;
    
    // Validate input
    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    try {
        // Check if user already exists
        const existingUser = db.findUser(email);
        if (existingUser) {
            setAuthCookie(res, email);
            return res.json(existingUser);
        }

        const newUser = db.addUser(email, workspaceId, destinationId);
        setAuthCookie(res, email);
        res.status(201).json(newUser);
    } catch (error) {
        if (error.message === 'Email already exists') {
            return res.status(400).json({ error: error.message });
        }
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Failed to create user' });
    }
});

// Endpoint to get current user information
app.get('/api/users/me', (req, res) => {
    if (!req.user) {
        return res.status(401).json({ error: 'Not authenticated' });
    }
    res.json(req.user);
});

// Endpoint to create a widget token
// This endpoint should test that the user is actually authenticated.
app.post('/api/airbyte/token', async (req, res) => {
    const { allowedOrigin } = req.body;
    
    // Validate input
    if (!allowedOrigin) {
        return res.status(400).json({ error: 'allowedOrigin is required' });
    }

    // Check if user is authenticated
    if (!req.user) {
        return res.status(401).json({ error: 'User not authenticated' });
    }

    try {
        const widgetToken = await api.generateWidgetToken(
            process.env.AIRBYTE_ORGANIZATION_ID, 
            req.user.email, 
            allowedOrigin
        );
        res.json({ token: widgetToken });
    } catch (error) {
        console.error('Error generating widget token:', error);
        res.status(500).json({ error: 'Failed to generate widget token' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    console.log('Environment variables loaded:');
    console.log('AIRBYTE_ORGANIZATION_ID:', process.env.AIRBYTE_ORGANIZATION_ID);
    console.log('AIRBYTE_CLIENT_ID:', process.env.AIRBYTE_CLIENT_ID ? '***' : 'not set');
    console.log('AIRBYTE_CLIENT_SECRET:', process.env.AIRBYTE_CLIENT_SECRET ? '***' : 'not set');
    console.log('AWS_ACCESS_KEY:', process.env.AWS_ACCESS_KEY ? '***' : 'not set');
    console.log('AWS_SECRET_ACCESS_KEY:', process.env.AWS_SECRET_ACCESS_KEY ? '***' : 'not set');
    console.log('S3_BUCKET:', process.env.S3_BUCKET);
    console.log('S3_BUCKET_REGION:', process.env.S3_BUCKET_REGION);
    console.log('S3_BUCKET_PREFIX:', process.env.S3_BUCKET_PREFIX);
});
