import type { ExternalProvider } from '@ethersproject/providers'
interface CustomExternalProvider extends ExternalProvider {
  isMEWwallet: boolean
}
export interface CustomWindow extends Window {
  ethereum: CustomExternalProvider
}