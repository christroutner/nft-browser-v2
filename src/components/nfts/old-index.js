
// Global npm libraries
import React from 'react'
import { Col, Spinner } from 'react-bootstrap'

// Local libraries
import NFTCard from './nft-card'

const tokenId = '030563ddd65772d8e9b79b825529ed53c7d27037507b57c528788612b4911107'

// let _this

class NFTs extends React.Component {
  constructor (props) {
    super(props)

    console.log('props passed to NFT component: ', props)
    this.wallet = props.wallet

    this.state = {
      nftData: [],
      walletIsReady: false, // Turns true when rendered with wallet lib.
      stateInitialized: false, // Turns true when data successfully retrieved.
      wallet: props.wallet
    }

    // _this = this
  }

  async componentDidMount () {
    console.log('NFT component mounted')
    // await this.wallet.walletInfoPromise
    // const tokenData = await this.wallet.getTokenData(tokenId)
    // console.log(`Group tokenData: ${JSON.stringify(tokenData, null, 2)}`)
    //
    // const nfts = tokenData.genesisData.nfts
    // const nftData = []
    //
    // for (let i = 0; i < nfts.length; i++) {
    // // for(let i=nfts.length-1; i > -1 ; i--) {
    //   const thisNft = nfts[i]
    //
    //   const thisNftData = await this.wallet.getTokenData(thisNft)
    //   console.log(`thisNftData ${i}: ${JSON.stringify(thisNftData, null, 2)}`)
    //
    //   nftData.push(thisNftData)
    // }
    //
    // this.setState({
    //   nftData
    // })

    // setInterval(function() {
    //   console.log(`NFT component this.state.wallet: `, _this.state.wallet)
    // }, 2000)
  }

  render () {
    console.log('NFT component rendered.')

    // this.checkWalletState()

    console.log('NFT render() this.state.wallet: ', this.state.wallet)
    console.log('NFT render() this.wallet: ', this.wallet)

    if (this.state.walletIsReady && this.state.stateInitialized) {
      return (
        <div>
          <p>Loading NFTs associated with Group token{' '}
            <a
              href={`https://token.fullstack.cash/?tokenid=${tokenId}`}
              target='_blank'
              rel='noopener noreferrer'
            >
              {tokenId}
            </a>
          </p>
          {
            this.state.nftData.map((val, i) => {
              return (
                <NFTCard tokenData={val} key={val.genesisData.tokenId} />
              )
            })
          }
        </div>
      )
    } else {
      // Load spinner at startup while the wallet is being initialized.
      return (
        <>
          <Col style={{ textAlign: 'center' }}>
            <p>Loading NFTs associated with Group token{' '}
              <a
                href={`https://token.fullstack.cash/?tokenid=${tokenId}`}
                target='_blank'
                rel='noopener noreferrer'
              >
                {tokenId}
              </a>
            </p>
            <Spinner animation='border' />
          </Col>
        </>
      )
    }
  }

  // This function checks the state of the wallet, to see if it has loaded.
  // If it has, it kicks off the loading of the Group token data.
  async checkWalletState () {
    console.log(`checkWalletState():: walletIsReady: ${this.state.walletIsReady}, stateInitialized: ${this.state.stateInitialized}`)
    // console.log('this.wallet.walletInfo: ', this.wallet.walletInfo)
    console.log('checkWalletState() this.state.wallet: ', this.state.wallet)

    // Wait for the wallet to finish loading.
    if (!this.state.walletIsReady) {
      if (this.state.wallet.walletInfo) {
        await this.state.wallet.walletInfoPromise
        console.log('Wallet is ready. Loading NFT Group token data.')

        this.setState({
          walletIsReady: true
        })
      }
      // } else {
      //   console.log('this.wallet.walletInfo: ', this.wallet.walletInfo)
      //
      //   // Wait and call this function again.
      //   await sleep(2000)
      //   await this.checkWalletState()
      //   return
      // }
    }

    // Wait for Group token information to load
    if (this.state.walletIsReady && !this.state.stateInitialized) {
      const tokenData = await this.state.wallet.getTokenData(tokenId)
      console.log(`Group tokenData: ${JSON.stringify(tokenData, null, 2)}`)
    }
  }
}

// function sleep (ms) {
//   return new Promise(resolve => setTimeout(resolve, ms))
// }

export default NFTs
