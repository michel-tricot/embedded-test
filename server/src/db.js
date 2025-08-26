const fs = require('node:fs');

const db = {
    filePath: 'users.db',

    read: () => {
        try {
            const data = fs.readFileSync(this.filePath, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            if (error.code === 'ENOENT') {
                // File doesn't exist, return empty array
                return [];
            }
            throw error;
        }
    },

    write: (data) => {
        fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2));
    },

    findUser: (email) => {
        const users = this.read();
        return users.find(user => user.email === email);
    },

    addUser: (email) => {
        const users = this.read();

        // Check if user already exists
        if (users.some(user => user.email === email)) {
            throw new Error('Email already exists');
        }

        const newUser = {
            email
        };
        users.push(newUser);
        this.write(users);
        return newUser;
    },

};

module.exports = db;

const db = {
    users: new Map(),

    findUser: (email) => {
        return this.users.get(email);
    },

    addUser: (email) => {
        if (this.users.has(email)) {
            throw new Error('Email already exists');
        }

        const user = {
            email,
            created_at: new Date().toISOString()
        };

        this.users.set(email, user);
        return user;
    },
}

module.exports = {
    findUser,
    addUser,
};