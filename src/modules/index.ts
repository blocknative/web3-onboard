import select from './select'
import check from './check'
import {
  WalletCheckModule,
  WalletCheckInit,
  WalletSelectModuleOptions
} from '../interfaces'

const defaultHeading = 'Select a Wallet'
const defaultDescription = 'Please select a wallet to connect to this dapp:'
const defaultWalletExplanation = `Wallets are used to send, receive, and store digital assets like Ether. Wallets come in many forms. They are either built into your browser, an extension added to your browser, a piece of hardware plugged into your computer or even an app on your phone. For more information about wallets, see <a style="color: #4a90e2; font-size: 0.889rem; font-family: inherit;" class="bn-onboard-clickable" href="https://docs.ethhub.io/using-ethereum/wallets/intro-to-ethereum-wallets/" target="_blank" rel="noopener noreferrer">this explanation</a>.`

export default function initializeModules(
  networkId: number,
  walletSelectOptions: WalletSelectModuleOptions | undefined,
  walletCheck: Array<WalletCheckModule | WalletCheckInit> | undefined,
  isMobile: boolean
) {
  const wallets = select(
    walletSelectOptions && walletSelectOptions.wallets,
    networkId,
    isMobile
  )

  const {
    heading = defaultHeading,
    description = defaultDescription,
    explanation = defaultWalletExplanation,
    agreement
  } = walletSelectOptions || {}

  return {
    walletSelect: {
      heading,
      description,
      wallets,
      explanation,
      agreement
    },
    walletCheck: check(walletCheck, networkId)
  }
}
