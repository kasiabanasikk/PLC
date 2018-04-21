const express = require('express');
const http = require('http');
const app = express();

const port = 3000;

const server = http.createServer(app);

app.get('/', function (req, res) {
    setTimeout(
        () => res.status(200).send('I am working!'), 3000
    );
});

//start our server
server.listen(port || 8999, () => {
    console.log(`Server started on port ${server.address().port} :)`);
});
