import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'

export default function Mymodal() {
    const[show,setShow]=useState(false)
    const handleshow=()=>setShow(true)
    const handleclose=()=>setShow(false)
    const handleOk=()=>{
        alert("yOu click ok")
        setShow(false)
    }
  return (
    <div>
        <button  onClick={handleshow}>open</button>
     <Modal show={show} onHide={handleclose}>
        <Modal.Header closeButton>
            <Modal.Title>
                I am  Modal dialog box
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p>Are you sure</p>
        </Modal.Body>
        <Modal.Footer>
            <button onClick={handleOk}>OK</button>
            <button onClick={handleclose}>Cancel</button>
        </Modal.Footer>
     </Modal>
    </div>
  )
}
