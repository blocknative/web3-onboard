<script>
  import HomeLayout from '$lib/components/HomeLayout.svelte'
  import HeroSection from '$lib/components/HeroSection.svelte'
  import FeaturesSection from '$lib/components/FeaturesSection.svelte'
  import ThemingSection from '$lib/components/ThemingSection.svelte'
  import TestimonialSection from '$lib/components/TestimonialSection.svelte'
  import GettingStarted from '$lib/components/GettingStarted.svelte'
</script>

<HomeLayout>
<HeroSection slot="hero">
  <Tabs values={['npm', 'yarn']} slot="code">
  <TabPanel value="npm">

```sh copy
npm i @web3-onboard/core @web3-onboard/injected-wallets @web3-onboard/transaction-preview
```

  </TabPanel>
  <TabPanel value="yarn">

```sh copy
yarn add @web3-onboard/core @web3-onboard/injected-wallets @web3-onboard/transaction-preview
```

  </TabPanel>
  </Tabs>
</HeroSection>

<FeaturesSection slot="features">
  <Tabs values={['npm', 'yarn']} slot="install">
  <TabPanel value="npm">

```sh copy
npm i @web3-onboard/core @web3-onboard/injected-wallets @web3-onboard/transaction-preview
```

  </TabPanel>
  <TabPanel value="yarn">

```sh copy
yarn add @web3-onboard/core @web3-onboard/injected-wallets @web3-onboard/transaction-preview
```

  </TabPanel>
  </Tabs>
  <Tabs values={['npm', 'yarn']} slot="installTp">
  <TabPanel value="npm">

```sh copy
npm i @web3-onboard/core @web3-onboard/injected-wallets @web3-onboard/transaction-preview
```

  </TabPanel>
  <TabPanel value="yarn">

```sh copy
yarn add @web3-onboard/core @web3-onboard/injected-wallets @web3-onboard/transaction-preview
```

  </TabPanel>
  </Tabs>
</FeaturesSection>

<ThemingSection slot="theming">

  <div slot="themingCode">

```css copy
:root {
  --w3o-background-color: #1a1d26;
  --w3o-foreground-color: #242835;
  --w3o-text-color: #eff1fc;
  --w3o-border-color: #33394b;
  --w3o-action-color: #929bed;
  --w3o-border-radius: 16px;
}
```

  </div>

</ThemingSection>

<TestimonialSection slot="testimonial"/>

<GettingStarted slot="gettingStarted">
<div slot="gettingStarted">

# Getting Started

## Installation

Install the core Onboard library and the injected wallets module to support browser extension and mobile wallets:

```bash copy
npm i @web3-onboard/core @web3-onboard/injected-wallets
```

## Quick Start

Then initialize in your app:

```js copy lineNumbers
import Onboard from '@web3-onboard/core'
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
    },
    {
      id: '0x2105',
      token: 'ETH',
      label: 'Base',
      rpcUrl: 'https://mainnet.base.org'
    }
  ]
})

const wallets = await onboard.connectWallet()

console.log(wallets)

if (wallets[0]) {
  // create an ethers provider with the last connected wallet provider
  const ethersProvider = new ethers.providers.Web3Provider(wallets[0].provider, 'any')
  // if using ethers v6 this is:
  // ethersProvider = new ethers.BrowserProvider(wallet.provider, 'any')

  const signer = ethersProvider.getSigner()

  // send a transaction with the ethers provider
  const txn = await signer.sendTransaction({
    to: '0x',
    value: 100000000000000
  })

  const receipt = await txn.wait()
  console.log(receipt)
}
```

</div>
</GettingStarted>

</HomeLayout>
