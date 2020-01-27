import { WalletCheckModule, StateAndHelpers } from '../../interfaces'

function accountSelect(): WalletCheckModule | never {
  let completed: boolean = false
  let accountsAndBalances: Array<{ balance: string; address: string }> = []

  return async (stateAndHelpers: StateAndHelpers) => {
    const { wallet, BigNumber } = stateAndHelpers
    const { provider, type } = wallet

    if (type === 'hardware' && !completed) {
      if (!accountsAndBalances.length) {
        accountsAndBalances = await provider.getAllAccountsAndBalances()
      }

      const deleteAccountSelectProperty = () => {
        delete (window as any).accountSelect
      }

      const accountSelect = () => {
        const accountIndex = (document as any).getElementById('account-select')
          .selectedIndex

        provider.setPrimaryAccount(accountsAndBalances[accountIndex].address)
      }
      ;(window as any).accountSelect = accountSelect

      return {
        heading: 'Select Account',
        description: `Please select which account you would like to use with this Dapp:`,
        eventCode: 'accountSelect',
        html: `
          <select id="account-select" onchange="window.accountSelect()">
            ${accountsAndBalances.map(
              (account: { balance: string; address: string }) =>
                `<option value="${account.address}">${
                  account.address
                } --- ${new BigNumber(account.balance)
                  .div('1000000000000000000')
                  .toString()} ETH</option>`
            )}
          </select>
        `,
        button: {
          onclick: () => {
            deleteAccountSelectProperty()
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
