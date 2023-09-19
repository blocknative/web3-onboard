import { EIP1193Provider } from '@web3-onboard/common'
export interface CustomWindow extends Window {
  bitkeep: EIP1193Provider & {
    isBitkeep?: boolean
  }
  ethereum: EIP1193Provider
}
