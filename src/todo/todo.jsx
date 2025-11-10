import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { FaPlus, FaTrash, FaEdit, FaTimes } from "react-icons/fa";
import { FcTodoList } from "react-icons/fc";
import { GrDocumentMissing } from "react-icons/gr";
export default function Todolist() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [showAlert, setShowAlert] = useState(false); // validation modal

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) setTasks(savedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (task.trim() === "") {
      setShowAlert(true);
      return;
    }

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
    <div
      style={{
        textAlign: "center",
        marginTop: "60px",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <h2 style={{ marginBottom: "25px" }}><FcTodoList /> Simple Todo List</h2>

      <input
        type="text"
        value={task}
        placeholder="Enter task..."
        onChange={(e) => setTask(e.target.value)}
        style={{
          padding: "10px",
          width: "250px",
          borderRadius: "8px",
          border: "2px solid #007bff",
          marginRight: "10px",
        }}
      />

      <button
        className="btn"
        onClick={addTask}
        style={{
          background: editId ? "orange" : "green",
          color: "white",
          padding: "8px 18px",
          borderRadius: "8px",
        }}
      >
        {editId ? (
          <FaEdit style={{ fontSize: "21px", marginRight: "5px" }} />
        ) : (
          <FaPlus style={{ fontSize: "21px", marginRight: "5px" }} />
        )}
        {editId ? "UPDATE" : "ADD"}
      </button>

      <ul className="todos" style={{ listStyle: "none", marginTop: 25 }}>
        {tasks.map((t, index) => (
          <li
            key={t.id}
            style={{
              background: "#f8f9fa",
              borderRadius: "10px",
              margin: "10px auto",
              width: "90%",
              padding: "10px 15px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            }}
          >
           <p style={{fontSize:"30px" ,opacity:"0.7"}}>
            <b>{index + 1}.</b> {t.text}
            </p>
            <div style={{ marginTop: "10px" }}>
              <button className="btn"  style={{background:"blue", color:"white"}} onClick={() => handleEdit(t.id)}>
                <FaEdit style={{ fontSize: "21px", marginRight: "5px" }} /> Edit
              </button>
              <button className="btn" style={{background:"red", color:"white"}} onClick={() => handleDeletePopup(t.id)}>
                <FaTrash style={{ fontSize: "21px", marginRight: "5px" }} />{" "}
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      <Modal style={{marginTop:"4px"}} show={showAlert} onHide={() => setShowAlert(false)} >
        <Modal.Header closeButton className="bg-warning text-white">
          <Modal.Title><GrDocumentMissing/> Miss  ing Task</Modal.Title>
        </Modal.Header>
        <Modal.Body >
          <p style={{ fontSize: "18px" }}>
            Please enter a task before clicking “Add”.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAlert(false)}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={!!deleteId} onHide={cancelDelete} centered >
        <Modal.Header closeButton className="bg-danger text-white">
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this task? 
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn btn-secondary"variant="secondary" onClick={cancelDelete}>
            <FaTimes style={{ fontSize: "21px", marginRight: "5px" }} /> Cancel
          </Button>
          <Button className="btn btn-danger" variant="danger" onClick={confirmDelete}>
            <FaTrash style={{ fontSize: "21px", marginRight: "5px" }} /> Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
