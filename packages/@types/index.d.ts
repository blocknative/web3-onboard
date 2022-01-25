declare module '*.png'
declare module 'window'
declare module '@keystonehq/eth-keyring'
declare const global: typeof globalThis & { window: CustomWindow }
