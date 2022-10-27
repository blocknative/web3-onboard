import type { ExternalProvider } from '@ethersproject/providers'
interface CustomExternalProvider extends ExternalProvider {
  isMEWwallet: boolean
  setChainId: (param: number) => {}
}
export interface CustomWindow extends Window {
  ethereum: CustomExternalProvider
}