declare module 'fortmatic'
declare module 'squarelink'
declare module '@walletconnect/web3-provider'
declare module 'web3-provider-engine'
declare module 'web3-provider-engine/subproviders/rpc'
declare module 'web3-provider-engine/subproviders/hooked-wallet'
declare module 'web3-provider-engine/subproviders/subscriptions'
declare module 'web3-provider-engine/subproviders/filters'
declare module 'trezor-connect'
declare module 'ethereumjs-tx'
declare module 'ethereumjs-util'
declare module 'hdkey'
declare module '@ledgerhq/hw-app-eth'
declare module '@ledgerhq/hw-transport-u2f'

declare module '*.png'
declare module '*.svg'

declare module 'svelte-i18n' {
  interface Options {
    fallback: string
    navigator: boolean
  }
  export function getClientLocale(options: Options): string

  export namespace _ {
    export function subscribe(dictionary: any): void
  }

  export namespace dictionary {
    export function set(dictionary: any): void
  }

  export namespace locale {
    export function set(locale: string): void
  }
}
