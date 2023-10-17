import { Show, createEffect, createMemo, createSignal } from 'solid-js'
import './App.css'
import { useWeb3Onboard } from './providers/onboard-provider/context'

const getCircularReplacer = () => {
  const seen = new WeakSet()
  return (key: any, value: any) => {
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) return '[Circular]'

      seen.add(value)
    }
    return value
  }
}

const textHighlighter = (object: any) => {
  const jsonString = JSON.stringify(object, getCircularReplacer(), 2)
  const htmlString = jsonString
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll(/("[^"]*"):/g, '<span class="json-key">$1</span>:')
    .replaceAll(/(": [^,]*)/g, '": <span class="json-value">$1</span>')

  const styledString = `<pre class="json">${htmlString}</pre>`
  return styledString
}

function SampleConnect() {
  const {
    wallets,
    connectedWallet,
    connectedChain,
    connectWallet,
    disconnectConnectedWallet
  } = useWeb3Onboard()
  const walletsString = createMemo(() =>
    textHighlighter(wallets().map(w => w.label))
  )
  const connectedWalletString = createMemo(() =>
    textHighlighter({
      label: connectedWallet()?.label,
      accounts: connectedWallet()?.accounts,
      chains: connectedWallet()?.chains
    })
  )
  const connectedChainString = createMemo(() =>
    textHighlighter(connectedChain())
  )

  const [showCard, setShowCard] = createSignal(false);
  createEffect(async () => {
    const connectWallet = connectedWallet()
    console.log('connectedWallet', connectWallet)
    if (connectWallet !== null && connectWallet.accounts.length > 0) {
      setShowCard(false)
    } else {
      setShowCard(true)
    }
  })
  return (
    <>
      <Show
        when={!showCard()}
        fallback={
          <button onClick={() => connectWallet()}> connect wallet</button>
        }
      >
        <h2>You connected the following wallets</h2>
        <code
          class="m-4 block border border-[#adbac7] p-4"
          innerHTML={walletsString()}
        />
        <div style={{ display: "block" }}>
          <h2>You are currently connected with</h2>
          <code
            style={{
              display: "block",
              margin: 4,
              border: '1px solid #adbac7',
              padding: 4
            }}
            innerHTML={connectedWalletString()}
          />
        </div>
        <div style={{ display: "block" }}>
          <h2>You are currently connected with</h2>
          <code
            style={{
              display: "block",
              margin: 4,
              border: '1px solid #adbac7',
              padding: 4
            }}
            innerHTML={connectedChainString()}
          />
          <button onClick={() => disconnectConnectedWallet()}>
            disconnect wallet
          </button>
        </div>
      </Show>
    </>
  )
}

export default SampleConnect
