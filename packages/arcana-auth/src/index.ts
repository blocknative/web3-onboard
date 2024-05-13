import { createEIP1193Provider, WalletInit } from '@web3-onboard/common'
import type { ConstructorParams } from '@arcana/auth/types'

export default function (opts: {
  clientID: string
  params?: ConstructorParams
}): WalletInit {
  return () => ({
    label: 'Arcana Auth',
    getIcon: async () => (await import('./icon.js')).default,
    async getInterface() {
      const { AuthProvider } = await import('@arcana/auth')

      const instance = new AuthProvider(opts.clientID, opts.params)
      await instance.init()
      return new Promise((resolve, reject) => {
        // @ts-ignore
        instance.provider.once('connect', () => {
          resolve({
            provider: createEIP1193Provider(instance.provider),
            instance
          })
        })
        instance.connect().catch(reject)
      })
    }
  })
}
