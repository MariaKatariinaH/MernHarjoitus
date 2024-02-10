import React from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

  const AddTodo = props => {
    return (
      <Form
      onSubmit={props.newItemSubmitHandler}
      className="addtoDo">  
        <input
          className="input"
          type="text"
          onChange={props.handleItemInput} 
          value={props.pendingItem}
          placeholder="Add your thing"   
        />
      <Button variant="primary" type="submit" name="submit" value="submit">
        Add
      </Button>{' '}
      </Form>
  );
};

export default AddTodo;