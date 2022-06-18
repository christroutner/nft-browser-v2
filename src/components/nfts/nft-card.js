/*
  This component controls the display of each NFT.
*/
/* eslint-disable */

// Global npm libraries
import React from 'react'
import axios from 'axios'
import { Row, Col, Image } from 'react-bootstrap'


class NFTCard extends React.Component {
  constructor (props) {
    super(props)

    console.log('NFTCard props: ', props)

    this.tokenData = props.nftData

    this.state = {
      mutableData: {},
      immutableData: {}
    }
  }

  // async componentDidMount () {
  //
  // }

  render () {
    return (
      <Row>
        <Col>
          <Image src={this.tokenData.mutableData.tokenIcon} />
        </Col>
        <Col>
          Placeholder
        </Col>
      </Row>
    )
  }
}

export default NFTCard
