# @web3-onboard/magic

## Wallet module for connecting Ledger hardware wallets to Onboard V2

### Login options

- **Email** - The Magic module comes with a built in email login modal that is customizable
in the same fashion that all other web3-onboard UI components are
* note: The Magic Module currently only supports email login but we are open to expand to sms or socials*

### Install

`npm i @web3-onboard/magic`

Head over to https://magic.link/ and signup to get an API key

## Options

```typescript
type magicOptions = {
  apiKey: string
}
```

## Usage

```typescript
import Onboard from '@web3-onboard/core'
import magicModule from '@web3-onboard/magic'

const magic = magicModule({ apiKey: 'API_KEY' })

const onboard = Onboard({
  // ... other Onboard options
  wallets: [
    magic
    //... other wallets
  ]
})

const connectedWallets = await onboard.connectWallet()
console.log(connectedWallets)
```

### Accessing the Magic Wallet Internals
When a Magic wallet is connect the Magic instance is exposed. 
This can be used to get information such as user MetaData, update a user's email address or handle the user's token.
```typescript
const wallet = {
  label,
  icon: loadedIcon,
  provider,
  accounts: [],
  chains: [{ namespace: 'evm', id: '0x1' }],
  instance
}

// Assumes a user is already logged in
try {
  const { email, publicAddress } = await m.user.getMetadata();
} catch {
  // Handle errors if required!
}
```
For full documentation and examples please visit [Magic's official docs](https://magic.link/docs/api-reference/client-side-sdks/web#user-module)
