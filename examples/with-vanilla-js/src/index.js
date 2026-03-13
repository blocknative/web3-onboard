import onboard from './onboard'
import './styles.css'

const $connect = document.querySelector('.connect-button')
const $disconnect = document.querySelector('.disconnect-button')
const $wallet = document.querySelector('.wallet')
const $disconnected = document.querySelector('.disconnected')
const $address = document.querySelector('.address')
const $label = document.querySelector('.label')

let label

const connect = async () => {
  return await onboard.connectWallet()
}

const disconnect = () => {
  onboard.disconnectWallet({ label })
}

const addConnectedInfo = connectedAccount => {
  const address = connectedAccount.address
  const start = address.slice(0, 5)
  const end = address.slice(-5, -1)
  $address.innerHTML = `${start}.....${end}`
  $label.innerHTML = `Connected Wallet: ${label}`
}

$connect.addEventListener('click', async _ => {
  const wallets = await connect()
  if (wallets[0]) {
    const connectedAccount = wallets[0].accounts[0]
    label = wallets[0].label
    addConnectedInfo(connectedAccount)
    $wallet.classList.remove('hidden')
    $disconnected.classList.add('hidden')
  }
})

$disconnect.addEventListener('click', _ => {
  disconnect()
  $wallet.classList.add('hidden')
  $disconnected.classList.remove('hidden')
})
