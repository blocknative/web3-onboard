import Torus from '@toruslabs/torus-embed'
import { networkName } from '../../../utilities'
import {
  TorusOptions,
  CommonWalletOptions,
  WalletModule
} from '../../../interfaces'

import torusIcon from '../wallet-icons/icon-torus'

function torus(options: TorusOptions & CommonWalletOptions): WalletModule {
  const {
    networkId,
    preferred,
    label,
    iconSrc,
    svg,
    buildEnv,
    buttonPosition,
    enableLogging,
    loginMethod,
    showTorusButton
  } = options

  return {
    name: label || 'Torus',
    svg: svg || torusIcon,
    iconSrc,
    wallet: async () => {
      const instance = new Torus({
        buttonPosition: buttonPosition // default: bottom-left
      })

      await instance.init({
        buildEnv: buildEnv, // default: production
        enableLogging: enableLogging, // default: false
        network: {
          host: networkName(networkId), // default: mainnet
          chainId: networkId, // default: 1
          networkName: `${networkName(networkId)} Network` // default: Main Ethereum Network
        },
        showTorusButton: showTorusButton // default: true
      })

      const provider = instance.provider

      return {
        provider,
        instance,
        interface: {
          name: 'Torus',
          connect: async () => {
            let result = await instance.login({ verifier: loginMethod })
            return { message: result[0] }
          },
          disconnect: () => instance.cleanUp(),
          address: {
            get: () => Promise.resolve(instance.web3.eth.accounts[0])
          },
          network: {
            get: () => Promise.resolve(Number(instance.web3.version.network))
          },
          balance: {
            get: () =>
              new Promise(async (resolve, reject) => {
                instance.web3.eth.getBalance(
                  instance.web3.eth.accounts[0],
                  (err: any, data: any) => {
                    if (err) {
                      reject(`Error while checking Balance: ${err}`)
                    } else {
                      resolve(data.toString(10))
                    }
                  }
                )
              })
          }
        }
      }
    },
    desktop: true,
    mobile: true,
    url: 'https://app.tor.us/',
    preferred
  }
}

export default torus
