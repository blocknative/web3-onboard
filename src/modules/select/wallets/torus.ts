import { networkName } from '../../../utilities'
import { TorusOptions, WalletModule } from '../../../interfaces'

import torusIcon from '../wallet-icons/icon-torus'

function torus(options: TorusOptions & { networkId: number }): WalletModule {
  const {
    networkId,
    preferred,
    label,
    iconSrc,
    svg,
    buttonPosition,
    modalZIndex,
    apiKey,
    buildEnv,
    enableLogging,
    enabledVerifiers,
    loginConfig,
    showTorusButton,
    integrity,
    whiteLabel,
    loginMethod
  } = options

  let account: string

  return {
    name: label || 'Torus',
    svg: svg || torusIcon,
    iconSrc,
    wallet: async () => {
      const { default: Torus } = await import('@toruslabs/torus-embed')
      const instance = new Torus({
        buttonPosition, // default: bottom-left
        modalZIndex,
        apiKey
      })

      await instance.init({
        buildEnv, // default: production
        enableLogging, // default: false
        network: {
          host: networkName(networkId), // default: mainnet
          chainId: networkId, // default: 1
          networkName: `${networkName(networkId)} Network` // default: Main Ethereum Network
        },
        showTorusButton: showTorusButton, // default: true
        enabledVerifiers: enabledVerifiers,
        loginConfig,
        integrity,
        whiteLabel
      })

      const provider = instance.provider

      return {
        provider,
        instance,
        interface: {
          name: 'Torus',
          connect: async () => {
            const result = await instance.login({ verifier: loginMethod })
            account = result[0]
            return { message: result[0] }
          },
          disconnect: () => instance.cleanUp(),
          address: {
            get: () => Promise.resolve(account)
          },
          network: {
            get: () => Promise.resolve(Number(networkId))
          },
          balance: {
            get: () =>
              new Promise(async (resolve, reject) => {
                instance.web3.eth.getBalance(
                  account,
                  instance.web3.eth.defaultBlock,
                  (err: any, data: string) => {
                    if (err) {
                      reject(`Error while checking Balance: ${err}`)
                    } else {
                      resolve(data.toString())
                    }
                  }
                )
              })
          },
          dashboard: () => instance.showWallet('home')
        }
      }
    },
    type: 'sdk',
    desktop: true,
    mobile: true,
    preferred
  }
}

export default torus
