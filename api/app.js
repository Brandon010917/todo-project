// Create server Express
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');

// Routes
const { routerToDos } = require('./routes/todos.routes');

// Init express app
const app = express();

// Configure Express
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(compression());

if (process.env.NODE_ENV === 'production') app.use(morgan('dev'));
else app.use(morgan('combined'));

// Endpoints
app.use('/api/v1/todos', routerToDos);

module.exports = { app };
