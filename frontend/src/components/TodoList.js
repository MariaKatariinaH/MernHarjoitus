// TodoList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TodoItem from './TodoItem';

const TodoList = () => {
  const [things, setThings] = useState([]);
  const [loading, setLoading] = useState(false);

  //Hakee listauksen selaimeen:
  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5000/things')
      .then((response) => {
        setThings(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
            {things.map((thing) => (
              <TodoItem
                key={thing._id}
                thing={thing}
                setThings={setThings}
              />
            ))}
         </div>
      )}
    </div>
  );
};

export default TodoList;
