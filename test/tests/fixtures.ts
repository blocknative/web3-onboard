import { test as base, chromium, BrowserContext } from '@playwright/test'
import { prepareMetamask } from '@synthetixio/synpress/helpers'
import { initialSetup } from '@synthetixio/synpress/commands/metamask'
const path = require('path')

export const test = base.extend<{
  context: BrowserContext
}>({
  context: async ({}, use) => {
    // required for synpress
    global.expect = expect
    // download metamask
    const metamaskPath = await prepareMetamask(
      process.env.METAMASK_VERSION || '10.26.2'
    )
    // prepare browser args
    const browserArgs = [
      `--disable-extensions-except=${metamaskPath}`,
      `--load-extension=${metamaskPath}`,
      '--remote-debugging-port=9222'
    ]
    if (process.env.CI) {
      browserArgs.push('--disable-gpu')
    }
    if (process.env.HEADLESS_MODE) {
      browserArgs.push('--headless=new')
    }
    // launch browser
    const context = await chromium.launchPersistentContext('', {
      headless: false,
      args: browserArgs
    })
    // wait for metamask
    await context.pages()[0].waitForTimeout(3000)
    // setup metamask
    await initialSetup(chromium, {
      secretWordsOrPrivateKey:
        'test test test test test test test test test test test junk',
      network: 'goerli',
      password: 'Tester@1234',
      enableAdvancedSettings: true
    })
    await use(context)
    await context.close()
  }
})
export const expect = test.expect

// export const test = base.extend<{
//   context: BrowserContext
//   extensionId: string
// }>({
//   context: async ({ browserName }, use) => {
//     // required for synpress
//     global.expect = expect
//     const extensionPath = path.join(
//       __dirname,
//       '../assets/metamask-chrome-10.26.2'
//     )
//     const browserTypes = { chromium }
//     const launchOptions = {
//       devtools: true,
//       headless: false,
//       args: [
//         `--headless=new`,
//         `--disable-extensions-except=${extensionPath}`,
//         `--load-extension=${extensionPath}`
//       ]
//     }
//     const context = await browserTypes[browserName].launchPersistentContext(
//       '',
//       launchOptions
//     )
//     await use(context)
//     await context.close()
//   },
//   extensionId: async ({ context }, use) => {
//     // for manifest v2:
//     let [background] = context.backgroundPages()
//     if (!background) background = await context.waitForEvent('backgroundpage')

//     // for manifest v3:
//     // let [background] = context.serviceWorkers();
//     // if (!background)
//     //   background = await context.waitForEvent("serviceworker");

//     const extensionId = background.url().split('/')[2]
//     await use(extensionId)
//   }
// })

// export const expect = test.expect

// export const METAMASK_WALLET_PW = 'MetaMcMasky#10'

// export const setUpMetmask = async (page, extensionId, password) => {
//   await page.goto(`chrome-extension://${extensionId}/home.html`)
//   await page.getByRole('button', { name: 'Create a new wallet' }).click()
//   await page.getByRole('button', { name: 'I agree' }).click()
//   await page.getByLabel('New password (8 characters min)').fill(password)
//   await page.getByLabel('Confirm password').fill(password)

//   await page.getByTestId('create-password-terms').click()

//   await page.getByRole('button', { name: 'Create a new wallet' }).click()

//   await page.getByTestId('secure-wallet-later').click()

//   await page.getByTestId('skip-srp-backup-popover-checkbox').click()

//   await page.getByRole('button', { name: 'Skip' }).click()

//   await page.getByRole('button', { name: 'Got it!' }).click()

//   await page.getByRole('button', { name: 'Next' }).click()

//   await page.getByRole('button', { name: 'Done' }).click()
// }
