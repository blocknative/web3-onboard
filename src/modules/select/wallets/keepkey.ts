import { Helpers, SdkWalletOptions, WalletModule } from '../../../interfaces'
const svg = ``

function keepkey(options: SdkWalletOptions): WalletModule {
  const { label, svg } = options
  return {
    name: label || 'KeepKey',
    wallet: async () => {
      const { default: _default, WebUSBKeepKeyAdapter } = await import(
        '@shapeshiftoss/hdwallet-keepkey-webusb'
      )

      const { default: __default, Keyring } = await import(
        '@shapeshiftoss/hdwallet-core'
      )
      const keyring = new Keyring()

      const keepkeyAdapter = WebUSBKeepKeyAdapter.useKeyring(keyring)

      const keepKeyWallet = await keepkeyAdapter.pairDevice(
        undefined,
        /*tryDebugLink=*/ true
      )

      console.log({ keepKeyWallet })

      return { provider: undefined, interface: null }
    },
    svg,
    type: 'hardware',
    link: '',
    mobile: false,
    desktop: true
  }
}

type Accounts = string[] | undefined[]

interface Account {
  publicKey: string
  chainCode: string
  path: string
}

interface HDWalletProvider {
  enabled: boolean
  dPath: string
  getAccounts(getMore?: boolean): Promise<Accounts>
  enable(): Promise<Accounts>
  account: Account | undefined
}

const DEFAULT_PATH = "m/44'/60'/0'/0"

// class KeepKeyProvider implements HDWalletProvider {
//   public enabled = false
//   public dPath = DEFAULT_PATH

//   private addressToPath = new Map()
//   private account: Account | undefined

//   constructor() {}

//   async getAccounts(
//     getMore: boolean = this.addressToPath.size === 0
//   ): Promise<Accounts> {
//     if (!this.enabled) return [undefined]
//     if (!getMore) return this.addresses

//     this.dPath = this.dPath || DEFAULT_PATH

//     if (!this.account) {
//       this.account = await getPublicKey()
//     }

//     return this.addresses
//   }

//   enable(): Promise<Accounts> {
//     this.enabled = true
//     return this.getAccounts()
//   }

//   private async getPublicKey() {
//     if (!this.dPath) {
//       throw new Error('a derivation path is needed to get the public key')
//     }
//     try {
//       const result = await TrezorConnect.getPublicKey({
//         path: this.dPath,
//         coin: 'eth'
//       })

//       if (!result.success) {
//         throw new Error(result.payload.error)
//       }

//       account = {
//         publicKey: result.payload.publicKey,
//         chainCode: result.payload.chainCode,
//         path: result.payload.serializedPath
//       }

//       return account
//     } catch (error) {
//       throw new Error('There was an error accessing your Trezor accounts.')
//     }
//   }

//   get addresses() {
//     return Array.from(this.addressToPath.keys())
//   }
// }

export default keepkey
