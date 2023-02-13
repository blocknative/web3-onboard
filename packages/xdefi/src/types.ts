import type { ExternalProvider } from '@ethersproject/providers'

interface CustomExternalProvider extends ExternalProvider {
  ethereum: { isXDEFI: boolean }
}
export interface CustomWindow extends Window {
  xfi: CustomExternalProvider
}
