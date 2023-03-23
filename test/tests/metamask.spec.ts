import { test, expect } from './fixtures'
import * as metamask from '@synthetixio/synpress/commands/metamask'

const connectMetamask = async page => {
  await page.getByRole('button', { name: 'Connect Wallet' }).click()
  await page.getByRole('checkbox').click()
  await page.getByText('Metamask').click()
  await metamask.acceptAccess()
}

test.beforeAll(async ({ page }) => {
  await page.goto('http://localhost:8080')
})

test('metamask connected', async ({ page }) => {
  await connectMetamask(page)
  await expect(page.getByTestId('MetaMask')).toHaveText('MetaMask')
})

test('metamask sign message', async ({ page }) => {
  await connectMetamask(page)
  await page.getByRole('button', { name: 'Sign Message' }).click()
  await metamask.confirmSignatureRequest()
})
