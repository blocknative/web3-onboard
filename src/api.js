import { app, configuration, walletInterface } from "./stores"
import { validateConfig } from "./validation"

export function selectWallet() {
  return new Promise(resolve => {
    app.update(store => ({ ...store, selectWallet: true }))

    const appUnsubscribe = app.subscribe(
      ({ selectWallet, selectWalletCompleted }) => {
        if (selectWallet === false) {
          appUnsubscribe()
          resolve(selectWalletCompleted)
        }
      }
    )
  })
}

export function prepareWallet() {
  return new Promise(resolve => {
    walletInterface.subscribe(provider => {
      if (!provider) {
        throw new Error("selectWallet must be called before prepareWallet")
      }
    })

    app.update(store => ({ ...store, prepareWallet: true }))

    const appUnsubscribe = app.subscribe(
      ({ prepareWallet, prepareWalletCompleted }) => {
        if (prepareWallet === false) {
          appUnsubscribe()
          resolve(prepareWalletCompleted)
        }
      }
    )
  })
}

export function config(options) {
  validateConfig(options)
  configuration.update(store => ({ ...store, ...options }))
}
