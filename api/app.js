// Create server Express
const express = require('express');
const cors = require('cors');

// Init express app
const app = express();
const port = 4000;

// Configure Express
app.use(express.json());
app.use(cors());

// Routes
const { routerToDos } = require('./routes/todos.routes');

// Utils
const { sequelize } = require('./utils/database');

// Endpoints
app.use('/api/v1/todos', routerToDos);

// Database
sequelize
  .authenticate()
  .then(() => console.log('Database Authenticated'))
  .catch((err) => console.log(err));

sequelize
  .sync()
  .then(() => console.log('Database Synced'))
  .catch((err) => console.log(err));

app.listen(port, () => {
  console.log('Express server listening on port ' + port);
});

// Establish a connection with a Database (Postgress)

// Create ToDo model
// Use the model to interact with the controller functions

// Must structure project with routes, controllers and models folders (utils)

// IMPORTANT: Prettier format

// Install cors library (npm i cors)
// app.use(cors())
