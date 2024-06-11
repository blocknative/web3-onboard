import type { ConstructorOpts, Environment, CapsuleModalProps } from '@usecapsule/react-sdk'
/**
 * Options for initializing the Capsule environment.
 *
 * @typedef {Object} CapsuleInitOptions
 * @property {Environment} environment - Specifies the working environment for the application.
 *           'DEVELOPMENT' should be used for testing with non-real funds and wallets on a testnet.
 *           'PRODUCTION' should be used when the application is ready for live deployment with real transactions.
 * @property {string} [apiKey] - API key is necessary for performing transactions and wallet creation.
 *           This key needs to be obtained by completing a form available at https://7f4shq8oyfd.typeform.com/to/F86oVLhb.
 */

export type CapsuleModalPropsForInit = Omit<CapsuleModalProps,'isOpen' | 'capsule'>;

export type CapsuleInitOptions = {
  environment: Environment
  apiKey: string,
  constructorOpts?: Partial<ConstructorOpts>
  modalProps?: Partial<CapsuleModalPropsForInit>
  walletIcon?: () => Promise<string>
  walletLabel?: string 
}
