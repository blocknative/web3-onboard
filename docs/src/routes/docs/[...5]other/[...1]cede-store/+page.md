---
title: cede.store
---

# {$frontmatter.title}

CEX Wallet module for connecting cede.store through Web3 Onboard. Check out the [cede.store Wallet Developer Docs](https://docs.cede.store) for more information.

:::admonition type=warning
Cede.store is not a traditional 1193 wallet, behavior is different in that there is no on-chain user address to interact with and there isn't a specific chain associated.
Dapp devs will need to handle accordingly through the exposed API and can expect the connect account to not be shown as a hex value (or at all) and the chain to always be 0x0 when a user connects with cede.store for that specific wallet account.
:::

### Install

<Tabs values={['yarn', 'npm']}>
<TabPanel value="yarn">

```sh copy
yarn add @web3-onboard/cede-store
```

  </TabPanel>
  <TabPanel value="npm">

```sh copy
npm install @web3-onboard/cede-store
```

  </TabPanel>
</Tabs>

## Usage

```typescript
import Onboard from '@web3-onboard/core'
import cedeStoreWalletModule from '@web3-onboard/cede-store'
const cedeStoreWallet = cedeStoreWalletModule()
const onboard = Onboard({
  // ... other Onboard options
  wallets: [
    cedeStoreWallet
    //... other wallets
  ]
})
const connectedWallets = await onboard.connectWallet()
console.log(connectedWallets)
```

## Vault management

Vaults allow creating bundles of CEX accounts. The extension connects with CEX through CEX API keys and everything is stored in the Local Storage of the browser, on a mobile or on a Ledger (more coming soon...). We can compare Vaults with the [Keyring concept](https://www.wispwisp.com/index.php/2020/12/25/how-metamask-stores-your-wallet-secret/) of Metamask.

A user can have multiple vaults with different CEX accounts inside.
This system allows the user to give a dApp custom access to his accounts depending on the degree of trust he has in the dApp in question.

Let's say the user has three vaults: a main one with full access (track, trade, withdraw) to all his CEX, one just for tracking and one just for trading.
If the user does not know the reputation of the dApp he is using, the most logical solution would be to give access
only to the tracking vault so the dApp will not be able to initiate trade requests.

## CEX connection

All requests are divided into two categories:

- private requests
- public requests

All public data, such as prices, volumes, historical data are collected from different exchanges and provided with our API.

All private requests, such as user balances, trades, open positions are coming from cede.store (from the user's machine).

You can access both public and private data through the extension's API. cede.store handles all exchanges requests, as well as API keys secure storage.

## Example of a workflow (fetch user's balances and transactions)

```typescript
// get available vaults and accounts
const { vaultPreview } = provider.getVaultPreviews()
console.log(vaultPreview)
// Fetch user's balances from Binance and Coinbase
const vaultId = vaultPreview[0].id
await provider.request({
  method: 'balances',
  params: {
    vaultId,
    accountNames: ['Binance 1', 'Coinbase 1']
  }
})
// Fetch user's transactions
await provider.request({
  method: 'transactions',
  params: {
    vaultId
  }
})
```

## Build Environments

For build env configurations and setups please see the Build Env section [here](/docs/modules/core#build-environments)
