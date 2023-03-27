import { metamaskTest, expect } from './fixtures'
import * as metamask from '@synthetixio/synpress/commands/metamask'
import * as playwright from '@synthetixio/synpress/commands/playwright'

let sharedPage
let sharedContext

metamaskTest.describe.configure({ mode: 'serial' })

const connectMetamask = async page => {
  await page.getByRole('button', { name: 'Connect Wallet' }).click()
  await page.getByRole('checkbox').click()
  await page.getByText('Metamask').click()
  await metamask.acceptAccess()
}

metamaskTest.beforeAll(async ({ page, context }) => {
  sharedPage = page
  sharedContext = context
  await sharedPage.goto('http://localhost:8080')
  await connectMetamask(sharedPage)
})

metamaskTest('metamask connected', async () => {
  await expect(sharedPage.getByTestId('MetaMask')).toHaveText('MetaMask')
  // Check to make sure connected to goerli
  await expect(sharedPage.getByTestId('chains')).toHaveText(
    'Chains: [ { "namespace": "evm", "id": "0x5" } ]'
  )
})

metamaskTest('metamask sign message', async () => {
  const messageText = 'a new message'
  const message = sharedPage.getByPlaceholder('Message...')
  await message.fill(messageText)
  await sharedPage.getByRole('button', { name: 'Sign Message' }).click()
  const notificationPage = await playwright.switchToMetamaskNotification()
  await expect(notificationPage.getByText(messageText)).toBeDefined()
  await notificationPage.getByTestId('page-container-footer-next').click()
})

metamaskTest('metamask sign typed message', async () => {
  await sharedPage.getByRole('button', { name: 'Sign Typed Message' }).click()
  const notificationPage = await playwright.switchToMetamaskNotification()
  await expect(notificationPage.getByText('Hello, Bob!')).toBeDefined()
  await notificationPage.getByTestId('signature-request-scroll-button').click()
  await notificationPage.getByTestId('page-container-footer-next').click()
})

metamaskTest('send Transaction', async () => {
  const address = process.env.TEST_WALLET_ADDRESS
  const input = sharedPage.getByTestId('sendTransaction')
  await input.fill(address)
  await sharedPage.getByRole('button', { name: 'Send Transaction' }).click()
  const notificationPage = await playwright.switchToMetamaskNotification()
  await notificationPage.getByTestId('page-container-footer-next').click()
  await sharedPage.waitForTimeout(3000)
  await expect(
    sharedPage.getByText('Your account successfully received 0.00001 ETH from')
  ).toBeDefined()
})

metamaskTest('switch chains', async () => {
  await sharedPage.getByRole('button', { name: 'Set Chain to Matic' }).click()
  const notificationPage = await playwright.switchToMetamaskNotification()
  await notificationPage.getByRole('button', { name: 'Approve' }).click()
  await notificationPage.getByRole('button', { name: 'Switch network' }).click()
  await sharedPage.waitForTimeout(3000)
  await expect(sharedPage.getByTestId('chains')).toHaveText(
    'Chains: [ { "namespace": "evm", "id": "0x89" } ]'
  )
})

metamaskTest('disconnect metamask', async () => {
  await sharedPage.getByRole('button', { name: 'Disconnect Wallet' }).click()
  await sharedPage.waitForTimeout(3000)
  await expect(sharedPage.getByTestId('connected-wallet')).toHaveCount(0)
  sharedContext.close()
})
