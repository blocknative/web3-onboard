<script>
  import Container from './Container.svelte'
  import CodeBlock from './base/CodeBlock.svelte'

  let examplecode = `import Onboard from '@web3-onboard/core'
import injectedModule from '@web3-onboard/injected-wallets'
import { ethers } from 'ethers'

const MAINNET_RPC_URL = 'https://mainnet.infura.io/v3/<INFURA_KEY>'

const injected = injectedModule()

const onboard = Onboard({
wallets: [injected],
chains: [
  {
    id: '0x1',
    token: 'ETH',
    label: 'Ethereum Mainnet',
    rpcUrl: MAINNET_RPC_URL
  }
]
})

const wallets = await onboard.connectWallet()

console.log(wallets)

if (wallets[0]) {
// create an ethers provider with the last connected wallet provider
const ethersProvider = new ethers.providers.Web3Provider(
  wallets[0].provider,
  'any'
)

const signer = ethersProvider.getSigner()

// send a transaction with the ethers provider
const txn = await signer.sendTransaction({
  to: '0x',
  value: 100000000000000
})

const receipt = await txn.wait()
console.log(receipt)
}`
</script>

<section>
  <!-- <Container> -->
  <div class="container">
    <h1>{'Getting Started'}</h1>
    <h2>{'Installation'}</h2>
    <p>
      {'Install the core Onboard library and the injected wallets module to support browser extension and mobile wallets:'}
    </p>
    <CodeBlock>
      {'npm i @web3-onboard/core @web3-onboard/injected-wallets'}
    </CodeBlock>
    <h2>{'Quick Start'}</h2>
    <p>{'Then initialize in your app:'}</p>

    <CodeBlock>{examplecode}</CodeBlock>
  </div>
  <!-- </Container> -->
</section>

<style>
  section {
    /* min-height: 1648px; */
    /* grey/100 */
    background: #ebebed;
    color: black;
  }

  h1 {
    /* F1 */
    font-family: 'Sofia Pro';
    font-style: normal;
    font-weight: 400;
    font-size: 48px;
    line-height: 64px;
  }

  h2 {
    /* F3 */
    font-family: 'Sofia Pro';
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    line-height: 32px;
  }

  p {
    /* F4 */
    font-family: 'Sofia Pro';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 32px;
  }

  .container {
    /* display: flex;
    flex-flow: column; */
    width: auto;
    max-width: 800px;
    margin: 0 auto;
    padding: 3rem 2rem;
  }
</style>
