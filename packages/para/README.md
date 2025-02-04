# @web3-onboard/para

## Wallet module for connecting Para Embedded Wallets to Web3-Onboard

[Para](https://getpara.com/) is a signing solution that enables you to create secure embedded MPC wallets, allowing users to onboard with just an email or social login. Para wallets are recoverable, portable, and permissioned across different crypto applications, eliminating the need for users to create separate signers or contract accounts for each app.

### Getting Started

1. Visit the [Para Developer Portal](https://developer.getpara.com)
2. Create a new project
3. Generate an API key for your project
4. Configure your project settings and environments

### Installation

```bash
# Using npm
npm install @web3-onboard/para

# Using yarn
yarn add @web3-onboard/para

# Using pnpm
pnpm install @web3-onboard/para

# Using bun
bun add @web3-onboard/para
```

## Configuration Options

```typescript
export type ParaInitOptions = {
  // The environment to connect to (PROD or BETA)
  environment: Environment

  // Your Para API key from the developer portal
  apiKey: string

  // Optional: Additional constructor options for the Para client
  constructorOpts?: Partial<ConstructorOpts>

  // Optional: Customization props for the Para modal
  modalProps?: Partial<ParaModalProps>

  // Optional: Custom function to load wallet icon
  walletIcon?: () => Promise<string>

  // Optional: Custom label for the wallet
  walletLabel?: string
}
```

## Implementation

```typescript
import Onboard from '@web3-onboard/core'
import Para, { Environment } from '@getpara/react-sdk'
import paraModule from '@web3-onboard/para'

// Initialize Para client
const para = new Para(
  Environment.BETA, // Use Environment.PROD for production
  'YOUR_API_KEY' // Your API key from developer.getpara.com
)

// Initialize the Para module
const paraWallet = paraModule(para)

// Initialize web3-onboard
const onboard = Onboard({
  // ... other Onboard options
  wallets: [
    paraWallet
    //... other wallets
  ]
})

// Connect wallet
const connectedWallets = await onboard.connectWallet()
console.log(connectedWallets)
```

## Additional Resources

- [Para Documentation](https://docs.getpara.com/)
- [Developer Portal](https://developer.getpara.com)
