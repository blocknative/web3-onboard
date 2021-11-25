# Work in Progress Branch for Onboard V2

(note: not ready for production use)

## Test out the demo

If you would like to test out the current functionality of V2 in a small browser demo, then:

- Clone the repo: `git clone git@github.com:blocknative/onboard.git`
- Change in to the onboard directory: `cd onboard`
- Checkout the V2 feature branch: `git checkout feature/v2`
- Install the dependencies: `yarn`
- Setup the monorepo symlinks: `yarn setup`
- Build the packages: `yarn build`
- Change in to the demo package directory: `cd packages/demo`
- Start the demo server: `yarn dev`
- [View demo app in the browser](http://localhost:5000)

## Phase 1 Design Goals

- Onboard V1 Feature parity
- Separate all of the wallet modules in to their own installable packages. This will mean that:
  - Apps will only need to install the deps for the wallets they are using which will help with various build environment issues and bundle sizes
  - The onboard core functionality will stay lean and focused and will not require a release to fix or add a wallet module
- Allow an app to declare that it runs on multiple chains and to be able to switch between them, rather than setting a single networkId that the app runs on an enforcing that (V1)
- All wallet modules will now return a provider that has been patched so that it is compliant with the standards: EIP-1193, EIP-1102, EIP-3085 and EIP-3326. This will mean that app devs will not need to worry about the specifics of which wallet the user has selected to interact with it.
- Multiple wallets, with multiple accounts can be connected at the same time
- Simplified connection wallet flow via a single API call
- App can be initialised with multiple networks and can switch between them
