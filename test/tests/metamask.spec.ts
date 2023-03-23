import { test, expect } from './fixtures'
import * as metamask from '@synthetixio/synpress/commands/metamask'

test.beforeAll(async ({ page }) => {
  await page.goto('http://localhost:8080')
})

test('metamask connected', async ({ page }) => {
  await page.getByRole('button', { name: 'Connect Wallet' }).click()
  await page.getByRole('checkbox').click()
  await page.getByText('Metamask').click()
  await metamask.acceptAccess()
  await expect(page.getByTestId('MetaMask')).toHaveText('MetaMask')
})
