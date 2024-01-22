const express = require('express');
const app = express();

const port = process.env.PORT || 8085;

app.use('/', require('./routes'));

app.listen(port, () => {
    console.log(`Listening and node Runing on port ${port}!`)});