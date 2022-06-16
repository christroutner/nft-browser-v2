/*
  This is an SPA that displays information about NFTs on the BCH blockchain.
*/

// Global npm libraries
import React, { useState } from 'react'
import Toast from 'react-bootstrap/Toast'
import Button from 'react-bootstrap/Button'
import { Container, Row, Col } from 'react-bootstrap'

// Local libraries
import './App.css'
import LoadScripts from './components/load-scripts'

const ExampleToast = ({ children }) => {
  const [show, toggleShow] = useState(true)

  return (
    <>
      {!show && <Button onClick={() => toggleShow(true)}>Show Toast</Button>}
      <Toast show={show} onClose={() => toggleShow(false)}>
        <Toast.Header>
          <strong className='mr-auto'>React-Bootstrap</strong>
        </Toast.Header>
        <Toast.Body>{children}</Toast.Body>
      </Toast>
    </>
  )
}

// const App = () => (
//   <Container className='p-3'>
//     <Container className='p-5 mb-4 bg-light rounded-3'>
//       <h1 className='header'>Welcome To React-Bootstrap</h1>
//       <ExampleToast>
//         We now have Toasts
//         <span role='img' aria-label='tada'>
//           🎉
//         </span>
//       </ExampleToast>
//     </Container>
//   </Container>
// )

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      wallet: false
    }
  }



  async componentDidMount() {
    // Initialize minimal-slp-wallet, once the library finishes loading.
    let BchWallet = false
    do {
      if(typeof window !== 'undefined' && window.SlpWallet) {
        BchWallet = window.SlpWallet
        const options = {
          interface: 'consumer-api',
          restURL: 'https://free-bch.fullstack.cash'
          // noUpdate: true
        }

        this.setState({
          wallet: new BchWallet(null, options)
        })

        await this.state.wallet.walletInfoPromise
        console.log(`mnemonic: ${this.state.wallet.walletInfo.mnemonic}`)
      } else {
        console.log('Waiting for wallet library to load...')
      }
      await sleep(1000)
    } while(!BchWallet)
  }

  render() {


    return (
      <>
      <LoadScripts />
      <Container>
        <Row>
          <Col>
            <h1 className='header'>NFT Explorer</h1>
            <ExampleToast>
              We now have Toasts
              <span role='img' aria-label='tada'>
                🎉
              </span>
            </ExampleToast>
          </Col>
        </Row>
      </Container>
      </>
    )
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default App
