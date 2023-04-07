import type { Address } from 'types'

const addressRegex = /^0x[a-fA-F0-9]{40}$/

export function isAddress(address: string): address is Address {
  return addressRegex.test(address)
}

export function weiToEth(wei: string): string {
  const weiBigInt = BigInt(wei)
  const ethBigInt = weiBigInt / BigInt('1000000000000000000')
  return ethBigInt.toString()
}

import type { Chain as ViemChain } from 'viem'
export const viemChainIdToImport = async (
  chainIdnumber: number
): Promise<ViemChain | null> => {
  switch (chainIdnumber) {
    case 42161: {
      const { arbitrum } = await import('viem/chains')
      return arbitrum
    }
    case 421613: {
      const { arbitrumGoerli } = await import('viem/chains')
      return arbitrumGoerli
    }
    case 1313161554: {
      const { aurora } = await import('viem/chains')
      return aurora
    }
    case 1313161555: {
      const { auroraTestnet } = await import('viem/chains')
      return auroraTestnet
    }
    case 43114: {
      const { avalanche } = await import('viem/chains')
      return avalanche
    }
    case 43113: {
      const { avalancheFuji } = await import('viem/chains')
      return avalancheFuji
    }
    case 84531: {
      const { baseGoerli } = await import('viem/chains')
      return baseGoerli
    }
    case 288: {
      const { boba } = await import('viem/chains')
      return boba
    }
    case 1039: {
      const { bronos } = await import('viem/chains')
      return bronos
    }
    case 1038: {
      const { bronosTestnet } = await import('viem/chains')
      return bronosTestnet
    }
    case 56: {
      const { bsc } = await import('viem/chains')
      return bsc
    }
    case 97: {
      const { bscTestnet } = await import('viem/chains')
      return bscTestnet
    }
    case 7700: {
      const { canto } = await import('viem/chains')
      return canto
    }
    case 42220: {
      const { celo } = await import('viem/chains')
      return celo
    }
    case 44787: {
      const { celoAlfajores } = await import('viem/chains')
      return celoAlfajores
    }
    case 25: {
      const { cronos } = await import('viem/chains')
      return cronos
    }
    case 3737: {
      const { crossbell } = await import('viem/chains')
      return crossbell
    }
    case 53935: {
      const { dfk } = await import('viem/chains')
      return dfk
    }
    case 2000: {
      const { dogechain } = await import('viem/chains')
      return dogechain
    }
    case 9001: {
      const { evmos } = await import('viem/chains')
      return evmos
    }
    case 9000: {
      const { evmosTestnet } = await import('viem/chains')
      return evmosTestnet
    }
    case 250: {
      const { fantom } = await import('viem/chains')
      return fantom
    }
    case 4002: {
      const { fantomTestnet } = await import('viem/chains')
      return fantomTestnet
    }
    case 314: {
      const { filecoin } = await import('viem/chains')
      return filecoin
    }
    case 3141: {
      const { filecoinHyperspace } = await import('viem/chains')
      return filecoinHyperspace
    }
    case 31337: {
      const { foundry } = await import('viem/chains')
      return foundry
    }
    case 4689: {
      const { iotex } = await import('viem/chains')
      return iotex
    }
    case 4690: {
      const { iotexTestnet } = await import('viem/chains')
      return iotexTestnet
    }
    case 5: {
      const { goerli } = await import('viem/chains')
      return goerli
    }
    case 100: {
      const { gnosis } = await import('viem/chains')
      return gnosis
    }
    case 10200: {
      const { gnosisChiado } = await import('viem/chains')
      return gnosisChiado
    }
    case 1666600000: {
      const { harmonyOne } = await import('viem/chains')
      return harmonyOne
    }
    case 8217: {
      const { klaytn } = await import('viem/chains')
      return klaytn
    }
    case 1337: {
      const { localhost } = await import('viem/chains')
      return localhost
    }
    case 1: {
      const { mainnet } = await import('viem/chains')
      return mainnet
    }
    case 1088: {
      const { metis } = await import('viem/chains')
      return metis
    }
    case 599: {
      const { metisGoerli } = await import('viem/chains')
      return metisGoerli
    }
    case 1287: {
      const { moonbaseAlpha } = await import('viem/chains')
      return moonbaseAlpha
    }
    case 1284: {
      const { moonbeam } = await import('viem/chains')
      return moonbeam
    }
    case 1285: {
      const { moonriver } = await import('viem/chains')
      return moonriver
    }
    case 4242: {
      const { nexi } = await import('viem/chains')
      return nexi
    }
    case 66: {
      const { okc } = await import('viem/chains')
      return okc
    }
    case 10: {
      const { optimism } = await import('viem/chains')
      return optimism
    }
    case 420: {
      const { optimismGoerli } = await import('viem/chains')
      return optimismGoerli
    }
    case 137: {
      const { polygon } = await import('viem/chains')
      return polygon
    }
    case 80001: {
      const { polygonMumbai } = await import('viem/chains')
      return polygonMumbai
    }
    case 1442: {
      const { polygonZkEvmTestnet } = await import('viem/chains')
      return polygonZkEvmTestnet
    }
    case 1101: {
      const { polygonZkEvm } = await import('viem/chains')
      return polygonZkEvm
    }
    case 534353: {
      const { scrollTestnet } = await import('viem/chains')
      return scrollTestnet
    }
    case 11155111: {
      const { sepolia } = await import('viem/chains')
      return sepolia
    }
    case 391845894: {
      const { skaleBlockBrawlers } = await import('viem/chains')
      return skaleBlockBrawlers
    }
    case 1564830818: {
      const { skaleCalypso } = await import('viem/chains')
      return skaleCalypso
    }
    case 344106930: {
      const { skaleCalypsoTestnet } = await import('viem/chains')
      return skaleCalypsoTestnet
    }
    case 1351057110: {
      const { skaleChaosTestnet } = await import('viem/chains')
      return skaleChaosTestnet
    }
    case 1026062157: {
      const { skaleCryptoBlades } = await import('viem/chains')
      return skaleCryptoBlades
    }
    case 2046399126: {
      const { skaleEuropa } = await import('viem/chains')
      return skaleEuropa
    }
    case 476158412: {
      const { skaleEuropaTestnet } = await import('viem/chains')
      return skaleEuropaTestnet
    }
    case 2139927552: {
      const { skaleExorde } = await import('viem/chains')
      return skaleExorde
    }
    case 1273227453: {
      const { skaleHumanProtocol } = await import('viem/chains')
      return skaleHumanProtocol
    }
    case 1482601649: {
      const { skaleNebula } = await import('viem/chains')
      return skaleNebula
    }
    case 503129905: {
      const { skaleNebulaTestnet } = await import('viem/chains')
      return skaleNebulaTestnet
    }
    case 278611351: {
      const { skaleRazor } = await import('viem/chains')
      return skaleRazor
    }
    case 1350216234: {
      const { skaleTitan } = await import('viem/chains')
      return skaleTitan
    }
    case 1517929550: {
      const { skaleTitanTestnet } = await import('viem/chains')
      return skaleTitanTestnet
    }
    case 8082: {
      const { shardeumSphinx } = await import('viem/chains')
      return shardeumSphinx
    }
    case 841: {
      const { taraxa } = await import('viem/chains')
      return taraxa
    }
    case 842: {
      const { taraxaTestnet } = await import('viem/chains')
      return taraxaTestnet
    }
    case 40: {
      const { telos } = await import('viem/chains')
      return telos
    }
    case 41: {
      const { telosTestnet } = await import('viem/chains')
      return telosTestnet
    }
    case 888: {
      const { wanchain } = await import('viem/chains')
      return wanchain
    }
    case 999: {
      const { wanchainTestnet } = await import('viem/chains')
      return wanchainTestnet
    }
    case 50: {
      const { xdc } = await import('viem/chains')
      return xdc
    }
    case 51: {
      const { xdcTestnet } = await import('viem/chains')
      return xdcTestnet
    }
    case 1337803: {
      const { zhejiang } = await import('viem/chains')
      return zhejiang
    }
    case 324: {
      const { zkSync } = await import('viem/chains')
      return zkSync
    }
    case 280: {
      const { zkSyncTestnet } = await import('viem/chains')
      return zkSyncTestnet
    }
    default:
      return null
  }
}
