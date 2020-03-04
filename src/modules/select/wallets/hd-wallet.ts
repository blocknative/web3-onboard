import HDKey from 'hdkey'
import { publicToAddress, toChecksumAddress } from 'ethereumjs-util'
import buffer from 'buffer'

export function generateAddresses(
  publicKey: string,
  chainCode: string,
  basePath: string,
  amount: number = 30
) {
  const hdk = new HDKey()

  hdk.publicKey = new buffer.Buffer(publicKey, 'hex')
  hdk.chainCode = new buffer.Buffer(chainCode, 'hex')

  const addresses = []

  for (let i = 0; i < amount; i++) {
    const dkey = hdk.deriveChild(i)
    const address = publicToAddress(dkey.publicKey, true).toString('hex')
    addresses.push({
      dPath: `${basePath}/${i}`,
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
