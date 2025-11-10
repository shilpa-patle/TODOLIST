import React, { useState } from "react";
import { Modal } from "react-bootstrap";
export default function Modal2() {
  const [text, setText] = useState("");
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleHide = () => setShow(false);
  return (
    <div>
      <input
        type="text"
        name=""
        id=""
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handleShow}>Show Model</button>
      <Modal show={show} onHide={handleHide} size="xl"   centered >
        <Modal.Header>  
          <Modal.Title>Hello i am modal2</Modal.Title>
        </Modal.Header>
        <Modal.Body>text: {text}</Modal.Body>
        <Modal.Footer>
          <button className="btn btn-primary" onClick={handleHide}> ok</button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
