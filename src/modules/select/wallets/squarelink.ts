import { networkName, networkToId } from '../../../utilities'
import { SdkWalletOptions, WalletModule, Helpers } from '../../../interfaces'

const sqlkIcon = `
  <svg width="88px" height="88px" viewBox="0 0 88 88" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <g id="Identity" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
      <g id="Artboard" transform="translate(-11.000000, -220.000000)">
          <g id="Group" transform="translate(11.508925, 220.556971)">
              <circle id="Oval" fill="#313D53" cx="43.4910749" cy="43.4910749" r="43.4910749"></circle>
              <path d="M26.9807751,53.5120539 L26.9807751,56.7049531 C26.9807751,58.9140921 28.7716361,60.7049531 30.9807751,60.7049531 L56.0422363,60.7049531 C58.2513753,60.7049531 60.0422363,58.9140921 60.0422363,56.7049531 L60.0422363,30.2473297 C60.0422363,28.0381907 58.2513753,26.2473297 56.0422363,26.2473297 L26.9807751,26.2473297 L26.9807751,47.8897807 L26.9807751,53.5120539 Z M20.4910749,20.4430293 L56.4910749,20.4430293 C62.0139224,20.4430293 66.4910749,24.9201818 66.4910749,30.4430293 L66.4910749,56.5391205 C66.4910749,62.061968 62.0139224,66.5391205 56.4910749,66.5391205 L30.4910749,66.5391205 C24.9682274,66.5391205 20.4910749,62.061968 20.4910749,56.5391205 L20.4910749,20.4430293 Z M33.9720552,26.2473297 L40.419051,26.2473297 L40.419051,41.0316245 L40.419051,49.5120539 C40.419051,51.7211929 38.62819,53.5120539 36.419051,53.5120539 L26.9807751,53.5120539 L26.9807751,47.8897807 L33.9720552,47.8897807 L33.9720552,26.2473297 Z M33.9720552,26.2473297 L40.419051,26.2473297 L33.9720552,26.2473297 Z M53.0509562,60.7049531 L46.6039605,60.7049531 L46.6039605,45.9206584 L46.6039605,37.4402289 C46.6039605,35.2310899 48.3948215,33.4402289 50.6039605,33.4402289 L60.0422363,33.4402289 L60.0422363,39.0625021 L53.0509562,39.0625021 L53.0509562,60.7049531 Z M46.6039605,60.7049531 L53.0509562,60.7049531 L46.6039605,60.7049531 Z M60.0422363,39.0625021 L60.0422363,33.4402289 L60.0422363,39.0625021 Z" id="Icon-Blue" fill="#E8EEFF"></path>
          </g>
      </g>
  </g>
  </svg>
`

function squarelink(options: SdkWalletOptions): WalletModule {
  const { apiKey, networkId, preferred, label, iconSrc, svg } = options

  return {
    name: label || 'Squarelink',
    svg: svg || sqlkIcon,
    iconSrc,
    wallet: async (helpers: Helpers) => {
      const { default: Squarelink } = await import('squarelink')

      const instance = new Squarelink(apiKey, networkName(networkId), {
        useSync: true
      })

      const provider = instance.getProviderSync()

      const { BigNumber } = helpers

      return {
        provider,
        instance,
        interface: {
          name: 'Squarelink',
          connect: provider.enable,
          address: {
            get: () => Promise.resolve(instance.accounts[0])
          },
          network: {
            get: () => Promise.resolve(networkToId(instance.network))
          },
          balance: {
            get: () =>
              new Promise(resolve => {
                if (!instance.accounts.length) {
                  resolve(null)
                  return
                }

                provider.sendAsync(
                  {
                    method: 'eth_getBalance',
                    params: [instance.accounts[0], 'latest'],
                    id: 1
                  },
                  (e: any, res: any) => {
                    resolve(BigNumber(res.result).toString(10))
                  }
                )
              })
          }
        }
      }
    },
    desktop: true,
    mobile: true,
    preferred
  }
}

export default squarelink
