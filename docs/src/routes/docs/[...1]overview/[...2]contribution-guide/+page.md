---
title: Contribution Guide
---

# How can I contribute to web3-onboard?

[Report a Bug](#bug-reports-🐛)<br />
[Submit a Pull Request](#pull-requests-🗂️)<br />
[Add a Wallet](#how-can-i-add-a-new-wallet-💳)<br />
[Contribute to the Docs](#documentation-contributions-📄)<br />
[Share Feedback](#feedback-💬)<br />
[Get Support](#support-🤓)<br />

## Bug Reports 🐛

Before creating an issue for a bug, please search through the existing [Web3 Onboard issues](https://github.com/blocknative/web3-onboard/issues). You may find that someone else ran into the same bug or a fix has been released in a newer update.

If an issue does not already exist, follow the template instructions to create a new issue, adding as much detail as possible.

Once an issue is created, a Web3 Onboard maintainer will review and respond typically within a few days to share next steps.

## [Pull Requests 🗂️]

To create a new feature or change in Web3 Onboard, fork the repo and make a pull request on the [develop branch](https://github.com/blocknative/web3-onboard/tree/develop) to have your changes merged in and released as part of the official packages.

Once a PR is created, a Web3 Onboard maintainer will acknowledge it and add to sprint planning for review as soon as possible.

**Important Note: The PR template checklist must be complete before review can take place.**

### Package Versioning 📦

We use both semantic and `alpha` versioning for publishing and testing packages prior to official release. If you do not see an `-alpha.x` tag on the version of the package you made changes in, you will need to bump the version AND add an alpha flag followed by an alpha version number starting at 1 (ex. `-alpha.1`).

After making changes within a web3-onboard package, bump the version of the specific package:

Example : Adding a new injected wallet to the `injected` package -
[Injected Package.json](https://github.com/blocknative/web3-onboard/blob/develop/packages/injected/package.json#L3) changes : `"version": "2.2.4",` --> `"version": "2.3.0-alpha.1",`

Example 2 : Bug fix within the `core` package -
[Core package.json](https://github.com/blocknative/web3-onboard/blob/8531a73d69365f7d584320f1c4b97a5d90f1c34e/packages/core/package.json#L3) changes: `"version": "2.9.1-alpha.1",` --> `"version": "2.9.1-alpha.2",`

## [How can I add a new wallet? 💳]

To add a new wallet to the official Web3 Onboard packages and repo, create a [pull request](#pull-requests-🗂️). Web3 Onboard does not require a wallet to be a part of the main code, so a separate wallet module can be created without any changes to the Web3Onboard codebase. Your PR must include a detailed README for the package, keeping in mind that this README is the the first point of contact for dapp devs looking to implement your wallet.

Please also include updates to documentation in your PR. Refer to the [docs contributions section](#documentation-contributions-📄) and the PR template docs checklist.

### Adding Injected Wallets

If the wallet you are adding is an “injected” wallet (browser extension, mobile dapp browser wallet), add a wallet to the injected wallets module. [See here for an example of an injected wallets pull request.](https://github.com/blocknative/web3-onboard/pull/1177/files) You should also add the wallet to the [natively supported injected wallets list](../../wallets/injected.md#injected-wallets-supported-natively).

### Adding Wallet Modules

Otherwise, if the wallet you are adding requires dependencies and initialization (SDK), then you will need to create a new package in the Web3 Onboard monorepo. [See here for an example of a pull request.](https://github.com/blocknative/web3-onboard/pull/1238/files)
<br />
<br />

If you cannot write the code yourself to add a new wallet, create a new feature request issue to be considered by the maintainers and other contributors in the community.

## [Documentation Contributions 📄]

If you contribute to the code, you should definitely document appropriately.

In order to contribute to the docs, create a PR on the [develop branch](https://github.com/blocknative/web3-onboard/tree/develop). The PR description should include a screenshot of any changes.

**Important note: The PR template docs checklist must be complete before review can take place.**

PRs for adding/updating a wallet should include a README (new or updated) for the package (located in `docs/src/routes/docs/[...4]wallets`), and adding/updating the module in [docs demo](https://github.com/blocknative/web3-onboard/blob/develop/docs/src/lib/services/onboard.js) and docs package (`docs/package.json`). New injected wallets should also add the wallet to the [natively supported injected wallets list](https://github.com/blocknative/web3-onboard/blob/develop/docs/src/routes/docs/wallets/injected.md).

[See here for an example of a docs pull request.](https://github.com/blocknative/web3-onboard/pull/1544/files)

We highly encourage the community to help us improve the web3-onboard docs! If you have any questions don't hesitate to reach out.

## [Feedback 💬]

Did you have trouble integrating? Could the docs be improved? Have a new Feature request?
Jump in our [Discord](https://discord.com/invite/KZaBVME) and share your feedback.

## [Support 🤓]

For general questions about how to use Web3 Onboard please first check out our [docs](../../overview/introduction.md#features), then head to our [Discord](https://discord.com/invite/KZaBVME) for support from the Blocknative team.
