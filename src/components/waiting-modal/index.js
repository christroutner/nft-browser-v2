/*
  This 'Waiting Modal' component displays a spinner animation and a status log.
  It's used to inform the user that the app is waiting for something, and to
  display progress.
*/

// Global npm libraries
import React, { useState } from 'react'
import { Container, Row, Col, Modal, Button, Spinner } from 'react-bootstrap'

class WaitingModal extends React.Component {
  constructor (props) {
    super(props)
    console.log('Waiting Modal instantiated')
    console.log('props.modalOptions: ', props.modalOptions)

    // Default values
    const modalDefaults = {
      heading: 'Modal Heading',
      body: ['a', 'b'],
      buttonShowL: false,
      buttonShowR: false,
      buttonLabelL: 'Close',
      buttonLabelR: 'Save Changes'
    }

    this.state = Object.assign({}, modalDefaults, props.modalOptions)
  }

  render() {
    return(
      <ModalTemplate heading={this.state.heading} body={this.state.body} />
    )
  }
}

function ModalTemplate(props) {
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true)

  return(
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
      <Modal.Footer>
        {props.buttonShowL ? <Button variant="secondary" onClick={handleClose}>{props.buttonLabelL}</Button> : null}
        {props.buttonShowR ? <Button variant="primary" onClick={handleClose}>{props.buttonLabelR}</Button> : null}
      </Modal.Footer>
    </Modal>
  )
}

function BodyList(props) {
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
  for(let i=0; i < items.length; i++) {
    listItems.push(<code key={items[i]}>{items[i]}</code>)
  }

  return (
    listItems
  )
}

export default WaitingModal
