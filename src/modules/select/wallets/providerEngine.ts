import Web3ProviderEngine from 'web3-provider-engine'
import RpcSource from 'web3-provider-engine/subproviders/rpc'
import HookedWalletSubprovider from 'web3-provider-engine/subproviders/hooked-wallet'
import SubscriptionSubprovider from 'web3-provider-engine/subproviders/subscriptions'
import FilterSubprovider from 'web3-provider-engine/subproviders/filters'

import { get } from 'svelte/store'

import { app } from '../../../stores'

function createProvider(config: any) {
  const {
    getAccounts,
    signTransaction,
    rpcUrl,
    processMessage,
    processPersonalMessage,
    signMessage,
    signPersonalMessage,
    signTypedMessage
  } = config

  const pollingInterval = get(app).blockPollingInterval

  const idMgmt =
    getAccounts &&
    new HookedWalletSubprovider({
      getAccounts,
      signTransaction,
      processMessage,
      processPersonalMessage,
      signMessage,
      signPersonalMessage,
      signTypedMessage
    })

  const rpcSubProvider = new RpcSource({
    rpcUrl: rpcUrl.includes('http') ? rpcUrl : `https://${rpcUrl}`
  })

  const provider = new Web3ProviderEngine({ pollingInterval })

  provider.addProvider(new SubscriptionSubprovider())
  provider.addProvider(new FilterSubprovider())
  idMgmt && provider.addProvider(idMgmt)
  provider.addProvider(rpcSubProvider)
  provider.start()

  provider.on('error', console.error)

  return provider
}

export default createProvider
