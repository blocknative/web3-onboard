---
title: Particle Network
---

# {$frontmatter.title}

Wallet module for connecting Particle Network to web3-onboard

## Install

<Tabs values={['yarn', 'npm']}>
<TabPanel value="yarn">

```sh copy
yarn add @web3-onboard/particle-network
```

  </TabPanel>
  <TabPanel value="npm">

```sh copy
npm install @web3-onboard/particle-network
```

  </TabPanel>
</Tabs>

## Options

See the [Particle Network Docs](https://docs.particle.network/developers/auth-service/sdks/web) for the extensive list of options.

## Usage

```typescript
import Onboard from '@web3-onboard/core'
import particleModule from '@web3-onboard/particle-network'

const particle = particleModule({
  projectId: 'YOUR PROJECT ID',
  clientKey: 'YOUR CLIENT KEY',
  appId: 'YOUR APP ID'
  // Can also add wallet object + preferredAuthType for further customization
})

const onboard = Onboard({
  // ... other Onboard options
  wallets: [
    particle
    //... other wallets
  ]
})

const connectedWallets = await onboard.connectWallet()
console.log(connectedWallets)
```

## Types

```typescript
/**
 * Enumerates the supported authentication types.
 */
type AuthTypes = 'email' | 'phone' | 'google' | 'apple' | 'twitter' | 'facebook' | 'microsoft' | 'linkedin' | 'github' | 'twitch' | 'discord';

/**
 * Interface that describes the preferred authentication type.
 * @property {AuthTypes} type - The preferred type of authentication.
 * @property {boolean} setAsDisplay - Indicates whether the type should be displayed within the UI.
 */
interface PreferredAuthType {
  type: AuthTypes;
  setAsDisplay: boolean;
}

/**
 * Options for initializing the Particle Auth module.
 * @property {string} projectId - Particle Network project ID.
 * @property {string} clientKey - Particle Network client key.
 * @property {string} appId - Particle Network application ID.
 * @property {string} [chainName] - (Optional) Specifies the name of the blockchain. Handled automatically if left blank.
 * @property {number} [chainId] - (Optional) Specifies the blockchain's numeric ID. Handled automatically if left blank.
 * @property {object} [wallet] - (Optional) Configuration for the wallet.
 * @property {AuthTypes | PreferredAuthType} [preferredAuthType] - (Optional) Specifies the preferred type of authentication.
 */
interface ParticleAuthModuleOptions {
  projectId: string;
  clientKey: string;
  appId: string;
  chainName?: string;
  chainId?: number;
  wallet?: object;
  preferredAuthType?: AuthTypes | PreferredAuthType;
}
```
