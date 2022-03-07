const express = require('express');

// Controllers
const {
  getAllToDos,
  createToDo,
  updateToDo,
  deleteToDo
} = require('../controllers/todos.controller');

const router = express.Router();

// Define endpoint for ToDos
// GET fetch all ToDos
router.get('/', getAllToDos);

// POST Create new ToDo
router.post('/', createToDo);

// PATCH Update ToDo given an ID
router.patch('/:id', updateToDo);

// // DELETE Delete ToDo given an ID (soft delete)
router.delete('/:id', deleteToDo);

module.exports = {
  routerToDos: router
};
