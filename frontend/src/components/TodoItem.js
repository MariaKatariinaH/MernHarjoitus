import React, { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";

const TodoItem = ({ thing, setThings }) => {
  const [showUpdateForm, setShowUpdateForm] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState("");

  //Funktio, joka antaa päivityskentän:
  const handleUpdateClick = (id, title) => {
    setUpdatedTitle(title);
    setShowUpdateForm(id);
  };

  const cancelUpdate = () => {
    setShowUpdateForm(null);
  };

  //Päivittävä funktio:
  const submitUpdate = async (id) => {
    try {
      await axios.put(`http://localhost:5000/things/${id}`, {
        title: updatedTitle,
      });

      // Päivitä päivitetyllä:
      setThings((updateThings) =>
        updateThings.map((updateThing) =>
          updateThing._id === id ? { ...updateThing, title: updatedTitle } : updateThing
        )
      );
      setShowUpdateForm(null);
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  //Deletoiva funktio:
  const handleRemove = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/things/${id}`);
      setThings((newThings) => newThings.filter((newThing) => newThing._id !== id));
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
          onClick={() => handleUpdateClick(thing._id, thing.title)}>
          Edit
        </Button>{" "}
        {showUpdateForm && (
          <div>
            <input
              type="text"
              value={updatedTitle}
              onChange={(e) => setUpdatedTitle(e.target.value)}
            />
            <div class="mb-2"></div> 
            <Button variant="info" className="info" onClick={() => submitUpdate(thing._id)}>Submit Update</Button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Button variant="warning" className="warning" onClick={cancelUpdate}>Cancel</Button>
            <div class="mb-2"></div>
          </div>
        )}
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Button
          variant="danger"
          className="action"
          onClick={() => handleRemove(thing._id)}>Delete</Button>{" "}
      </ListGroup.Item>
    </ListGroup>
  );
};

export default TodoItem;
