import { useState, useEffect } from 'react'
import { useConnectWallet, useSetChain, useWallets } from '@web3-onboard/react'
import { ethers } from 'ethers'

import { initWeb3Onboard } from './onboard'
import { AccountDetails, Network } from './components'
import type { Account } from './types'

// Must be called outside of the App function
initWeb3Onboard()

function App() {
  const [
    {
      wallet, // the wallet that has been connected or null if not yet connected
      connecting // boolean indicating if connection is in progress
    },
    connect, // function to call to initiate user to connect wallet
    disconnect // function to call to with wallet<DisconnectOptions> to disconnect wallet
  ] = useConnectWallet()

  const [
    {
      chains, // the list of chains that web3-onboard was initialized with
      connectedChain, // the current chain the user's wallet is connected to
      settingChain // boolean indicating if the chain is in the process of being set
    },
    setChain // function to call to initiate user to switch chains in their wallet
  ] = useSetChain()

  // This hook allows you to track the state of all the currently connected wallets
  const connectedWallets = useWallets()

  // The user's currently connected account
  const [account, setAccount] = useState<Account | null>(null)

  // The address to send to
  const [toAddress, setToAddress] = useState('')

  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>()

  useEffect(() => {
    // If `wallet` is defined then the user is connected
    if (wallet) {
      const { name, avatar } = wallet?.accounts[0].ens ?? {}
      setAccount({
        address: wallet.accounts[0].address,
        balance: wallet.accounts[0].balance,
        ens: { name, avatar: avatar?.url }
      })
    }
  }, [wallet])

  useEffect(() => {
    if (wallet?.provider) {
      setProvider(new ethers.providers.Web3Provider(wallet.provider, 'any'))
    }
  }, [wallet])

  const connectWallet = () => {
    connect({})
  }

  const disconnectWallet = () => {
    if (wallet?.label) {
      disconnect({ label: wallet?.label })
      setAccount(null)
    }
  }

  const sendTransaction = async () => {
    const signer = provider?.getUncheckedSigner()

    await signer?.sendTransaction({
      to: toAddress,
      value: 1000000000000000
    })
  }

  return (
    <div className="bg-grey-100 flex flex-col  items-center min-h-screen relative">
      <div className="fixed w-full top-0 right-0 p-3 flex justify-end items-center">
        {wallet ? (
          <Network
            chains={chains}
            connectedChain={connectedChain}
            setChain={(chainId) => setChain({ chainId })}
          />
        ) : null}
        <div className="mx-1" />
        <AccountDetails account={account} />
      </div>
      <div className="my-32 text-3xl font-bold">Web3 Onboard Demo</div>
      <div className="flex my-24">
        <div className="form-control">
          <div className="input-group">
            <input
              type="text"
              className="input input-bordered outline-none"
              value={toAddress}
              placeholder="address"
              onChange={(e) => setToAddress(e.target.value)}
            />
            <button onClick={sendTransaction} className="btn btn-square">
              Send
            </button>
          </div>
        </div>
      </div>
      <div className="flex">
        <button onClick={connectWallet} className="btn btn-primary mr-12">
          Connect
        </button>
        <button onClick={disconnectWallet} className="btn btn-secondary">
          Disconnect
        </button>
      </div>
    </div>
  )
}

export default App
