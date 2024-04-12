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
});

let memberListDB = new sqlite3.Database('members.db', (err) => {
    if(err){
        console.log(err.message);
    }
    console.log('connected to member list database')
});

let adminDB = new sqlite3.Database('adminpass.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('connected to the admin database');
});

let adminListDB = new sqlite3.Database('admins.db', (err) => {
    if(err){
        console.log(err.message);
    }
    console.log('connected to admin list database')
})

let coachDB = new sqlite3.Database('coachpass.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('connected to the coach database');
});

let coachListDB = new sqlite3.Database('coaches.db', (err) => {
    if(err){
        console.log(err.message);
    }
    console.log('connected to coach list database')
})

let messagesDB = new sqlite3.Database('messages.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the messages database');
});

let memberManageDB = new sqlite3.Database('membermanage.db', (err) => {
    if(err){
        console.log(err.message);
    }
    console.log('connected to member management database')
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

app.get('/member-list', (req, res) => {
    memberListDB.all('SELECT * FROM members', (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).send({ error: 'An error occurred while fetching member list' });
        } else {
            res.send(rows); // Send the messages as JSON response
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

app.get('/admin-list', (req, res) => {
    adminListDB.all('SELECT * FROM admins', (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).send({ error: 'An error occurred while fetching admin list' });
        } else {
            res.send(rows); // Send the messages as JSON response
        }
    });
});

app.post('/validate-coach-password', async (req, res) => {
    const { username, password } = req.body;

    coachDB.all(`SELECT * FROM coachpass WHERE username = '${username}' AND password = '${password}'`, (err, rows) => {
        if (err) {
            console.error(err);
            res.status(500).send({ error: 'An error occurred while processing your request' });
        } else {
            if (rows.length > 0) {
                res.send({ validation: 'coach' });
            } else {
                res.send({ validation: false });
            }
        }
    });
});

app.get('/coach-list', (req, res) => {
    coachListDB.all('SELECT * FROM coaches', (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).send({ error: 'An error occurred while fetching coach list' });
        } else {
            res.send(rows); // Send the messages as JSON response
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

    const checkCoach = new Promise((resolve, reject) => {
        coachDB.all(`SELECT * FROM coachpass WHERE username = ?`, [username], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });

    Promise.all([checkMember, checkAdmin, checkCoach])
        .then(([memberRows, adminRows, coachRows]) => {
            if (memberRows.length > 0 || adminRows.length > 0 || coachRows.length > 0) {
                // Username already exists, send error response
                res.status(400).send({ error: 'Username already taken.' });
            } else {
                // Choose the appropriate database based on role
                let loginDB;
                let listDB;
                switch (role) {
                    case 'member':
                        loginDB = memberDB;
                        listDB = memberListDB;
                        break;
                    case 'admin':
                        loginDB = adminDB;
                        listDB = adminListDB;
                        break;
                    case 'coach':
                        loginDB = coachDB;
                        listDB = coachListDB;
                        break;
                    default:
                        res.status(400).send({ error: 'Invalid role specified' });
                        return; // Exit the function early if the role is not recognized
                }

                // Insert the user data into the selected loginDB
                loginDB.run(`INSERT INTO ${role}pass (username, password) VALUES (?, ?)`,
                    [username, password], (err) => {
                        if (err) {
                            console.error(err.message);
                            res.status(500).send({ error: 'An error occurred while processing your request' });
                        } else {
                            console.log(`New ${role} registered: ${username}`);
                            // Send success response after inserting data into login database
                            res.sendStatus(200);
                        }
                    });

                // Insert the user data into the listDB
                listDB.run(`INSERT INTO ${role}s (first, last, email, username, password) VALUES (?, ?, ?, ?, ?)`,
                    [firstName, lastName, email, username, password], (err) => {
                        if (err) {
                            console.error(err.message);
                            res.status(500).send({ error: 'An error occurred while processing your request' });
                        } else {
                            console.log(`New ${role} added to database: ${firstName} ${lastName}`);
                            // No need to send another response here
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
    const { sender, name, attendance, paid, email } = req.body;

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

app.get('/member-management-list', (req, res) => {
    memberManageDB.all('SELECT * FROM membermanage', (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).send({ error: 'An error occurred while fetching member management list' });
        } else {
            res.send(rows); // Send the messages as JSON response
        }
    });
});

app.post('/member-management-list', (req, res) => {
    const { name, attendance, paid, email } = req.body;

    memberManageDB.run(`INSERT INTO membermanage (name, attendance, paid, email) VALUES (?, ?, ?, ?)`, [name, attendance, paid, email], (err) => {
        if (err) {
            console.error(err.message);
            res.status(500).send({ error: 'An error occurred while processing your request' });
        } else {
            console.log(`New member ${name} added to the management database`);
            res.sendStatus(200); // Send success response
        }
    });
});

app.delete('/member-management-list/:name/:email', (req, res) => {
    const { name, email } = req.params;
    memberManageDB.run(`DELETE FROM membermanage WHERE name = ? AND email = ?`, [name, email], (err) => {
        if (err) {
            console.error(err.message);
            res.status(500).send({ error: 'An error occurred while deleting the member' });
        } else {
            console.log(`Member with name ${name} and email ${email} deleted from the database`);
            res.sendStatus(200); // Send success response
        }
    });
});


app.listen(3001, ()=>console.log('listening at port 3001'))