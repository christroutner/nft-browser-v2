/*
  This component controls the display of each NFT.
*/

import React from 'react'
import axios from 'axios'

// Styles
const cardStyle = {
  maxWidth: "100%",
  border: '2px solid black',
  padding: '25px'
}

const imgStyle = {
  border: '2px solid black'
}

const infoStyle = {
  padding: '10px'
}

class NFTCard extends React.Component {

  constructor(props) {
    super(props)

    this.tokenData = props.tokenData

    this.state = {
      mutableData: {},
      immutableData: {}
    }
  }

  async componentDidMount() {
    // Retrieve immutable data.
    try {
      const immutableCid = this.tokenData.immutableData.slice(7)
      const url = `https://${immutableCid}.ipfs.dweb.link/data.json`
      // console.log('url: ', url)
      const response = await axios.get(url)
      const data = response.data
      console.log(`immutable data for ${this.tokenData.genesisData.ticker}: ${JSON.stringify(data, null, 2)}`)
      this.setState({
        immutableData: data
      })
    } catch(err) {
      console.log(`Error trying to retrieve immutable data for NFT ${this.tokenData.genesisData.ticker}`)
    }

    // Retrieve mutable data
    try {
      const mutableCid = this.tokenData.mutableData.slice(7)
      const url = `https://${mutableCid}.ipfs.dweb.link/data.json`
      // console.log('url: ', url)
      const response = await axios.get(url)
      const data = response.data
      console.log(`mutable data for ${this.tokenData.genesisData.ticker}: ${JSON.stringify(data, null, 2)}`)
      this.setState({
        mutableData: data
      })
    } catch(err) {
      console.log(`Error trying to retrieve mutable data for NFT ${this.tokenData.genesisData.ticker}`)
    }
  }

  render() {
    return (
      <div style={cardStyle}>
        <p>{this.tokenData.genesisData.name} ({this.tokenData.genesisData.ticker})</p>
        <table><tbody>
          <tr>
            <td>
              <img style={imgStyle} src={this.state.mutableData.tokenIcon} alt="token icon"/>
            </td>

            <td style={infoStyle}>
              <p><b>Token ID:</b> <a
                href={`https://token.fullstack.cash/?tokenid=${this.tokenData.genesisData.tokenId}`}
                target='_blank'
                rel='noopener noreferrer'
              >
              {this.tokenData.genesisData.tokenId}
              </a></p>

              <p>
                <b>Description:</b> {this.state.mutableData.description}
              </p>

              <p>
                <b>Content:</b>
              </p>
              <ul>
                {this.state.mutableData.content && this.state.mutableData.content.youtube ?
                <li>
                  <a
                    href={this.state.mutableData.content.youtube}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    YouTube
                  </a>
                </li>
                : null}

                {this.state.mutableData.content && this.state.mutableData.content.rumble ?
                <li>
                  <a
                    href={this.state.mutableData.content.rumble}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Rumble
                  </a>
                </li>
                : null}

                {this.state.mutableData.content && this.state.mutableData.content.odysee ?
                <li>
                  <a
                    href={this.state.mutableData.content.odysee}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Odysee
                  </a>
                </li>
                : null}

                {this.state.mutableData.content && this.state.mutableData.content.filecoin ?
                <li>
                  <a
                    href={this.state.mutableData.content.filecoin}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Filecoin
                  </a> (download)
                </li>
                : null}
              </ul>
            </td>
          </tr>
        </tbody></table>
      </div>
    )
  }

}

export default NFTCard
