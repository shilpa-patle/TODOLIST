import React, { useState, useEffect } from "react";

export default function Todolist() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) setTasks(savedTasks);
  }, []);

 
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);


  const addTask = () => {
   if(task== "") return;

    if (editId) {
      const updated = tasks.map((t) =>
        t.id === editId ? { ...t, text: task } : t
      );
      setTasks(updated);
      setEditId(null);
    } else {
      const newTask = { id: Date.now(), text: task };
      setTasks([...tasks, newTask]);
    }
    setTask("");
  };

  
  const handleEdit = (id) => {
    const selected = tasks.find((t) => t.id === id);
    setTask(selected.text);
    setEditId(id);
  };

 
  const handleDeletePopup = (id) => {
    setDeleteId(id);
  };

  
  const confirmDelete = () => {
    setTasks(tasks.filter((t) => t.id !== deleteId));
    setDeleteId(null);
  };


  const cancelDelete = () => {
    setDeleteId(null);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>📑 Simple Todo List</h2>

    
      <input
        type="text"
        value={task}
        placeholder="Enter task..."
        onChange={(e) => setTask(e.target.value)}
        
      />

     
      <button className="btn"
        onClick={addTask}
        style={{
          background: editId ? "orange" : "green",
          
        }}
      >
       
        {editId ? "🖊️UPDATE" : "➕ADD"}
      </button>


      <ul className="todos" style={{ listStyle: "none", marginTop: 20 }}>
        {tasks.map((t, index) => (
          <p key={t.id}>
            <b>{index + 1}.</b> Task: {t.text}
          
            <button
             className="btn"
              onClick={() => handleEdit(t.id)}
              style={{background:"blue"}}
            >
              <i
                className="fa-solid fa-pen"
               
              ></i>
              Edit
            </button>

          
            <button className="del btn"
            style={{background:"red"}}
              onClick={() => handleDeletePopup(t.id)}
            >
              <i
                className="fa-solid fa-trash"
               
              ></i>
              Delete
            </button>
          </p>
        ))}
      </ul>

    
      {deleteId && (
        <div
         
        >
          <div
          
          >
            <h3 style={{fontSize:"25px"}}>Delete Task?</h3>
            <p style={{fontSize:"20px"}}>Are you sure you want to delete this task?</p>
            <div style={{ marginTop: 15 }}>
              <button className="btn"
                onClick={confirmDelete}
               style={{background:"red"}}
              >
                <i
                  className="fa-solid fa-trash"
                  style={{ marginRight: "4px"}}
                ></i>
                Delete
              </button>
              <button
                onClick={cancelDelete}
                style={{ marginRight: "4px", background:"rebeccapurple"}}
               className="btn"
              >
                ❌Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
