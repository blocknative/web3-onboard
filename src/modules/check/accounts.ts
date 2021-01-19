import {
  WalletCheckModule,
  StateAndHelpers,
  WalletCheckModal
} from '../../interfaces'
import { usbIcon } from './icons'

type AccountsAndBalances = Array<{ balance: string; address: string }>

const msgStyles = `
  display: block;
  font-size: 0.889em;
  font-family: inherit;
  color: inherit;
  margin-top: 0.5rem;
`

function accountSelect(
  options: {
    heading?: string
    description?: string
    icon?: string
  } = {}
): WalletCheckModule {
  const { heading, description, icon } = options
  let completed = false
  let loadingAccounts = false
  let accountsAndBalances: AccountsAndBalances = []

  async function checkModule(
    stateAndHelpers: StateAndHelpers
  ): Promise<WalletCheckModal | undefined> {
    const { wallet, BigNumber } = stateAndHelpers
    const { provider, type } = wallet

    if (type === 'hardware' && !completed && !provider.isCustomPath()) {
      if (accountsAndBalances.length === 0) {
        loadingAccounts = true
        const accounts = await provider.enable()
        accountsAndBalances = await provider.getBalances(accounts)
        loadingAccounts = false
      }

      const deleteWindowProperties = () => {
        delete (window as any).accountSelect
        delete (window as any).loadMoreAccounts
      }

      const loadMoreAccounts = async () => {
        loadingAccounts = true
        accountsAndBalances = await provider.getMoreAccounts()
        loadingAccounts = false
      }

      const accountSelect = () => {
        const accountIndex = (document as any).getElementById('account-select')
          .selectedIndex

        provider.setPrimaryAccount(accountsAndBalances[accountIndex].address)
      }
      ;(window as any).accountSelect = accountSelect
      ;(window as any).loadMoreAccounts = loadMoreAccounts

      return {
        heading: heading || 'Select Account',
        description:
          description ||
          `Please select which account you would like to use with PoolTogether:`,
        eventCode: 'accountSelect',
        html: loadingAccounts
          ? `<div class="bn-onboard-custom bn-onboard-loading">
              <div class="bn-onboard-loading-first"></div>
              <div class="bn-onboard-loading-second"></div>
              <div class="bn-onboard-loading-third"></div>
            </div>
            <span style="${msgStyles}">Loading More Accounts...</span>
            `
          : `
          <div style="display: flex; align-items: center;">
            <select id="account-select" onchange="window.accountSelect();" class="bn-onboard-custom bn-onboard-account-select">
              ${accountsAndBalances.map(
                (account: { balance: string; address: string }) =>
                  `<option>${account.address} --- ${
                    account.balance != null
                      ? new BigNumber(account.balance)
                          .div('1000000000000000000')
                          .toFixed(3)
                      : '0'
                  } ETH</option>`
              )}
            </select>
            <button style="display: flex; align-items: center; text-align: center; height: 1.5rem; background: transparent; margin: 0 0.25rem; padding: 0 0.5rem; border-radius: 40px; cursor: pointer; color: inherit; border-color: inherit; border-width: 1px; border-style: solid;" onclick="window.loadMoreAccounts()">Load More</button>
          </div>
        `,
        button: {
          onclick: () => {
            deleteWindowProperties()
            completed = true
          },
          text: 'Done'
        },
        icon: icon || usbIcon
      }
    }
  }

  checkModule.reset = () => {
    completed = false
    accountsAndBalances = []
    loadingAccounts = false
  }

  return checkModule
}

export default accountSelect
