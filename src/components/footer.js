/*
  A footer section for the SPA
*/

// Global npm libraries
import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const IPFS_CID = ''

class Footer extends React.Component {
  render () {
    return (
      <Container style={{ backgroundColor: '#ddd' }}>
        <Row style={{ padding: '25px' }}>
          <Col>
            <h6>Site Mirrors</h6>
            <ul>
              <li><a href='https://troutnfts.com' target='_blank' rel='noreferrer'>troutnfts.com</a></li>
              <li><a href={`${IPFS_CID}`} target='_blank' rel='noreferrer'>Filecoin</a></li>
            </ul>
          </Col>

          <Col />

          <Col>
            <h6>Other</h6>
            <ul>
              <li><a href='https://github.com/christroutner/nft-browser-v2' target='_blank' rel='noreferrer'>Source Code</a></li>
            </ul>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Footer
