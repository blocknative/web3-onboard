import {
  test as base,
  expect,
  chromium,
  webkit,
  BrowserContext
} from '@playwright/test'
import path from 'path'

const METAMASK_WALLET_PW = 'Raging#Irritant#Driving3#Payback#Flyover'

const userDataDir = '/tmp/test-user-data-dir'

export const test = base.extend<{
  context: BrowserContext
  extensionId: string
}>({
  context: async ({}, use) => {
    const pathToExtension = path.join(
      __dirname,
      '/assets/metamask-chrome-10.21.2'
    )
    const context = await chromium.launchPersistentContext('', {
      headless: false,
      args: [
        `--disable-extensions-except=${pathToExtension}`,
        `--load-extension=${pathToExtension}`
      ]
    })
    await use(context)
    await context.close()
  },
  extensionId: async ({ context }, use) => {
    // for manifest v2:
    let [background] = context.backgroundPages()
    if (!background) background = await context.waitForEvent('backgroundpage')

    // for manifest v3:
    // let [background] = context.serviceWorkers();
    // if (!background)
    //   background = await context.waitForEvent("serviceworker");

    const extensionId = background.url().split('/')[2]
    await use(extensionId)
  }
})

test('setup metamask', async ({ page, extensionId }) => {
  await page.goto(`chrome-extension://${extensionId}/home.html`)
  await page.getByRole('button', { name: 'Get started' }).click()
  await page.getByRole('button', { name: 'No thanks' }).click()
  await page.getByRole('button', { name: 'Create a wallet' }).click()
  await page
    .getByLabel('New password (8 characters min)')
    .fill(METAMASK_WALLET_PW)
  await page.getByLabel('Confirm password').fill(METAMASK_WALLET_PW)

  await page.getByRole('checkbox').check()

  await page.getByRole('button', { name: 'Create' }).click()

  await page.getByRole('button', { name: 'Next' }).click()

  await page.getByRole('button', { name: 'Remind me later' }).click()
  await page.waitForTimeout(15000)
  // await expect(page.locator('body')).toBeVisible()
})

test('homepage has title and links to intro page', async ({ page }) => {
  await page.goto('http://localhost:8080/')

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Svelte app/)

  await page.getByRole('button', { name: 'Connect Wallet' }).click()

  await page.getByRole('button', { name: 'Metamask' }).click()

  // create a locator
  const getStarted = page.getByRole('button', { name: 'Get started' })

  // if ((await getStarted.count()) > 0) {
  //   console.log('hereo')
  // }

  // Expect an attribute "to be strictly equal" to the value.
  await expect(getStarted).toHaveText('Get started')

  // // Click the get started link.
  // await getStarted.click();

  // // Expects the URL to contain intro.
  // await expect(page).toHaveURL(/.*intro/);
})
