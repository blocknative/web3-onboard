import Web3ProviderEngine from 'web3-provider-engine'
import RpcSource from 'web3-provider-engine/subproviders/rpc'
import HookedWalletSubprovider from 'web3-provider-engine/subproviders/hooked-wallet'
import SubscriptionSubprovider from 'web3-provider-engine/subproviders/subscriptions'
import FilterSubprovider from 'web3-provider-engine/subproviders/filters'

function createProvider(config: any) {
  const { getAccounts, signTransaction, rpcUrl } = config

  const idMgmt = new HookedWalletSubprovider({ getAccounts, signTransaction })

  const rpcSubProvider = new RpcSource({
    rpcUrl: rpcUrl.includes('http') ? rpcUrl : `https://${rpcUrl}`
  })

  const provider = new Web3ProviderEngine()

  provider.addProvider(new SubscriptionSubprovider())
  provider.addProvider(new FilterSubprovider())
  provider.addProvider(idMgmt)
  provider.addProvider(rpcSubProvider)
  provider.start()

  return provider
}

export default createProvider
