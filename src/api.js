import { app, walletInterface, state } from "./stores"
import { validateConfig } from "./validation"

export function selectWallet() {
  return new Promise(resolve => {
    app.update(store => ({ ...store, selectWallet: true }))

    const appUnsubscribe = app.subscribe(
      ({ selectWallet, selectWalletCompleted }) => {
        if (selectWallet === false) {
          appUnsubscribe()
          setTimeout(() => resolve(selectWalletCompleted), 500)
        }
      }
    )
  })
}

export function prepareWallet() {
  return new Promise(resolve => {
    const interfaceUnsubscribe = walletInterface.subscribe(provider => {
      if (!provider) {
        throw new Error("selectWallet must be called before prepareWallet")
      }
    })

    interfaceUnsubscribe()

    app.update(store => ({ ...store, prepareWallet: true }))

    const appUnsubscribe = app.subscribe(
      ({ prepareWallet, prepareWalletCompleted }) => {
        if (prepareWallet === false) {
          appUnsubscribe()
          setTimeout(() => resolve(prepareWalletCompleted), 500)
        }
      }
    )
  })
}

export function config(options) {
  validateConfig(options)
  app.update(store => ({ ...store, ...options }))
}

export function getState() {
  return state.get()
}
