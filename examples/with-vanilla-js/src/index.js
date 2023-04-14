import onboard from './onboard'
import "./styles.css"

const $connect = document.querySelector('.connect-button')
const $disconnect = document.querySelector('.disconnect-button')
const $wallet = document.querySelector('.wallet')
const $disconnected = document.querySelector('.disconnected')

const connect = async () => {
  await onboard.connectWallet()
}

const disconnect = () => {
  onboard.disconnectWallet({ label: $wallets$?.[0]?.label })
}

$connect.addEventListener('click', async (_) => {
  const connected = await connect()
  $wallet.classList.remove('hidden')
  $disconnected.classList.add('hidden')
})

$disconnect.addEventListener('click', (_) => {
  $wallet.classList.add('hidden')
  $disconnected.classList.remove('hidden')
  disconnect()
})

