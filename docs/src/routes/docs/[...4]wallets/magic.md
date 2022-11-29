# Magic

Wallet module for connecting Magic wallets to Onboard V2

### Login options

- **Email** - The Magic module comes with a built in email login modal that is customizable
  in the same fashion that all other web3-onboard UI components are

:::admonition type=note

The Magic Module currently only supports email login but we are open to expand to sms or socials\*

:::

## Install

<Tabs values={['yarn', 'npm']}>
<TabPanel value="yarn">

```sh copy
yarn add @web3-onboard/magic
```

  </TabPanel>
  <TabPanel value="npm">

```sh copy
npm install @web3-onboard/magic
```

  </TabPanel>
</Tabs>

## Options

```typescript
type MagicInitOptions = {
  apiKey: string
  userEmail?: string // optional - if user has already logged in and/or session is still active a login modal will not appear
}
```

## Usage

```typescript
import Onboard from '@web3-onboard/core'
import magicModule from '@web3-onboard/magic'

const magic = magicModule({
  apiKey: 'API_KEY',
  userEmail: localStorage.getItem('magicUserEmail')
})

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

### Accessing the Magic Wallet configuration

When a Magic wallet is connected the Magic instance is exposed.
This can be used to get information such as user MetaData, update a user's email address or handle the user's token.
The user's email can be set in local storage and passed through the `MagicInitOptions` to avoid a user having to login again if they are returning to the DApp within the set user session time.
Magic has a default time of 7 days and this can be configured through your Magic API Key settings.

```typescript
const [magicWallet] = await onboard.connectWallet()

try {
  const { email, publicAddress } = await magicWallet.instance.user.getMetadata()
  localStorage.setItem('magicUserEmail', email)
  // This email can then be passed through the MagicInitOptions to continue the users session and avoid having to login again
} catch {
  // Handle errors if required!
}
```

For full documentation and examples please visit [Magic's official docs](https://magic.link/docs/api-reference/client-side-sdks/web#user-module)

## Custom Styling

The Magic Wallet Login styles can customized via [CSS variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties). The following properties and their default properties can be customized by adding these variables to the `:root` in your CSS file. If they are not specified they will fall back on the style variables prefixed with `--onboard` and beyond that to the styles developed by Blocknative:

```css
:root {
  /* *if not set will fallback to variables with `--onboard` prefix shown above */
  /* CUSTOMIZE THE COLOR  PALLETTE */
  --login-modal-white: white;
  --login-modal-black: black;
  --login-modal-primary-300: #b1b8f2;
  --login-modal-primary-500: #6370e5;
  --login-modal-gray-200: #c2c4c9;
  --login-modal-gray-500: #33394b;
  --login-modal-danger-500: #ff4f4f;

  /* FONTS */
  --login-modal-font-family-normal: Sofia Pro;
  --login-modal-font-family-light: Sofia Pro Light;
  --login-modal-font-size-5: 1rem;
  --login-modal-font-line-height-1: 24px;

  /* SPACING */
  --login-modal-margin-4: 1rem;
  --login-modal-margin-5: 0.5rem;

  /* MAGIC WALLET MODAL POSITIONING */
  --onboard-login-modal-z-index
  --onboard-login-modal-top
  --onboard-login-modal-bottom
  --onboard-login-modal-right
  --onboard-login-modal-left

}
```
