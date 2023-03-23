import { test, expect } from './fixtures'
import * as metamask from '@synthetixio/synpress/commands/metamask'
import * as playwright from '@synthetixio/synpress/commands/playwright'

const connectMetamask = async page => {
  await page.getByRole('button', { name: 'Connect Wallet' }).click()
  await page.getByRole('checkbox').click()
  await page.getByText('Metamask').click()
  await metamask.acceptAccess()
}

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:8080')
})

// test('metamask connected', async ({ page }) => {
//   await connectMetamask(page)
//   await expect(page.getByTestId('MetaMask')).toHaveText('MetaMask')
// })

// test('metamask sign message', async ({ page }) => {
//   const messageText = 'a new message'
//   await connectMetamask(page)
//   const message = page.getByPlaceholder('Message...')
//   await message.fill(messageText)
//   await page.getByRole('button', { name: 'Sign Message' }).click()
//   const notificationPage = await playwright.switchToMetamaskNotification()
//   await expect(notificationPage.getByText(messageText)).toBeDefined()
//   await notificationPage.getByTestId('page-container-footer-next').click()
// })

test('send Transaction', async ({ page }) => {
  const address = '0xBB7050947E6a523A2dd42566dE928554BE4eD604'
  await connectMetamask(page)
  const input = page.getByTestId('sendTransaction')
  await input.fill(address)
  await page.getByRole('button', { name: 'Send Transaction' }).click()
  const notificationPage = await playwright.switchToMetamaskNotification()
  await notificationPage.getByTestId('page-container-footer-next').click()
  await setTimeout(() => {}, 3000)
  await expect(
    page.getByText(
      'Your account successfully received 0.00001 ETH from 0xBB...D604'
    )
  ).toBeDefined()
})
