import { getProviderName, networkName } from '../../utilities'
import {
  WalletCheckModal,
  StateAndHelpers,
  WalletCheckCustomOptions,
  AppState
} from '../../interfaces'
import { networkIcon } from './icons'

import { app } from '../../stores'

function network(
  options: WalletCheckCustomOptions = {}
): (currentState: StateAndHelpers) => Promise<WalletCheckModal | undefined> {
  const { heading, description, icon, html, button } = options

  let networkCheckRequested = false
  let prevWalletCheckInProgressValue: boolean

  app.subscribe(({ walletCheckInProgress }: AppState) => {
    if (
      prevWalletCheckInProgressValue === false &&
      walletCheckInProgress === true
    ) {
      networkCheckRequested = false
    }
    prevWalletCheckInProgressValue = walletCheckInProgress
  })

  return async (stateAndHelpers: StateAndHelpers) => {
    const {
      network,
      appNetworkId,
      walletSelect,
      walletCheck,
      exit,
      stateSyncStatus,
      stateStore,
      wallet
    } = stateAndHelpers

    if (network === null) {
      // wait for network sync if is still on initial value
      if (stateSyncStatus.network) {
        await new Promise(resolve => {
          stateSyncStatus.network && stateSyncStatus.network.then(resolve)

          setTimeout(() => {
            if (network === null) {
              // if prom isn't resolving after 500ms, then stop waiting
              resolve(undefined)
            }
          }, 500)
        })
      }
    }
    // Adds a check for WalletConnect since it hangs for unsupported rpc methods
    if (
      !networkCheckRequested &&
      stateStore.network.get() != appNetworkId &&
      getProviderName(wallet?.provider) !== 'WalletConnect'
    ) {
      try {
        networkCheckRequested = true
        await wallet?.provider?.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x' + appNetworkId?.toString(16) }]
        })
      } catch (e) {
        // This error code indicates that the chain has not been added to MetaMask.
        if ((e as any)?.code === 4902 && wallet?.provider) await tryToAddChain(wallet.provider, appNetworkId);
        // Could not switch networks so proceed as normal through the checks
      }
    }

    if (stateStore.network.get() != appNetworkId) {
      return {
        heading: heading || 'You Must Change Networks',
        description:
          description ||
          `We've detected that you need to switch your wallet's network from <b>${networkName(
            network
          )}</b> to <b>${networkName(
            appNetworkId
          )}</b> for this Dapp. <br><br> <i style="font-size: inherit; font-family: inherit;">*Some wallets may not support changing networks. If you can not change networks in your wallet you may consider switching to a different wallet.</i>`,
        eventCode: 'networkFail',
        button: button || {
          onclick: async () => {
            exit(false, { switchingWallets: true })
            const walletSelected = await walletSelect()
            const walletReady = walletSelected && (await walletCheck())

            app.update((store: AppState) => ({
              ...store,
              switchingWallets: false,
              walletCheckCompleted: walletReady
            }))
          },
          text: 'Switch Wallet'
        },
        html,
        icon: icon || networkIcon
      }
    }
  }
}

async function tryToAddChain(provider:any, id:Number) {
  const index = id.toString() as keyof typeof PROVIDERS;
  const networkInfo = PROVIDERS[index];
  if(!networkInfo) return null;

  try {
    await provider.request({
      method: 'wallet_addEthereumChain',
      params: [
        networkInfo,
      ],
    });
  } catch (addError) {
    console.log('could not add chain', index);
    // handle "add" error
  }
}

const PROVIDERS = {
  "80001": { 
    chainId: '0x' + (80001).toString(16), // Hexadecimal version of 80001, prefixed with 0x
    chainName: "POLYGON Mumbai",
    nativeCurrency: {
        name: "MATIC",
        symbol: "MATIC",
        decimals: 18,
    },
    rpcUrls: ["https://rpc-mumbai.maticvigil.com/"],
    blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
    iconUrls: [""],
  },
  "137": { 
    chainId: '0x' + (137).toString(16), // Hexadecimal version of 80001, prefixed with 0x
    chainName: "POLYGON",
    nativeCurrency: {
        name: "MATIC",
        symbol: "MATIC",
        decimals: 18,
    },
    rpcUrls: ["https://polygon-rpc.com/"],
    blockExplorerUrls: ["https://polygonscan.com/"],
    iconUrls: [""],
  }
}

export default network
