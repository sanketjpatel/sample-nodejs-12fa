const sleep = require('sleep');
require('log-timestamp');
const express = require('express');
const bodyParser = require('body-parser');
const mongo = require('mongodb');
const mongoClient = mongo.MongoClient;

const app = express();
app.use(bodyParser.json());
console.log('App started!');

let mongoHost = process.env.MONGO_HOST;
let mongoPort = process.env.MONGO_PORT;
let dbName = process.env.MONGO_DB_NAME;

if (!mongoHost) {
    mongoHost = '127.0.0.1'
    console.log('MONGO_HOST not specified, using default mongoHost 127.0.0.1');
}

let url = `mongodb://${mongoHost}:${mongoPort}`;
let db;

let maxAttempts = 20;
let isConnected = false;
for (let attempt = 1; attempt <= maxAttempts && !isConnected; attempt++) {
    mongoClient.connect(url, (err, client) => {
        if (err) {
            console.log('Unable to connect to the database, retrying');
        } else {
            db = client.db(dbName);
            console.log("Database connected");
            isConnected = true;
            return;
        }
    });
    sleep.sleep(attempt);
}

function getRootResponse(req) {
    return ' <h1>Hello World!</h1><p>This is a simple response to a <b>GET</b> request on the base path</p>\n';
}

console.log('Registering routes');
app.get('/', (req, res) => {
    console.log(`Received a GET request on ${req.path} from ${req.hostname}`);
    res.send(getRootResponse(req));
    console.log(`Response sent for GET ${req.path} to ${req.hostname}`);
});

app.get('/users', (req, res) => {
    console.log(`Received a GET request on ${req.path} from ${req.hostname}`);

    let allUsers = db.users;
    res.send(allUsers);
    console.log(`Response sent for GET ${req.path} to ${req.hostname}`);
});

app.post('/users', (req, res) => {
    console.log(`Received a POST request on ${req.path} from ${req.hostname}`);
    
    res.send('Success!');
    console.log(`Response sent for POST ${req.path} to ${req.hostname}`);
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));
