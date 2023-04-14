import onboard from './onboard'
import "./styles.css"

const $connect = document.querySelector('.connect-button')
const $disconnect = document.querySelector('.disconnect-button')
const $wallet = document.querySelector('.wallet')
const $disconnected = document.querySelector('.disconnected')
const $address = document.querySelector('.address')
const $label = document.querySelector('.label')

let label

const connect = async () => {
  wallets = await onboard.connectWallet()
  const connectedAccount = wallets[0].accounts[0]
  label = wallets[0].label
  if (wallets[0]) {
    addConnectedInfo(connectedAccount)
    $wallet.classList.remove('hidden')
    $disconnected.classList.add('hidden')
  }
}

const disconnect = () => {
  $wallet.classList.add('hidden')
  $disconnected.classList.remove('hidden')
  onboard.disconnectWallet({ label })
}

const addConnectedInfo = (connectedAccount) => {
  $address.innerHTML = connectedAccount.address
  $label.innerHTML = `Connected Wallet: ${label}`
}

$connect.addEventListener('click', async (_) => {
  await connect()
})

$disconnect.addEventListener('click', (_) => {
  disconnect()
})

