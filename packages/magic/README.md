# @web3-onboard/magic

## Wallet module for connecting Magic wallets to Onboard V2

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
const [magicWallet] = await onboard.connectWallet()

try {
  const { email, publicAddress } = await magicWallet.instance.user.getMetadata();
} catch {
  // Handle errors if required!
}
```
For full documentation and examples please visit [Magic's official docs](https://magic.link/docs/api-reference/client-side-sdks/web#user-module)

## Custom Styling

The Magic Wallet Login styles can customized via [CSS variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties). The following properties and their default properties can be customized by adding these variables to the `:root` in your CSS file. If they are not specified they will fall back on the style variables prefixed with `--onboard` and beyond that to the styles developed by Blocknative:

```css
:root {
  /* CUSTOMIZE THE COLOR  PALLETTE */
  --magic-wallet-login-modal-white: white;
  --magic-wallet-login-modal-black: black;
  --magic-wallet-login-modal-primary-300: #b1b8f2;
  --magic-wallet-login-modal-primary-500: #6370e5;
  --magic-wallet-login-modal-gray-200: #c2c4c9;
  --magic-wallet-login-modal-gray-500: #33394b;
  --magic-wallet-login-modal-danger-500: #ff4f4f;

  /* FONTS */
  --magic-wallet-login-modal-font-family-normal: Sofia Pro;
  --magic-wallet-login-modal-font-family-light: Sofia Pro Light;
  --magic-wallet-login-modal-font-size-5: 1rem;
  --magic-wallet-login-modal-font-line-height-1: 24px;

  /* SPACING */
  --magic-wallet-login-modal-margin-4: 1rem;
  --magic-wallet-login-modal-margin-5: 0.5rem;

  /* MAGIC WALLET MODAL POSITIONING */
  --magic-wallet-login-modal-z-index
  --magic-wallet-login-modal-top
  --magic-wallet-login-modal-bottom
  --magic-wallet-login-modal-right
  --magic-wallet-login-modal-left

}
```