const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const router = require('.//routes/routes');
const app = express();

app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(router);

const port = 3000;

app.listen(process.env.PORT || port, (err) => {
    if (err)
        console.log('Unable to start the server!');
    else
        console.log('Server started running on : ' + port);
});