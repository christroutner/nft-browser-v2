/*
  This 'Waiting Modal' component displays a spinner animation and a status log.
  It's used to inform the user that the app is waiting for something, and to
  display progress.
*/

// Global npm libraries
import React, { useState } from 'react'
import { Container, Row, Col, Modal, Spinner } from 'react-bootstrap'

function ModalTemplate (props) {
  const [show, setShow] = useState(true)

  const handleClose = () => setShow(false)
  // const handleShow = () => setShow(true)

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{props.heading}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row>
            <Col style={{ textAlign: 'center' }}>
              <Spinner animation='border' />
              <br />
              <BodyList body={props.body} />
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer />
    </Modal>
  )
}

function BodyList (props) {
  const items = props.body

  const listItems = []

  // List items
  // for(let i=0; i < items.length; i++) {
  //   listItems.push(<li key={items[i]}>{items[i]}</li>)
  // }
  // return (
  //   <ul>
  //     {listItems}
  //   </ul>
  // )

  // Paragraphs
  for (let i = 0; i < items.length; i++) {
    listItems.push(<p key={items[i]}><code>{items[i]}</code></p>)
  }

  return (
    listItems
  )
}

// export default WaitingModal
export default ModalTemplate
