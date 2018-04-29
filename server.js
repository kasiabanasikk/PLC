const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const routes = require("./routes/routes.js");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

routes(app);

app.use('/', express.static('public'));

app.listen(process.env.PORT || 3000);

mongoose.connect("mongodb://localhost:27017/plcControllers");
