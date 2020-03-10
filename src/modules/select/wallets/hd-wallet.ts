import HDKey from 'hdkey'
import { publicToAddress, toChecksumAddress } from 'ethereumjs-util'
import buffer from 'buffer'

const numberToGet = 30

export function generateAddresses(
  account: {
    publicKey: string
    chainCode: string
    path: string
  },
  offset: number
) {
  const { publicKey, chainCode, path } = account
  const hdk = new HDKey()

  hdk.publicKey = new buffer.Buffer(publicKey, 'hex')
  hdk.chainCode = new buffer.Buffer(chainCode, 'hex')

  const addresses = []

  for (let i = offset; i < numberToGet + offset; i++) {
    const dkey = hdk.deriveChild(i)
    const address = publicToAddress(dkey.publicKey, true).toString('hex')
    addresses.push({
      dPath: `${path}/${i}`,
      address: toChecksumAddress(address)
    })
  }

  return addresses
}

// import * as hdKey from 'ethereumjs-wallet/hdkey'

// export function generateAddresses(xpub: string, basePath: string, amount = 30) {
//   const node = new hdKey.fromExtendedKey(xpub)

//   const children = []

//   for (let i = 0; i < amount; i++) {
//     children.push({ childNode: node.deriveChild(i), dPath: `${basePath}/${i}` })
//   }

//   console.log({ children })

//   const addresses = children.map(({ childNode, dPath }) => ({
//     address: childNode.getWallet().getChecksumAddressString(),
//     dPath
//   }))

//   console.log({ addresses })

//   return addresses
// }
