const express = require('express');
const app = express();

function getRootResponse(){
    return '<h1>Hello World!</h1>'
}

app.get('/', (req, res) => res.send(getRootResponse()));

app.listen(3000, () => console.log('Example app listening on port 3000!'))