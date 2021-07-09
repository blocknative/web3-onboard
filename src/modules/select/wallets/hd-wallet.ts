import HDKey from 'hdkey'
import * as ethUtil from 'ethereumjs-util'
import * as buffer from 'buffer'

const { publicToAddress, toChecksumAddress } = ethUtil

const numberToGet = 5

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
      address: toChecksumAddress(`0x${address}`)
    })
  }

  return addresses
}

export function isValidPath(path: string) {
  const parts = path.split('/')
  if (parts[0] !== 'm') {
    return false
  }

  if (parts[1] !== "44'") {
    return false
  }

  if (!["60'", "1'", "73799'", "246'"].includes(parts[2])) {
    return false
  }

  if (parts[3] === undefined || parts[3] === "0'") {
    return true
  }

  const accountFieldNumber = Number(parts[3].slice(0, -1))

  if (
    isNaN(accountFieldNumber) ||
    accountFieldNumber < 0 ||
    parts[3].slice(-1) !== "'"
  ) {
    return false
  }

  if (parts[4] === undefined) {
    return true
  }

  const changeFieldNumber = Number(parts[4])

  if (isNaN(changeFieldNumber) || changeFieldNumber < 0) {
    return false
  }

  if (parts[5] === undefined) {
    return true
  }

  const addressFieldNumber = Number(parts[5])

  if (isNaN(addressFieldNumber) || addressFieldNumber < 0) {
    return false
  }

  return true
}
