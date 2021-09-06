'use strict';

// load modules
const express = require('express');
const morgan = require('morgan');

const cors = require('cors');

const models = require('./models')
const routes = require('./routes');

// variable to enable global error logging
const enableGlobalErrorLogging = process.env.ENABLE_GLOBAL_ERROR_LOGGING === 'true';

// create the Express app
const app = express();


// setup morgan which gives us http request logging
app.use(morgan('dev'));
app.use(cors());

//add routes for the api
app.use('/api', routes)

//IIFE
const func = async() => {
    await models.sequelize.sync();
    try {
        await models.sequelize.authenticate();
        console.log('Database connection established');
    } catch (err) {
        console.error('Error connection to the database: ', err);
    }
};

func();
// setup a friendly greeting for the root route
app.get('/', cors(), (req, res) => {
    res.json({
        message: 'Welcome to the REST API project!',
    });
});

// send 404 if no other route matched
app.use((req, res) => {
    res.status(404).json({
        message: 'Route Not Found',
    });
});

// setup a global error handler
app.use((err, req, res, next) => {
    if (enableGlobalErrorLogging) {
        console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
    }

    res.status(err.status || 500).json({
        message: err.message,
        error: {},
    });
});

// set our port
app.set('port', process.env.PORT || 5000);

// start listening on our port
const server = app.listen(app.get('port'), () => {
    console.log(`Express server is listening on port ${server.address().port}`);
});