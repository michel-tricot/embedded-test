
// Use Redis if running on Vercel otherwise store the user list on the local storage
if (!process.env.VERCEL_URL) {
    const fs = require('node:fs').promises;

    const db = {
        filePath: 'users.db',

        read: async () => {
            try {
                const data = await fs.readFile(db.filePath, 'utf8');
                return JSON.parse(data);
            } catch (error) {
                if (error.code === 'ENOENT') {
                    // File doesn't exist, return empty array
                    return [];
                }
                throw error;
            }
        },

        write: async (data) => {
            await fs.writeFile(db.filePath, JSON.stringify(data, null, 2));
        },

        findUser: async (email) => {
            const users = await db.read();
            return users.find(user => user.email === email);
        },

        addUser: async (email) => {
            const users = await db.read();

            // Check if user already exists
            if (users.some(user => user.email === email)) {
                throw new Error('Email already exists');
            }

            const newUser = {
                email
            };
            users.push(newUser);
            await db.write(users);
            return newUser;
        },

    };

    module.exports = {
        findUser: db.findUser,
        addUser: db.addUser,
    };
} else {
    const { createClient } = require('redis');

    const client = createClient({
        url: process.env.SONAR_VERCEL_REDIS_URL
    });

    let isConnected = false;

    client.on('error', (err) => {
        console.log('Redis Client Error', err);
        isConnected = false;
    });

    const ensureConnection = async () => {
        if (!isConnected) {
            await client.connect();
            isConnected = true;
        }
    };

    const db = {
        findUser: async (email) => {
            await ensureConnection();
            const userData = await client.get(`user:${email}`);
            return userData ? JSON.parse(userData) : null;
        },

        addUser: async (email) => {
            await ensureConnection();
            const exists = await client.exists(`user:${email}`);
            if (exists) {
                throw new Error('Email already exists');
            }

            const user = {
                email,
                created_at: new Date().toISOString()
            };

            await client.set(`user:${email}`, JSON.stringify(user));
            return user;
        },
    };

    module.exports = {
        findUser: db.findUser,
        addUser: db.addUser,
    };
}
