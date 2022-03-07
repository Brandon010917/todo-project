import { useState, useEffect } from "react";
import axios from "axios";

// Components
import Form from "./components/form/form.component";
import TodoList from "./components/todo-list/todo-list.component";

import "./App.css";

const App = () => {
  // State
  const [todos, setTodos] = useState([]);

  // Set base url axios
  axios.defaults.baseURL = "http://localhost:4000/api/v1/todos";

  const addTodo = async (todo) => {
    await axios.post("", {
      content: todo.content,
    }); // req.body.content

    setTodos((prevState) => [...prevState, todo]);
  };

  const fetchTodos = async () => {
    const res = await axios.get();

    const resTodos = res.data;

    console.log(resTodos.data);
    setTodos(resTodos.data.todos);
  };

  const editTodo = async (id, newContent) => {
    await axios.patch(`/${id}`, {
      content: newContent,
    });

    setTodos((prevState) => {
      const currentTodos = prevState;

      const todoIndex = currentTodos.findIndex((todo) => +todo.id === +id);

      const updatedTodo = currentTodos[todoIndex];

      updatedTodo.content = newContent;

      currentTodos[todoIndex] = updatedTodo;

      return [...currentTodos];
    });
  };

  const deleteTodo = async (id) => {
    await axios.delete(`/${id}`);

    setTodos((prevState) => {
      const currentTodos = prevState;

      const updatedTodos = currentTodos.filter((todo) => +todo.id !== +id);

      return [...updatedTodos];
    });
  };

  // When component is mounted, fetch todos
  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="app">
      <Form onAddTodo={addTodo} />
      <TodoList onDeleteTodo={deleteTodo} onEditTodo={editTodo} items={todos} />
    </div>
  );
};

export default App;
