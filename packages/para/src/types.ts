import type {
  ConstructorOpts,
  Environment,
  ParaModalProps
} from '@getpara/react-sdk'
/**
 * Options for initializing the Para environment.
 *
 * @typedef {Object} ParaInitOptions
 * @property {Environment} environment - Specifies the working environment for the application.
 *           'DEVELOPMENT' should be used for testing with non-real funds and wallets on a testnet.
 *           'PRODUCTION' should be used when the application is ready for live deployment with real transactions.
 * @property {string} [apiKey] - API key is necessary for performing transactions and wallet creation.
 *           This key needs to be obtained by completing a form available at https://7f4shq8oyfd.typeform.com/to/F86oVLhb.
 */

export type ParaModalPropsForInit = Omit<ParaModalProps, 'isOpen' | 'para'>

export type ParaInitOptions = {
  environment: Environment
  apiKey: string
  constructorOpts?: Partial<ConstructorOpts>
  modalProps?: Partial<ParaModalPropsForInit>
  walletIcon?: () => Promise<string>
  walletLabel?: string
}
