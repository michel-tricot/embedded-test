// In-memory database for Vercel serverless deployment
// Note: Data will not persist between requests in production
// For production use, integrate with a database service like PlanetScale, Supabase, or MongoDB Atlas

let users = new Map();

function findUser(email) {
    return users.get(email);
}

function addUser(email) {
    if (users.has(email)) {
        throw new Error('Email already exists');
    }
    
    const user = {
        email,
        created_at: new Date().toISOString()
    };
    
    users.set(email, user);
    return user;
}

function listUsers() {
    return Array.from(users.values());
}

module.exports = {
    findUser,
    addUser,
    listUsers
};