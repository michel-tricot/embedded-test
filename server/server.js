require('dotenv').config();

const express = require('express');
const path = require('path');
// Use in-memory database for Vercel deployment, SQLite for local development
const db = process.env.VERCEL ? require('./db-vercel') : require('./db');
const api = require('./airbyte_api');
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
// Middleware to parse cookies
app.use(cookieParser());

// Serve static files from the static directory (no password protection)
app.use(express.static(path.join(__dirname, 'static')));

// Route for the root path (no password protection)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'static/index.html'));
});

// Password protection middleware for API routes
function requirePasswordForAPI(req, res, next) {
    // Skip password check for login endpoint
    if (req.path === '/api/login') {
        return next();
    }

    // Only apply password protection to API routes
    if (req.path.startsWith('/api/')) {
        const isAuthenticated = req.cookies.appPassword === process.env.SONAR_WEBAPP_PASSWORD;
        if (!isAuthenticated) {
            return res.status(401).json({ error: 'Password required' });
        }
    }

    // Set user if authenticated
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
}

// Apply password protection to API routes
app.use(requirePasswordForAPI);

// Endpoint to handle login
app.post('/api/login', (req, res) => {
    const { password } = req.body;

    if (password === process.env.SONAR_WEBAPP_PASSWORD) {
        res.cookie('appPassword', password, {
            maxAge: 24 * 60 * 60 * 1000, // 24 hours
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        });
        res.json({ success: true });
    } else {
        res.status(401).json({ error: 'Invalid password' });
    }
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

        const newUser = db.addUser(email);
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

// Endpoint to generate a widget token that will be passed to the widget in the web app
app.post('/api/airbyte/token', async (req, res) => {
    // Check if user is authenticated
    if (!req.user) {
        return res.status(401).json({ error: 'User not authenticated' });
    }

    try {
        const widgetToken = await api.generateWidgetToken(req.user.email);
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
    console.log('SONAR_ALLOWED_ORIGIN:', process.env.SONAR_ALLOWED_ORIGIN);
    console.log('SONAR_AIRBYTE_ORGANIZATION_ID:', process.env.SONAR_AIRBYTE_ORGANIZATION_ID);
    console.log('SONAR_AIRBYTE_CLIENT_ID:', process.env.SONAR_AIRBYTE_CLIENT_ID ? '***' : 'not set');
    console.log('SONAR_AIRBYTE_CLIENT_SECRET:', process.env.SONAR_AIRBYTE_CLIENT_SECRET ? '***' : 'not set');
    console.log('SONAR_AWS_ACCESS_KEY:', process.env.SONAR_AWS_ACCESS_KEY ? '***' : 'not set');
    console.log('SONAR_AWS_SECRET_ACCESS_KEY:', process.env.SONAR_AWS_SECRET_ACCESS_KEY ? '***' : 'not set');
    console.log('SONAR_S3_BUCKET:', process.env.SONAR_S3_BUCKET);
    console.log('SONAR_S3_BUCKET_REGION:', process.env.SONAR_S3_BUCKET_REGION);
    console.log('SONAR_S3_BUCKET_PREFIX:', process.env.SONAR_S3_BUCKET_PREFIX);
});
