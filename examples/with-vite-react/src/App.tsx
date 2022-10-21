import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

import web3Onboard from './web3-onboard'
import { useConnectWallet } from '@web3-onboard/react'

function App() {
  const [count, setCount] = useState(0)

  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet()

  return (
    <div className="App">
      <div>
        <a href="https://onboard.blocknative.com" target="_blank">
          <img
            src="/blocknative.svg"
            className="logo blocknative"
            alt="Blocknative logo"
          />
        </a>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Web3-Onboard + Vite + React</h1>
      <div className="card">
        <button onClick={() => connect()}>connect</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Blocknative, Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
