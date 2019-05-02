const express = require('express');
const app = express();
const logger = require('morgan');
const PORT = 3000;

const indexRouter = require('./routes/index');

// Log all requests to the console
app.use(logger('dev'));

// Using express.Router just 'cause
app.use('/', indexRouter);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
});
