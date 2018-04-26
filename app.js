require('log-timestamp');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

console.log('App started!');

let allUsers = [];
function getRootResponse(req){
    return ' <h1>Hello World!</h1><p>This is a simple response to a <b>GET</b> request on the base path</p>';
}

console.log('Registering routes');
app.get('/', (req, res) => {
    console.log(`Received a GET request on ${req.path} from ${req.host}`);
    res.send(getRootResponse(req));
    console.log(`Response sent for GET ${req.path} to ${req.host}`);
});

app.get('/users', (req, res) => {
    console.log(`Received a GET request on ${req.path} from ${req.host}`);
    res.send(allUsers);
    console.log(`Response sent for GET ${req.path} to ${req.host}`);
});

app.post('/users', (req, res) => {
    console.log(`Received a POST request on ${req.path} from ${req.host}`);
    allUsers.push(req.body);
    res.send('Success!');
    console.log(`Response sent for POST ${req.path} to ${req.host}`);
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));
