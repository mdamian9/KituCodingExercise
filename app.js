const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const logger = require('morgan');
const PORT = 3000;

const indexRouter = require('./routes/index');

// Log all requests to the console
app.use(logger('dev'));
// Use body-parser to parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Using express.Router just 'cause
app.use('/', indexRouter);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
});
