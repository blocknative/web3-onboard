import type { Network, SignerWithOptionalCreator } from '@0xpass/passport'
import type { Chain } from 'viem'

/**
 * Options for initializing the Passport environment.
 *
 * @property {string} iconPath - Path to the icon image.
 * @property {string} scopeId - Identifier for the scope.
 * @property {SignerWithOptionalCreator} signer - Signer object with optional creator.
 * @property {string} [fallbackProvider] -  fallback provider URL e.g an alchemy or infura endpoint.
 * @property {Chain} [chain] - Optional blockchain chain configuration, defaults to mainnet.
 * @property {Network} [network] - Optional passport network configuration, defaults to Passport testnet.
 * @property {string} [encryptionSecret] - Optional encryption secret for securing data.
 */

export type PassportOptions = {
  iconPath: string
  scopeId: string
  signer: SignerWithOptionalCreator
  fallbackProvider: string
  chain?: Chain
  network?: Network
  encryptionSecret?: string
}
