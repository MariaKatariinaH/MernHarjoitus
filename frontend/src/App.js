import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from "react";
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/message")
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data) => setMessage(data.message))
      .catch((error) => console.error("Error fetching message:", error));
  }, []);
const [list, setList] = useState([]);
  const [pendingItem, setPendingItem] = useState("");

  const handleItemInput = (e) => {
    setPendingItem(e.target.value);
  };

  const newItemSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/things", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: pendingItem }),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
  
      setList([
        ...list, 
        {
          id: data._id,  
          name: data.title,  
        },
      ]);
      setPendingItem("");
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };
  
  const handleRemove = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/things/${id}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      // Jos deletointi onnistui:
      const newState = list.filter((item) => item.id !== id);
      setList(newState);
    } catch (error) {
      console.error('Error removing item:', error);
    }
  }; 
 
  return (
    <div> 
      <h1>{message}</h1> 
      
      <div className="wrapper">
        <div>
          <h1>My things to do</h1>
        </div>
        <AddTodo
          className="input"
          type="text"
          newItemSubmitHandler={newItemSubmitHandler}
          handleItemInput={handleItemInput}
          pendingItem={pendingItem}
          value={pendingItem}
          placeholder="Add an item"
        />
        <TodoList todoList={list} handleRemove={handleRemove} />
      </div>
    </div>
  );
}

export default App;