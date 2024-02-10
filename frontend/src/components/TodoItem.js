import React from "react";
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';

const TodoItem = ({ item, handleRemove }) => {
  return (
    <ListGroup>
      <ListGroup.Item>
        {item.name}
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Button variant="danger" className="action" onClick={() => handleRemove(item.id)}>
          Delete
        </Button>{' '}
      </ListGroup.Item>
    </ListGroup>
  );
};

export default TodoItem;