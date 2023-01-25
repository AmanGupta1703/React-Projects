/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";

const getLocalStorage = () => {
  let list = localStorage.getItem("list");

  return list ? JSON.parse(list) : [];
}

function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({
    show: false,
    msg: "",
    type: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      // display alert
      showAlert(true, 'please enter value', 'danger');
    } else if (name && isEditing) {
      // deal with edit
      setList(list.map(function(item) {
        if(editID === item.id) {
          return {...item, title: name}
        }
        return item
      }));
      setName('');
      setEditID(null);
      setIsEditing(false);
      showAlert(true, "value changed", "success");
    } else {
      //  show alert
      showAlert(true, 'item added to the list', 'success');
      const newItem = {
        id: new Date().getTime().toString(),
        title: name,
      };
      setList((prevList) => [...prevList, newItem]);
      setName("");
    }
  };

  const showAlert = (show=false, msg="", type="") => {
    setAlert({
      show,
      msg,
      type,
    });
  };

  const clearList = () => {
    showAlert(true, 'empty list', 'danger');
    setList([])
  }

  const removeItem = (id) => {
    showAlert(true, 'item deleted', 'danger');
    setList(list.filter(item => item.id !== id));
  }

  const editItem = (id) => {
    const specificItem = list.find(item => item.id === id);
    setIsEditing(true);
    setEditID(id);
    setName(specificItem.title);
  }

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  return (
    <section className="section-center">
      {/* form to take the value for the list */}
      <form className="grocery-form" onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={ showAlert } list={list} />}
        <h3>grocery bud</h3> 
        <div className="form-control">
          <input
            type="text"
            className="grocery"
            placeholder="eg: eggs"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit" className="submit-btn">
            {isEditing ? "edit" : "submit"}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className="grocery-container">
          {/* grocery list entered by the user */}
          <List items={list} removeItem={removeItem} editItem={editItem} />
          <button className="clear-btn" onClick={clearList}>clear all</button>
        </div>
      )}
    </section>
  );
}

export default App;
