import test from 'ava'
import InjectedWallet from '../src/index'

/**
 * Note about tests:
 * Since injected provider tests rely on the global window object
 * we have no choice but execute the tests serially. Thus, when adding tests
 * here make sure to use the `test.serial` method.
 */

test.beforeEach(() => {
  // Add the provider object to the window object
  global.window.ethereum = {}
})

test('InjectedWallet(): Can instantiate InjectedWallet', t => {
  const injectedWallet = new InjectedWallet()
  // If no errors thrown we pass the test
  t.pass()
})

test.serial(
  'InjectedWallet(wallets: { metamask: { name: WALLET_NAME } }: Can override wallet name',
  async t => {
    const WALLET_NAME_OVERRIDE = 'TEST'
    // Set the injected provider on the window to MetaMask
    global.window.ethereum.isMetaMask = true

    const injectedWallet = new InjectedWallet({
      wallets: { metamask: { name: WALLET_NAME_OVERRIDE } }
    })
    const info = await injectedWallet.getInfo()
    t.is(info?.name, WALLET_NAME_OVERRIDE)
  }
)

test.serial(
  'InjectedWallet(exclude: { metamask: false }: Metamask disabled',
  async t => {
    const WALLET_NAME_OVERRIDE = 'TEST'
    // Set the injected provider on the window to MetaMask
    global.window.ethereum.isMetaMask = true

    const injectedWallet = new InjectedWallet({
      exclude: { metamask: false }
    })
    const info = await injectedWallet.getInfo()
    t.is(info?.name, WALLET_NAME_OVERRIDE)
  }
)

test.serial(
  'InjectedWallet(exclude: { metamask: { desktop : false } }: Metamask not displayed on desktop',
  async t => {
    const WALLET_NAME_OVERRIDE = 'TEST'
    // Set the injected provider on the window to MetaMask
    global.window.ethereum.isMetaMask = true

    const injectedWallet = new InjectedWallet({
      wallets: { metamask: { name: WALLET_NAME_OVERRIDE } }
    })
    const info = await injectedWallet.getInfo()
    t.is(info?.name, WALLET_NAME_OVERRIDE)
  }
)

test.serial(
  'InjectedWallet.getInfo(): Injected Wallet returns correct wallet info for Metamask',
  async t => {
    // Set the injected provider on the window to MetaMask
    global.window.ethereum.isMetaMask = true

    const injectedWallet = new InjectedWallet()
    const info = await injectedWallet.getInfo()
    t.is(info?.name, 'MetaMask')
  }
)

test.serial(
  'InjectedWallet.getInfo(): Injected Wallet returns correct wallet info for an unknown wallet',
  async t => {
    // Set the injected provider on the window to an unknown detected wallet
    global.window.ethereum.isSomeUnknownProvider = true

    const injectedWallet = new InjectedWallet()
    const info = await injectedWallet.getInfo()
    t.is(info?.name, 'Detected Wallet')
  }
)
