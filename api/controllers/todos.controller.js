// Models
const { ToDo } = require('../models/todo.model');

// Utils
const { filterObj } = require('../utils/filterObj');

// Controllers
exports.getAllToDos = async (req, res) => {
  try {
    const todos = await ToDo.findAll({
      where: {
        status: 'active'
      }
    });

    res.status(200).json({
      status: 'success',
      data: {
        todos
      }
    });
  } catch (error) {
    console.log(error);
  }
};

exports.createToDo = async (req, res) => {
  try {
    const { content } = req.body;

    if (!content) {
      res.status(404).json({
        status: 'error',
        message: 'Must provide a content for this reuqest'
      });
      return;
    }

    const newToDo = await ToDo.create({ content });

    res.status(201).json({ status: 'success', data: newToDo });
  } catch (error) {
    console.log(error);
  }
};

exports.updateToDo = async (req, res) => {
  try {
    const { id } = req.params;
    const data = filterObj(req.body, 'content');

    if (Object.keys(data).length === 0) {
      res.status(404).json({
        status: 'error',
        message: 'Must provide a content for this reuqest'
      });
      return;
    }

    const todo = await ToDo.findOne({ where: { id, status: 'active' } });

    await todo.update({ ...data });

    res.status(204).json({ status: 'success' });
  } catch (error) {
    console.log(error);
  }
};

exports.deleteToDo = async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await ToDo.findOne({ where: { id, status: 'active' } });

    await todo.update({ status: 'deleted' });

    res.status(204).json({ status: 'success' });
  } catch (error) {
    console.log(error);
  }
};
