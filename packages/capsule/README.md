# @web3-onboard/capsule

## Wallet module for connecting Capsule Embedded Wallets to Web3-Onboard

[Capsule](https://usecapsule.com/) is a signing solution that enables you to create secure embedded MPC wallets, allowing users to onboard with just an email or social login. Capsule wallets are recoverable, portable, and permissioned across different crypto applications, eliminating the need for users to create separate signers or contract accounts for each app.

### Getting Started

1. Visit the [Capsule Developer Portal](https://developer.usecapsule.com)
2. Create a new project
3. Generate an API key for your project
4. Configure your project settings and environments

### Installation

```bash
# Using npm
npm install @web3-onboard/capsule

# Using yarn
yarn add @web3-onboard/capsule

# Using pnpm
pnpm install @web3-onboard/capsule

# Using bun
bun add @web3-onboard/capsule
```

## Configuration Options

```typescript
export type CapsuleInitOptions = {
  // The environment to connect to (PROD or BETA)
  environment: Environment

  // Your Capsule API key from the developer portal
  apiKey: string

  // Optional: Additional constructor options for the Capsule client
  constructorOpts?: Partial<ConstructorOpts>

  // Optional: Customization props for the Capsule modal
  modalProps?: Partial<CapsuleModalProps>

  // Optional: Custom function to load wallet icon
  walletIcon?: () => Promise<string>

  // Optional: Custom label for the wallet
  walletLabel?: string
}
```

## Implementation

```typescript
import Onboard from '@web3-onboard/core'
import Capsule, { Environment } from '@usecapsule/react-sdk'
import capsuleModule from '@web3-onboard/capsule'

// Initialize Capsule client
const capsule = new Capsule(
  Environment.BETA, // Use Environment.PROD for production
  'YOUR_API_KEY' // Your API key from developer.usecapsule.com
)

// Initialize the Capsule module
const capsuleWallet = capsuleModule(capsule)

// Initialize web3-onboard
const onboard = Onboard({
  // ... other Onboard options
  wallets: [
    capsuleWallet
    //... other wallets
  ]
})

// Connect wallet
const connectedWallets = await onboard.connectWallet()
console.log(connectedWallets)
```

## Additional Resources

- [Capsule Documentation](https://docs.usecapsule.com/)
- [Developer Portal](https://developer.usecapsule.com)
