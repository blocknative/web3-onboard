// Maps a wallet name from the provider to its display name
// Keys are the lower cased name derived from the `is` prop on the provider
// Example: provider.isCoinbaseWallet -> coinbasewallet
export const WALLET_NAMES: { [key: string]: string } = {
  alphawallet: 'AlphaWallet',
  atoken: 'AToken',
  binance: 'Binance Chain Wallet',
  bitpie: 'Bitpie',
  bitski: 'Bitski',
  coinbasewallet: 'Coinbase Wallet',
  dcentwallet: "D'CENT",
  metamask: 'MetaMask',
  detected: 'Detected Wallet',
  meetone: 'MeetOne',
  frame: 'Frame',
  bitkeep: 'BitKeep',
  sequence: 'Sequence',
  core: 'Core',
  enkrypt: 'Enkrypt',
  frontier: 'Frontier',
  zerion: 'Zerion'
}
