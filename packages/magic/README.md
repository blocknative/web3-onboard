# @web3-onboard/magic

## Wallet module for connecting Magic wallets to Onboard V2

### Login options

- **Email** - The Magic module comes with a built in email login modal that is customizable
in the same fashion that all other web3-onboard UI components are
* note: The Magic Module currently only supports email login but we are open to expand to sms or socials*

### Install

`npm i @web3-onboard/magic`

Head over to https://magic.link/ and sign up to get an API key

## Options

```typescript
type MagicInitOptions = {
  apiKey: string
  userEmail?: string  // optional - if user has already logged in and/or session is still active a login modal will not appear
}
```

## Usage

```typescript
import Onboard from '@web3-onboard/core'
import magicModule from '@web3-onboard/magic'

const magic = magicModule({ apiKey: 'API_KEY', userEmail: localStorage.getItem('magicUserEmail') })

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
When a Magic wallet is connected the Magic instance is exposed. 
This can be used to get information such as user MetaData, update a user's email address or handle the user's token.
The user's email can be set in local storage and passed through the `MagicInitOptions` to avoid a user having to login again if they are returning to the DApp within the set user session time. 
Magic has a default time of 7 days and this can be configured through your Magic API Key settings.
```typescript
const [magicWallet] = await onboard.connectWallet()

try {
  const { email, publicAddress } = await magicWallet.instance.user.getMetadata();
  localStorage.setItem('magicUserEmail', email) 
  // This email can then be passed through the MagicInitOptions to continue the users session and avoid having to login again
} catch {
  // Handle errors if required!
}
```
For full documentation and examples please visit [Magic's official docs](https://magic.link/docs/api-reference/client-side-sdks/web#user-module)
