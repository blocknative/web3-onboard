# Venly

Wallet module for connecting Venly Wallet SDK to web3-onboard. Check out the [Venly Docs](https://docs.venly.io/) for more information.
## Install

<Tabs values={['yarn', 'npm']}>
<TabPanel value="yarn">

```sh copy
yarn add @web3-onboard/venly
```

  </TabPanel>
  <TabPanel value="npm">

```sh copy
npm install @web3-onboard/venly
```

  </TabPanel>
</Tabs>

## Options

```typescript
type VenlyOptions = {
  clientId: string
  environment?: string
}
```

`clientId` - The Client ID used to connect with Venly. More information can be found [here](https://docs.venly.io/widget/deep-dive/authentication#client-id).
`environment` - The environment to which you want to connect, possible values are 'staging' and 'production'. Defaults to 'production'.

**NOTE**: Production environment handles main networks while Staging handles test networks. List of supported networks can be found [here](https://docs.venly.io/api/deep-dive-1/environments-and-networks#blockchain-networks).

## Usage

```typescript
import Onboard from '@web3-onboard/core'
import venlyModule from '@web3-onboard/venly'

// initialize the module with options
const venly = venlyModule({ 
  clientId: 'YOUR_CLIENT_ID',
})

const onboard = Onboard({
  // ... other Onboard options
  wallets: [
    venly
    //... other wallets
  ]
})

const connectedWallets = await onboard.connectWallet()
console.log(connectedWallets)
```

## Build Environments
For build env configurations and setups please see the Build Env section [here](/docs/modules/core#build-environments)
