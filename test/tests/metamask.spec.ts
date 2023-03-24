import { test, expect } from './fixtures'
import * as metamask from '@synthetixio/synpress/commands/metamask'
import * as playwright from '@synthetixio/synpress/commands/playwright'

let sharedPage
let sharedContext

test.describe.configure({ mode: 'serial' })

const connectMetamask = async page => {
  await page.getByRole('button', { name: 'Connect Wallet' }).click()
  await page.getByRole('checkbox').click()
  await page.getByText('Metamask').click()
  await metamask.acceptAccess()
}

test.beforeAll(async ({ page, context }) => {
  sharedPage = page
  sharedContext = context
  await sharedPage.goto('http://localhost:8080')
  await connectMetamask(sharedPage)
})

test('metamask connected', async () => {
  await expect(sharedPage.getByTestId('MetaMask')).toHaveText('MetaMask')
  // Check to make sure connected to goerli
  await expect(sharedPage.getByTestId('chains')).toHaveText(
    'Chains: [ { "namespace": "evm", "id": "0x5" } ]'
  )
})

test('metamask sign message', async () => {
  const messageText = 'a new message'
  const message = sharedPage.getByPlaceholder('Message...')
  await message.fill(messageText)
  await sharedPage.getByRole('button', { name: 'Sign Message' }).click()
  const notificationPage = await playwright.switchToMetamaskNotification()
  await expect(notificationPage.getByText(messageText)).toBeDefined()
  await notificationPage.getByTestId('page-container-footer-next').click()
})

test('send Transaction', async () => {
  // KAT TODO parameterize this
  const address = '0x0A2A0c1044818DF54C70E03c288F9eA5Ef5ef105'
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

test('switch chains', async () => {
  await sharedPage.getByRole('button', { name: 'Set Chain to Matic' }).click()
  const notificationPage = await playwright.switchToMetamaskNotification()
  await notificationPage.getByRole('button', { name: 'Approve' }).click()
  await notificationPage.getByRole('button', { name: 'Switch network' }).click()
  await sharedPage.waitForTimeout(3000)
  await expect(sharedPage.getByTestId('chains')).toHaveText(
    'Chains: [ { "namespace": "evm", "id": "0x89" } ]'
  )
})

test('disconnect metamask', async () => {
  await sharedPage.getByRole('button', { name: 'Disconnect Wallet' }).click()
  await sharedPage.waitForTimeout(3000)
  await expect(sharedPage.getByTestId('connected-wallet')).toHaveCount(0)
  sharedContext.close()
})
