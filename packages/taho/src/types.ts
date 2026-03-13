import type { ExternalProvider } from '@ethersproject/providers'
export interface CustomWindow extends Window {
  tally: ExternalProvider
}
