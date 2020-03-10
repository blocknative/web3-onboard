import {
  WalletCheckModule,
  StateAndHelpers,
  WalletCheckModal
} from '../../interfaces'

type AccountsAndBalances = Array<{ balance: string; address: string }>

function accountSelect(): WalletCheckModule {
  let completed: boolean = false
  let loadingAccounts: boolean = false
  let accountsAndBalances: AccountsAndBalances = []

  return async (
    stateAndHelpers: StateAndHelpers
  ): Promise<WalletCheckModal | undefined> => {
    const { wallet, BigNumber } = stateAndHelpers
    const { provider, type } = wallet

    if (type === 'hardware' && !completed) {
      if (accountsAndBalances.length === 0) {
        loadingAccounts = true
        const accounts = await provider.getAccounts()
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
        heading: 'Select Account',
        description: `Please select which account you would like to use with this Dapp:`,
        eventCode: 'accountSelect',
        html: loadingAccounts
          ? `<div class="bn-onboard-custom bn-onboard-loading">
              <div class="bn-onboard-loading-first"></div>
              <div class="bn-onboard-loading-second"></div>
              <div class="bn-onboard-loading-third"</div>
            </div>`
          : `
          <select id="account-select" onchange="window.accountSelect()" style="padding: 0.5rem;">
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
          </select><button style="background: transparent; margin: 0 0.25rem; padding: 0.25rem 0.5rem; border-radius: 40px; cursor: pointer; color: inherit; border-color: inherit; border-width: 1px;" onclick="window.loadMoreAccounts()">Load More</button>
        `,
        button: {
          onclick: () => {
            deleteWindowProperties()
            completed = true
          },
          text: 'Done'
        },
        icon: `
        <svg height="18" viewBox="0 0 18 18" width="18" xmlns="http://www.w3.org/2000/svg"><path d="m13.375 28c-1.86075 0-3.375-1.51425-3.375-3.375s1.51425-3.375 3.375-3.375 3.375 1.51425 3.375 3.375-1.51425 3.375-3.375 3.375zm0-4.5c-.619875 0-1.125.504-1.125 1.125s.505125 1.125 1.125 1.125 1.125-.504 1.125-1.125-.505125-1.125-1.125-1.125zm0-6.75c-1.86075 0-3.375-1.51425-3.375-3.375s1.51425-3.375 3.375-3.375 3.375 1.51425 3.375 3.375-1.51425 3.375-3.375 3.375zm0-4.5c-.619875 0-1.125.505125-1.125 1.125s.505125 1.125 1.125 1.125 1.125-.505125 1.125-1.125-.505125-1.125-1.125-1.125zm11.25 4.5c-1.86075 0-3.375-1.51425-3.375-3.375s1.51425-3.375 3.375-3.375 3.375 1.51425 3.375 3.375-1.51425 3.375-3.375 3.375zm0-4.5c-.621 0-1.125.505125-1.125 1.125s.504 1.125 1.125 1.125 1.125-.505125 1.125-1.125-.504-1.125-1.125-1.125zm-11.25 10.117125h-.014625c-.615375-.007875-1.110375-.50175-1.110375-1.117125 0-1.35675.898875-3.375 3.375-3.375h6.75c.50625-.0135 1.125-.219375 1.125-1.125v-1.125c0-.621.502875-1.125 1.125-1.125s1.125.504 1.125 1.125v1.125c0 2.476125-2.01825 3.375-3.375 3.375h-6.75c-.905625 0-1.1115.61875-1.125 1.1385-.01575.610875-.51525 1.103625-1.125 1.103625zm0 1.132875c-.621 0-1.125-.502875-1.125-1.125v-6.75c0-.621.504-1.125 1.125-1.125s1.125.504 1.125 1.125v6.75c0 .622125-.504 1.125-1.125 1.125z" fill="currentColor" transform="translate(-10 -10)"/></svg>
        `
      }
    }
  }
}

export default accountSelect
