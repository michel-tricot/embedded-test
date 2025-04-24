const fs = require('fs');

const db = {
    filePath: 'users.db',

    read: () => {
        try {
            const data = fs.readFileSync(db.filePath, 'utf8');
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
        fs.writeFileSync(db.filePath, JSON.stringify(data, null, 2));
    },

    findUser: (email) => {
        const users = db.read();
        return users.find(user => user.email === email);
    },

    addUser: (email) => {
        const users = db.read();
        
        // Check if user already exists
        if (users.some(user => user.email === email)) {
            throw new Error('Email already exists');
        }

        const newUser = { email };
        users.push(newUser);
        db.write(users);
        return newUser;
    }
};

module.exports = db; 