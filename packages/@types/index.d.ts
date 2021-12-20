declare module '*.png'
declare module 'window'
declare const global: typeof globalThis & { window: CustomWindow }
