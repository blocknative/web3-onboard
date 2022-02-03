declare module '*.png'
declare module 'window'
declare module '@keystonehq/eth-keyring'
declare module 'hdkey'
declare const global: typeof globalThis & { window: CustomWindow }
