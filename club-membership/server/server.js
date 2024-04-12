const express = require('express')
const app = express()
const cors = require('cors')
const sqlite3 = require('sqlite3').verbose();

app.use(cors())
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
});
app.use(express.json({limit:'10mb'}))

let memberDB = new sqlite3.Database('memberpass.db', (err) => {
    if(err){
        console.log(err.message);
    }
    console.log('connected to member database')
})

let adminDB = new sqlite3.Database('adminpass.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('connected to the admin database');
});

let messagesDB = new sqlite3.Database('messages.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the messages database');
});

// Endpoint for member login
app.post('/validate-member-password', async (req, res) => {
    const { username, password } = req.body;

    memberDB.all(`SELECT * FROM memberpass WHERE username = '${username}' AND password = '${password}'`, (err, rows) => {
        if (err) {
            console.error(err);
            res.status(500).send({ error: 'An error occurred while processing your request' });
        } else {
            if (rows.length > 0) {
                res.send({ validation: 'member' });
            } else {
                res.send({ validation: false });
            }
        }
    });
});

// Endpoint for admin login
app.post('/validate-admin-password', async (req, res) => {
    const { username, password } = req.body;

    adminDB.all(`SELECT * FROM adminpass WHERE username = '${username}' AND password = '${password}'`, (err, rows) => {
        if (err) {
            console.error(err);
            res.status(500).send({ error: 'An error occurred while processing your request' });
        } else {
            if (rows.length > 0) {
                res.send({ validation: 'admin' });
            } else {
                res.send({ validation: false });
            }
        }
    });
});

// Registration endpoint
app.post('/register', (req, res) => {
    const { firstName, lastName, email, username, password, role } = req.body;

    // Check if the username already exists in both member and admin databases
    const checkMember = new Promise((resolve, reject) => {
        memberDB.all(`SELECT * FROM memberpass WHERE username = ?`, [username], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });

    const checkAdmin = new Promise((resolve, reject) => {
        adminDB.all(`SELECT * FROM adminpass WHERE username = ?`, [username], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });

    Promise.all([checkMember, checkAdmin])
        .then(([memberRows, adminRows]) => {
            if (memberRows.length > 0 || adminRows.length > 0) {
                // Username already exists, send error response
                res.status(400).send({ error: 'Username already taken.' });
            } else {
                // Choose the appropriate database based on role
                const database = role === 'member' ? memberDB : adminDB;

                // Insert the user data into the selected database
                database.run(`INSERT INTO ${role}pass (username, password) VALUES (?, ?)`,
                    [username, password], (err) => {
                        if (err) {
                            console.error(err.message);
                            res.status(500).send({ error: 'An error occurred while processing your request' });
                        } else {
                            console.log(`New ${role} registered: ${username}`);
                            res.sendStatus(200); // Send success response
                        }
                    });
            }
        })
        .catch(error => {
            console.error(error);
            res.status(500).send({ error: 'An error occurred while processing your request' });
        });
});

app.get('/message-center', (req, res) => {
    // Query all messages from the database
    messagesDB.all('SELECT * FROM messages', (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).send({ error: 'An error occurred while fetching messages' });
        } else {
            res.send(rows); // Send the messages as JSON response
        }
    });
});


app.post('/message-center', (req, res) => {
    const { sender, message } = req.body;

    messagesDB.run(`INSERT INTO messages (sender, message) VALUES (?, ?)`, [sender, message], (err) => {
        if (err) {
            console.error(err.message);
            res.status(500).send({ error: 'An error occurred while processing your request' });
        } else {
            console.log(`New message from ${sender} added to the database`);
            res.sendStatus(200); // Send success response
        }
    });
});


app.listen(3001, ()=>console.log('listening at port 3001'))