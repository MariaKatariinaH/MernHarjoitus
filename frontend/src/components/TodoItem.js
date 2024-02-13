// TodoItem.js
import React, { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";

const TodoItem = ({ thing, handleUpdate, handleRemove, setThings }) => {
  const [showUpdateForm, setShowUpdateForm] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState("");

  const handleUpdateClick = (id, title) => {
    setUpdatedTitle(title);
    setShowUpdateForm(id);
  };

  const cancelUpdate = () => {
    setShowUpdateForm(null);
  };

  const submitUpdate = async (id) => {
    try {
      await axios.put(`http://localhost:5000/things/${id}`, {
        title: updatedTitle,
      });

      // Update the local state with the edited item
      setThings((prevThings) =>
        prevThings.map((prevThing) =>
          prevThing._id === id ? { ...prevThing, title: updatedTitle } : prevThing
        )
      );

      setShowUpdateForm(null);
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  const handleRemoveClick = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/things/${id}`);
      setThings((prevThings) => prevThings.filter((prevThing) => prevThing._id !== id));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return (
    <ListGroup>
      <ListGroup.Item key={thing._id}>
        {thing.title}
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

        <Button
          variant="primary"
          className="action"
          onClick={() => handleUpdateClick(thing._id, thing.title)}
        >
          Edit
        </Button>{" "}

        {showUpdateForm && (
          <div>
            <input
              type="text"
              value={updatedTitle}
              onChange={(e) => setUpdatedTitle(e.target.value)}
            />
            <button onClick={() => submitUpdate(thing._id)}>Submit Update</button>
            <button onClick={cancelUpdate}>Cancel</button>
          </div>
        )}
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Button
          variant="danger"
          className="action"
          onClick={() => handleRemoveClick(thing._id)}
        >
          Delete
        </Button>{" "}
      </ListGroup.Item>
    </ListGroup>
  );
};

export default TodoItem;
