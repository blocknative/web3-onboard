import type { EIP1193Provider } from '@web3-onboard/common'

export interface CustomWindow extends Window {
  okxwallet?: EIP1193Provider
}
