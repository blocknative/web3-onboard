import type { EIP1193Provider } from '@web3-onboard/common'

export interface CustomWindow extends Window {
  gatewallet?: EIP1193Provider
}
