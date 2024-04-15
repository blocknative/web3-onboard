import { test as base, chromium, BrowserContext } from '@playwright/test'
import { prepareMetamask } from '@synthetixio/synpress/helpers'
import { initialSetup } from '@synthetixio/synpress/commands/metamask'

const path = require('path')

export const metamaskTest = base.extend<{
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
      secretWordsOrPrivateKey: process.env.TEST_WALLET_PHRASE,
      network: 'sepolia',
      password: 'Tester@1234',
      enableAdvancedSettings: true
    })
    await use(context)
    if (!process.env.SERIAL_MODE) {
      await context.close()
    }
  }
})
export const expect = metamaskTest.expect
