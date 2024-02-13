// AddTodo.js
import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const AddTodo = ( { things, setThings }) => {
  const [pendingItem, setPendingItem] = useState('');
  

  const handleItemInput = (e) => {
    setPendingItem(e.target.value);
  };

  const newItemSubmitHandler = async (e) => {
    
    try {
      const response = await axios.post('http://localhost:5000/things', {
        title: pendingItem,
      });

      setThings([...things, response.data]);
      setPendingItem('');
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };


  const handleSubmit = (e) => {
    newItemSubmitHandler(pendingItem);
    setPendingItem('');
  };

  return (
    <Form onSubmit={handleSubmit} className="addtoDo">
      <input
        className="input"
        type="text"
        onChange={handleItemInput}
        value={pendingItem}
        placeholder="Add your thing"
      />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <Button variant="success" type="submit" name="submit" value="submit">
        Add
      </Button>{' '}
    </Form>
  );
};

export default AddTodo;
