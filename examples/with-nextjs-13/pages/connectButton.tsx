import { useState } from 'react'
import type {OnboardAPI, WalletState} from '@web3-onboard/core'

const buttonStyles = {
  borderRadius: '6px',
  background: '#111827',
  border: 'none',
  fontSize: '18px',
  fontWeight: '600',
  cursor: 'pointer',
  color: 'white',
  padding: '14px 12px',
  marginTop: '40px',
  fontFamily: 'inherit'
}

let onboard: OnboardAPI

async function connect() {
  if (!onboard) {
    const {default: initOnboard} = await import('../web3-onboard')
    onboard = initOnboard()
  }

  return onboard.connectWallet()
}

async function disconnect(wallet: WalletState) {
  if (!onboard) {
    const {default: initOnboard} = await import('../web3-onboard')
    onboard = initOnboard()
  }

  onboard.disconnectWallet({label: wallet.label})
}

export default function ConnectButton() {
  const [{connecting, wallet}, setWalletState] = useState<{connecting: boolean, wallet: WalletState | null}>({connecting: false, wallet: null})
  return <button
  style={buttonStyles}
  disabled={connecting}
  onClick={async () => {
    
    if(wallet) {
      disconnect(wallet)
      setWalletState({connecting, wallet: null})
    } else {
      setWalletState({connecting: true, wallet})
      const [connectedWallet] = await connect()
      setWalletState({connecting: false, wallet: connectedWallet || wallet})
      
    }
  }}
>
  {connecting ? 'Connecting' : wallet ? 'Disconnect' : 'Connect'}
</button>
}