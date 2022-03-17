// Create server Express
const express = require('express');
const cors = require('cors');
const { default: helmet } = require('helmet');

// Routes
const { routerToDos } = require('./routes/todos.routes');
const compression = require('compression');

// Init express app
const app = express();

// Configure Express
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(compression());

if (process.env.NODE_ENV === 'production') app.use(morgan('dev'));
else app.use(morgar('combined'));

// Endpoints
app.use('/api/v1/todos', routerToDos);

module.exports = { app };
