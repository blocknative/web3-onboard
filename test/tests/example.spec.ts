import { test, expect } from './fixtures'

test('has title', async ({ page }) => {
  await page.goto('http://localhost:8080')
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Svelte app/)
})
