# Migration Guide

**Web3-Onboard migration guide for upgrading from Onboard v1 to Web3-Onboard**

With Web3-Onboard, we’ve introduced significant architectural changes that allow us to provide you with a more robust and efficient web3 onboarding experience. While this upgrade may result in a few breaking changes, we hope the improved overall experience makes it worthwhile.

If you have `bnc-onboard` installed, you will need to install `web3-onboard` instead. The basic steps you need to take to get started are:

- Uninstall bnc-onboard: `npm uninstall bnc-onboard`
- Install `npm i @web3-onboard/core`. You can then go ahead and install other specific wallet modules you want.
- Initialize Onboard with the wallets you’ve installed along with the network chains you would like to support.
- Make use of our API actions like `await onboard.connectWallet()` to allow a user to connect their wallets.

To help you get started quickly, regardless of the framework you're using, we’ve put together a [quickstart](https://docs.blocknative.com/onboard#quickstart) that includes the above-mentioned steps.

## Package Upgrade - Modularization

If you’re an Onboard user, this is the biggest change you might experience. With Web3-Onboard, we’ve separated all supported wallets into their modules, meaning you only need to integrate specific wallet modules you intend to support in your app.

So, for example, with Onboard v1, if you wanted to support only Metamask and Coinbase in your app, you had to install Onboard complete with all other wallets: `npm install bnc-onboard`

With Web3-Onboard, you only need to install core along with the desired wallet modules: `npm i @web3-onboard/core @web3-onboard/injected-wallets @web3-onboard/coinbase`

This change allows us to support many web3 wallets without affecting the overall library performance.

## Expansive Initialization Options

With Web3-Onboard, we’ve made initialization simpler while introducing more powerful options like the [Account Center](https://www.blocknative.com/blog/multichain-and-multiwallet-account-management-on-your-dapp-with-account-center) and Notify.

Onboard now requires two compulsory initial setup options: `wallets` (Wallet modules, as shown above, to be initialized and added to wallet selection modal) and `chains` (EVM networks your app should work with). You can also pass multiple wallets and chains.

```typescript
const onboard = Onboard({
  wallets: [injected, coinbase],
  chains: [
    {
      id: '0x1',
      token: 'ETH',
      label: 'Ethereum Mainnet',
      rpcUrl: MAINNET_RPC_URL
    }
  ]
})
```

You can have a look at our [documentation for the list of options](https://docs.blocknative.com/onboard/core#initialization) you can pass to the Onboard `init` function.

## API Upgrades

We've also added a number of API enhancements to help you create an onboarding experience faster. For example, previously, you had to call `walletSelect` and `walletCheck` API to get a user connected:

```
 await onboard.walletSelect();
 await onboard.walletCheck();
```

Now, you only need to call the connectWallet API: `await onboard.connectWallet()`

You can learn more about [state changes](https://docs.blocknative.com/onboard/core#state) tracked with the Onboard API and the [exposed actions you can use to modify the state](https://docs.blocknative.com/onboard/core#actions-to-modify-state).

## Framework Support

Although Onboard is still framework-agnostic, we’ve introduced a couple of framework-specific modules that are frequently asked for by our users.

`@web3-onboard/react` - React Hooks to connect users to web3 dApps better. You can check out a comprehensive React Hooks guide we've written on that.
`@web3-onboard/vue` - A set of reusable functions for integrating Web3-Onboard into a Vue 3 project. This is also compatible with a Vue 2 + composition-api dapp.

## CSS Customizations

We've also added more expansive custom CSS properties so you can style every part of your onboarding experience to match the overall experience of your dApp. To apply Web3-Onboard CSS customizations, you don't need to attach them to the `.bn-onboard-custom` class like before. Instead, you can simply place them in the `:root` CSS pseudo-class, as shown below.

```css
:root {
    /* CUSTOMIZE THE COLOR PALLETTE */
    --onboard-success-100: #d1fae3;
    /* CUSTOMIZE ACCOUNT CENTER */
    --account-center-z-index: 30
    /* CUSTOMIZE THE SHARED MODAL */
    --onboard-modal-color: #ffe5e6;
    /* CUSTOMIZE THE CONNECT MODAL */
    --onboard-font-size-1: 3rem;
    /* HD WALLET ACCOUNT SELECT MODAL POSITIONING */
    --onboard-account-select-modal-z-index : 1;
    /* COLORS */
    --account-select-modal-primary-100: #eff1fc;
    /* SPACING */
    --account-select-modal-margin-5: 0.5rem;
}
```

Here’s the [full list of all available CSS variables](https://docs.blocknative.com/onboard/core#custom-styling) for Web3-Onboard.

## Other Important Changes

There are also other notable infrastructural changes in Web3-Onboard:

- Dynamic Imports of dependencies
- Wallet Provider Standardization
- Support for Chain ID in decimal format

If you have questions or requests, please feel free to drop by the [community-support discord channel](https://discord.com/channels/542403978693050389/542406894677917699) or [create a PR or issue on GitHub](https://github.com/blocknative/web3-onboard/issues/new/choose).
