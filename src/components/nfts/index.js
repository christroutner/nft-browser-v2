
// Global npm libraries
import React from 'react'

// Local libraries
import NFTCard from './nft-card'

const tokenId = '030563ddd65772d8e9b79b825529ed53c7d27037507b57c528788612b4911107'

class NFTs extends React.Component {

  constructor(props) {
    super(props)

    this.wallet = props.wallet

    this.state = {
      nftData: [],
    }
  }

  async componentDidMount() {
    await this.wallet.walletInfoPromise
    const tokenData = await this.wallet.getTokenData(tokenId)
    console.log(`Group tokenData: ${JSON.stringify(tokenData, null, 2)}`)

    const nfts = tokenData.genesisData.nfts
    const nftData = []

    for(let i=0; i < nfts.length ; i++) {
    // for(let i=nfts.length-1; i > -1 ; i--) {
      const thisNft = nfts[i]

      const thisNftData = await this.wallet.getTokenData(thisNft)
      console.log(`thisNftData ${i}: ${JSON.stringify(thisNftData, null, 2)}`)

      nftData.push(thisNftData)
    }

    this.setState({
      nftData
    })
  }

  render() {
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
  }

}

export default NFTs
