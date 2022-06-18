/*
  This component controls the display of each NFT.
*/
/* eslint-disable */

// Global npm libraries
import React from 'react'
import axios from 'axios'
import { Container, Row, Col, Image } from 'react-bootstrap'


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
    console.log('Rendering NFT card with this token data: ', this.tokenData)

    return (
      <Row>
        <Col>
          <Image src={this.tokenData.mutableData.tokenIcon} style={{border: 'black solid 5px'}} />
        </Col>
        <Col>
          <Container>
            <Row>
              <Col>
                <h3>{this.tokenData.genesisData.name} ({this.tokenData.genesisData.ticker})</h3>
              </Col>
            </Row>
            <Row style={{ textAlign: 'left' }}>
              <Col>
                <b>Token ID:</b> <a href={`https://token.fullstack.cash/?tokenid=${this.tokenData.genesisData.tokenId}`} target="_blank">{this.tokenData.genesisData.tokenId}</a><br />
                <b>Description: </b> {this.tokenData.mutableData.description}<br />
                <b>Content: </b>
                <ul>
                  <li><a href={this.tokenData.mutableData.content.youtube} target="_blank">YouTube</a></li>
                  <li><a href={this.tokenData.mutableData.content.rumble} target="_blank">Rumble</a></li>
                  <li><a href={this.tokenData.mutableData.content.odysee} target="_blank">Odysee</a></li>
                  <li><a href={this.tokenData.mutableData.content.filecoin} target="_blank">Filecoin</a> (download)</li>
                </ul>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    )
  }
}

export default NFTCard
