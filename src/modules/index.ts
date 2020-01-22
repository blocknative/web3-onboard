import select from './select'
import check from './check'
import {
  WalletSelectModule,
  WalletCheckModule,
  WalletCheckInit
} from '../interfaces'

const defaultHeading = 'Select a Wallet'
const defaultDescription = 'Please select a wallet to connect to this dapp:'

export default function initializeModules(
  networkId: number,
  walletSelect: WalletSelectModule | undefined,
  walletCheck: Array<WalletCheckModule | WalletCheckInit> | undefined
) {
  const wallets = select(walletSelect && walletSelect.wallets, networkId)

  return {
    walletSelect: {
      heading: (walletSelect && walletSelect.heading) || defaultHeading,
      description:
        (walletSelect && walletSelect.description) || defaultDescription,
      wallets
    },
    walletCheck: check(walletCheck, networkId, wallets)
  }
}
