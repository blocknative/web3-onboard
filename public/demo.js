// import selectWallet from "./bn-select-wallet"
// import prepareWallet from "./bn-prepare-wallet"
import Onboard from "./Onboard"

const onboard = Onboard.init({
  dappId: "12153f55-f29e-4f11-aa07-90f10da5d778",
  networkId: 4,
  subscriptions: {
    address: a => {
      const address = document.getElementById("address")
      if (address) {
        address.innerHTML = a || ""
      }
    },
    network: n => {
      const network = document.getElementById("network")
      if (network) {
        network.innerHTML = networkName(Number(n)) || ""
      }
    },
    balance: b => {
      const balance = document.getElementById("balance")
      if (balance != null) {
        balance.innerHTML = b == 0 ? 0 : b / 1000000000000000000 + " ETH"
      }
    },
    provider: p => p && console.log("provider:", p)
  },
  modules: {
    selectWallet: window.SelectWallet.defaultModules({
      fortmatic: { apiKey: "pk_test_886ADCAB855632AA" },
      trezor: {
        email: "aaron@flexdapps.com",
        appUrl: "https://flexdapps.com",
        apiKey: "d5e29c9b9a9d4116a7348113f57770a8"
      },
      networkId: 4
    }),
    prepareWallet: window.PrepareWallet.defaultModules({
      networkId: 4
      // minimumBalance: "200000000000000000"
    })
  }
})

function networkName(id) {
  switch (id) {
    case 1:
      return "main"
    case 3:
      return "ropsten"
    case 4:
      return "rinkeby"
    case 5:
      return "goerli"
    case 42:
      return "kovan"
    case "localhost":
      return "localhost"
    default:
      return "local"
  }
}

window.onboard = onboard
