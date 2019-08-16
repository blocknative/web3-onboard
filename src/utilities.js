import bowser from "bowser"
import { app, state } from "./stores"

export function getUserAgent() {
  const browser = bowser.getParser(window.navigator.userAgent)
  const userAgent = browser.parse().parsedResult
  const validBrowser = browser.satisfies({
    desktop: {
      chrome: ">49",
      firefox: ">52",
      opera: ">36"
    }
  })

  app.update(store => ({
    ...store,
    userAgent
  }))

  state.update({
    mobileDevice: userAgent.platform.type !== "desktop",
    validBrowser
  })
}

export function networkName(id) {
  switch (id) {
    case 1:
      return "main"
    case 3:
      return "ropsten"
    case 4:
      return "rinkeby"
    case 5:
      return "goerli"
    case 42:
      return "kovan"
    case "localhost":
      return "localhost"
    default:
      return "local"
  }
}
