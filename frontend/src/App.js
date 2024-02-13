import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';
import axios from 'axios';

const App = ( ) => {
  const [things, setThings] = useState([]);
  //const [pendingItem, setPendingItem] = useState('');
  
  useEffect(() => {
    axios.get('http://localhost:5000/things')
      .then((response) => {
        setThings(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  
  return (
    <div className="wrapper">
      <h1>My things to do</h1>
      <AddTodo setThings = {setThings} 
        //className="input"
        //type="text"
        //newItemSubmitHandler={newItemSubmitHandler}
        //handleItemInput={handleItemInput}
        //pendingItem={pendingItem}
        //value={pendingItem}
        //placeholder="Add an item"
      />
     <TodoList things={things}
        //handleUpdate={handleUpdate}
        //handleRemove={handleRemove}
        setThings={setThings} />
     

      
    </div>
  );
};

export default App;

