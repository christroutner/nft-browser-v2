/*
  This library gets data that requires an async wait.
*/

class AsyncLoad {
  constructor () {
    this.BchWallet = false
  }

  // Load the minimal-slp-wallet which comes in as a <script> file and is
  // attached to the global 'window' object.
  async loadWalletLib () {
    do {
      if (typeof window !== 'undefined' && window.SlpWallet) {
        this.BchWallet = window.SlpWallet

        return this.BchWallet
      } else {
        console.log('Waiting for wallet library to load...')
      }

      await sleep(1000)
    } while (!this.BchWallet)
  }

  // Initialize the BCH wallet
  async initWallet () {
    const options = {
      interface: 'consumer-api',
      restURL: 'https://free-bch.fullstack.cash'
      // noUpdate: true
    }

    const wallet = new this.BchWallet(null, options)

    await wallet.walletInfoPromise
    console.log(`mnemonic: ${wallet.walletInfo.mnemonic}`)

    return wallet
  }
}

function sleep (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export default AsyncLoad
