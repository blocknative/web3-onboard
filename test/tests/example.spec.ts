import { test, expect, setUpMetmask, METAMASK_WALLET_PW } from './fixtures'

test('has title', async ({ page }) => {
  await page.goto('http://localhost:8080')
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Svelte app/)
})
