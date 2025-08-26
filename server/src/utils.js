const db = require("./db");


// Helper function to set authentication cookie
function setAuthCookie(res, email) {
    res.cookie('userEmail', email, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
    });
}

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

module.exports = {
    requirePasswordForAPI,
    setAuthCookie,
};
