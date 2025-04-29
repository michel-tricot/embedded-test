require('dotenv').config();

const express = require('express');
const path = require('path');
const db = require('./db');
const api = require('./api');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from the static directory
app.use(express.static(path.join(__dirname, '../static')));

// Route for the root path
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../static/index.html'));
});

// Endpoint to create a new user
app.post('/api/users', async (req, res) => {
    const { email } = req.body;
    
    // Validate input
    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    try {
        // Create a new workspace and destination
        const workspaceId = await api.createWorkspace(email);
        const destinationId = await api.createDestination(workspaceId);

        const newUser = db.addUser(email, workspaceId, destinationId);
        res.status(201).json(newUser);
    } catch (error) {
        if (error.message === 'Email already exists') {
            return res.status(400).json({ error: error.message });
        }
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Failed to create user' });
    }
});

// Endpoint to get a specific user
app.get('/api/users/:email', (req, res) => {
    const { email } = req.params;

    try {
        const user = db.findUser(email);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Error reading user:', error);
        res.status(500).json({ error: 'Failed to read user' });
    }
});

// Endpoint to create a widget token
// This endpoint should test that the user is actually authenticated.
app.post('/api/widgets/token', async (req, res) => {
    const { email, allowedOrigin } = req.body;
    
    // Validate input
    if (!email || !allowedOrigin) {
        return res.status(400).json({ error: 'email and allowedOrigin are required' });
    }

    try {
        const user = db.findUser(email);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const widgetToken = await api.generateWidgetToken(process.env.ORGANIZATION_ID, user.workspaceId, allowedOrigin);
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
    console.log('ORGANIZATION_ID:', process.env.ORGANIZATION_ID);
    console.log('CLIENT_ID:', process.env.CLIENT_ID ? '***' : 'not set');
    console.log('CLIENT_SECRET:', process.env.CLIENT_SECRET ? '***' : 'not set');
    console.log('AWS_ACCESS_KEY:', process.env.AWS_ACCESS_KEY ? '***' : 'not set');
    console.log('AWS_SECRET_ACCESS_KEY:', process.env.AWS_SECRET_ACCESS_KEY ? '***' : 'not set');
    console.log('S3_BUCKET:', process.env.S3_BUCKET);
    console.log('S3_BUCKET_REGION:', process.env.S3_BUCKET_REGION);
    console.log('S3_BUCKET_PREFIX:', process.env.S3_BUCKET_PREFIX);
}); 