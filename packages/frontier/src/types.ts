import { EIP1193Provider } from '@web3-onboard/common'
export interface CustomWindow extends Window {
  ethereum: EIP1193Provider & {
    isFrontier?: boolean
  }
  frontier: {
    ethereum: EIP1193Provider
  }
}
