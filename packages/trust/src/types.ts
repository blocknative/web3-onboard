import { EIP1193Provider } from '@web3-onboard/common'
export interface CustomWindow extends Window {
  ethereum: {
    isTrust?: boolean
  }
  trustwallet: EIP1193Provider
}
