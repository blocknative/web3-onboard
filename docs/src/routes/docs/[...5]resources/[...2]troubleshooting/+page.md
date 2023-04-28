---
title: Troubleshooting
---

# {$frontmatter.title}

## Where's My Wallet? (Injected/Browser Extension)

This is a common problem and as the web3 space grows as do the pains of decentralized teams trying to find solutions that there are not standards for… yet.

### 1. Disabled Browser Extension

One reason why a desktop computer user may not see their browser-injected Ethereum-based blockchain wallets is that the browser extension may have been disabled. Some users may disable browser extensions to improve browser performance or to free up system resources. However, disabling the MetaMask extension will prevent users from accessing their wallet.

To check if the wallet extension has been disabled:

- Users should navigate to their browser's extension settings (for example in Chrome browser navigate to: _chrome://extensions/_)
- Ensure that the wallet extension is enabled by ensuring the toggle is blue.
- Once enabled, the wallet icon should appear in the browser toolbar, and users should be able to access their wallet within the dapp after a page reload.

### 2. Multiple Wallets Installed

Desktop users may also not see their browser injected wallets if they have multiple wallets installed. Some users may have installed multiple wallets, such as Coinbase Wallet, SafePal Wallet or Trust Wallet, in addition to MetaMask. Many times if a user has multiple wallets installed on their browser there is a collision in the space that the dapps use to detect the wallets and in some occasions only one wallet will be available.

This is the case with MetaMask which injects to the `window.ethereum` browser space as does many other wallets. With current EIP standards this space can only hold one wallet so the wallet that loads the slowest will override the previous and be the only wallet available.
To address this issue:

- Users should navigate to their browser's extension settings (within Chrome browser it is: _chrome://extensions/_ or you can click the puzzle piece in the extension row)
- Ensure that all other browser wallets are disabled (or not set to be the default web3 wallet) and your target wallet is enabled
- Once this is completed a refresh of the browser should give the dapp access to the desired wallet.

#### A secondary issue with multiple wallets installed

A secondary issue that may exist with multiple wallets installed is that some wallets have the ability to be set as the default browser wallet(usually enabled by default in these wallets). If another wallet is set as the default wallet, that usually means that wallet will override the `window.ethereum` space in the browser and MetaMask will not be able to inject its wallet provider for the dapp to use. This default setting can be updated within the wallet settings or by disabling the extension as shown above.
If you think this may be your issue but are having trouble determining steps to troubleshoot are:
Right click within the browser window and select `Inspect`

From here you will see a console window, type `window.ethereum` and hit enter

If `undefined` is displayed then you have no wallet injecting in this space (many wallets use a different space within the window, i.e. Binance wallet uses `window.binance`).

If you see a response returned you can click the small dropdown arrow and get more info on the wallet injected here - generally there will be a wallet name shown here with an `is${walletName}` i.e. `isMetamask = true`.
Disable that wallet, refresh the page and run the steps above again.

### 3. Brave browser default Web3 Wallet

Brave is a great browser and some of the best privacy, paid to view ads and even comes with a web3 wallet right off the bat! While this is all great it does come along with some challenges around web3 wallets. In the same vein as the issue noted above with conflicting wallets the built- in browser must be switched from the default wallet if you are wanting to use other browser based extension wallets such as MetaMask.

This can be done by:

- Selecting “Preferences” from the Brave dropdown
- Selecting “Web3” from the sidebar
- Changing the “Default Ethereum wallet” setting to “Brave Wallet (Prefer extensions)”

### 4. Outdated Browser or Extension

A desktop computer user may not see their browser-injected Ethereum-based web3 wallets if they are using an outdated browser or extension. MetaMask and other wallets may update their software frequently to address security concerns or to improve functionality. If a user is running an outdated version of their wallet extension or their browser, they may experience issues accessing their wallet.
To address this issue, users should ensure that they are running the latest version of their browser and MetaMask extension. Users can check for updates by navigating to their browser's extension settings(on Chrome browser navigate to _chrome://extensions/_) and selecting “Update” at the top of the extensions window, through the extension store or updating through the wallet’s website.

If you are still having issues feel free to visit the [Blocknative web3-onboard discord channel](https://discord.gg/4qZUshUY) or tag us on twitter for further support. We are always happy to assist and love working in the wallet space!
