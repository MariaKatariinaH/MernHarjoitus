import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';

const App = ( ) => {
  const [things, setThings] = useState([]);
    
  return (
    <div className="wrapper">
      <h1>My things to do</h1>
      <div class="mb-4"></div> 
      <AddTodo setThings = {setThings} />
     <TodoList things={things} setThings={setThings} />
    </div>
  );
};

export default App;