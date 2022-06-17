/*
  This is an SPA that displays information about NFTs on the BCH blockchain.
*/

// Global npm libraries
import React, { useState } from 'react'
import { Container, Row, Col, Modal, Button } from 'react-bootstrap'

// Local libraries
import './App.css'
import LoadScripts from './components/load-scripts'
import NFTs from './components/nfts'
import WaitingModal from './components/waiting-modal'

class App extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      walletInitialized: false,
      wallet: false
    }

  }

  async componentDidMount () {
    // Initialize minimal-slp-wallet, once the library finishes loading.
    let BchWallet = false
    do {
      if (typeof window !== 'undefined' && window.SlpWallet) {
        BchWallet = window.SlpWallet
        const options = {
          interface: 'consumer-api',
          restURL: 'https://free-bch.fullstack.cash'
          // noUpdate: true
        }

        const wallet = new BchWallet(null, options)

        await wallet.walletInfoPromise
        console.log(`mnemonic: ${wallet.walletInfo.mnemonic}`)

        this.setState({
          wallet,
          walletInitialized: true
        })

        console.log('App ComponentDidMount() this.state.wallet: ', this.state.wallet)
        // this.render()
      } else {
        console.log('Waiting for wallet library to load...')
      }
      await sleep(1000)
    } while (!BchWallet)
  }

  render () {
    console.log('App component rendered. this.state.wallet: ', this.state.wallet)

    return (
      <>
        <LoadScripts />
        {this.state.walletInitialized ? <InitializedView wallet={this.state.wallet} /> : <UninitializedView />}
      </>
    )
  }
}

// This is rendered *before* the BCH wallet is initialized.
function UninitializedView (props) {
  const modalOptions = {
    heading: "Loading App",
    body: ['Loading minimal-slp-wallet']
  }

  return (
    <Container>
      <Row>
        <Col>
          <h1 className='header'>NFT Explorer</h1>

          <WaitingModal modalOptions={modalOptions} />
        </Col>
      </Row>
    </Container>
  )
}

// This is rendered *after* the BCH wallet is initialized.
function InitializedView (props) {
  return (
    <Container>
      <Row>
        <Col>
          <h1 className='header'>NFT Explorer</h1>
        </Col>
      </Row>
      <Row>
        <NFTs wallet={props.wallet} />
      </Row>
    </Container>
  )
}



function sleep (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export default App
