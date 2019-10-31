import {
  Initialization,
  Subscriptions,
  WalletSelectModule,
  WalletReadyModule,
  WalletModule,
  ConfigOptions,
  ReadyModal,
  WalletInterface,
  ReadyDefaultsOptions,
  SelectDefaultsOptions
} from "./interfaces"

export function validateType(options: {
  name: string
  value: any
  type: string
  optional?: boolean
}): never | void {
  const { name, value, type, optional } = options
  if (!optional && typeof value === "undefined") {
    throw new Error(`"${name}" is required`)
  }

  if (
    typeof value !== "undefined" &&
    (type === "array" ? Array.isArray(type) : typeof value !== type)
  ) {
    throw new Error(
      `"${name}" must be of type: ${type}, received type: ${typeof value} from value: ${value}`
    )
  }
}

const validSubscriptionKeys = ["address", "network", "balance", "wallet"]

export function validateInit(init: Initialization): never | void {
  validateType({ name: "init", value: init, type: "object" })

  const { networkId, dappId, subscriptions, modules } = init

  validateType({ name: "networkId", value: networkId, type: "number" })
  validateType({ name: "dappId", value: dappId, type: "string" })

  validateSubscriptions(subscriptions)
  validateModules(modules)
}

function validateSubscriptions(subscriptions: Subscriptions): never | void {
  validateType({
    name: "subscriptions",
    value: subscriptions,
    type: "object",
    optional: true
  })

  if (subscriptions) {
    Object.keys(subscriptions).forEach((key: string) => {
      if (!validSubscriptionKey(key)) {
        throw new Error(
          `${key} is not a valid subscription parameter, must be one of the following keys: ${validSubscriptionKeys}`
        )
      }

      validateType({
        name: "subscription parameter",
        value: subscriptions[key],
        type: "function",
        optional: true
      })
    })
  }
}

function validateModules(modules: {
  walletSelect: WalletSelectModule
  walletReady: WalletReadyModule[]
}): never | void {
  validateType({ name: "modules", value: modules, type: "object" })

  const { walletSelect, walletReady } = modules

  validateWalletSelect(walletSelect)
  validateWalletReady(walletReady)
}

function validateWalletSelect(walletSelect: WalletSelectModule): never | void {
  validateType({ name: "walletSelect", value: walletSelect, type: "object" })

  const { heading, description, wallets } = walletSelect

  validateType({ name: "heading", value: heading, type: "string" })
  validateType({ name: "description", value: description, type: "string" })

  validateType({ name: "wallets", value: wallets, type: "object" })

  const { mobile, desktop } = wallets

  validateType({ name: "mobile", value: mobile, type: "array", optional: true })

  if (mobile) {
    mobile.forEach((module: WalletModule) => {
      validateWalletModule(module)
    })
  }

  validateType({
    name: "desktop",
    value: desktop,
    type: "array",
    optional: true
  })

  if (desktop) {
    desktop.forEach((module: WalletModule) => {
      validateWalletModule(module)
    })
  }
}

function validateWalletModule(module: WalletModule): never | void {
  const {
    name,
    iconSrc,
    iconSrcSet,
    svg,
    wallet,
    link,
    installMessage,
    preferred
  } = module

  validateType({ name: "name", value: name, type: "string" })
  validateType({ name: "wallet", value: wallet, type: "function" })
  validateType({
    name: "iconSrc",
    value: iconSrc,
    type: "string",
    optional: true
  })
  validateType({
    name: "iconSrcSet",
    value: iconSrcSet,
    type: "string",
    optional: true
  })
  validateType({ name: "svg", value: svg, type: "string", optional: true })
  validateType({ name: "link", value: link, type: "string", optional: true })
  validateType({
    name: "installMessage",
    value: installMessage,
    type: "function",
    optional: true
  })
  validateType({
    name: "preferred",
    value: preferred,
    type: "string",
    optional: true
  })
}

function validateWalletReady(walletReady: WalletReadyModule[]): never | void {
  validateType({ name: "walletReady", value: walletReady, type: "array" })

  walletReady.forEach((module: WalletReadyModule) => {
    validateType({
      name: "walletReady module",
      value: module,
      type: "function"
    })
  })
}

function validSubscriptionKey(key: string): boolean {
  return !!validSubscriptionKeys.find((validKey: string) => validKey === key)
}

export function validateConfig(configuration: ConfigOptions): never | void {
  validateType({ name: "configuration", value: configuration, type: "object" })

  const { darkMode } = configuration

  validateType({
    name: "darkMode",
    value: darkMode,
    type: "boolean",
    optional: true
  })
}

export function validateModal(modal: ReadyModal): never | void {
  validateType({ name: "modal", value: modal, type: "object" })

  const {
    img,
    heading,
    description,
    button,
    invalidMsg,
    eventCode,
    action,
    icon
  } = modal

  validateType({ name: "img", value: img, type: "string", optional: true })
  validateType({ name: "heading", value: heading, type: "string" })
  validateType({ name: "description", value: description, type: "string" })
  validateType({
    name: "invalidMsg",
    value: invalidMsg,
    type: "string",
    optional: true
  })
  validateType({ name: "eventCode", value: eventCode, type: "string" })
  validateType({
    name: "action",
    value: action,
    type: "function",
    optional: true
  })

  validateType({
    name: "button",
    value: button,
    type: "object",
    optional: true
  })

  if (button) {
    const { onclick, text } = button
    validateType({ name: "onclick", value: onclick, type: "function" })
    validateType({ name: "text", value: text, type: "string" })
  }

  validateType({ name: "icon", value: icon, type: "string", optional: true })
}

export function validateWalletInterface(
  walletInterface: WalletInterface
): never | void {
  validateType({
    name: "walletInterface",
    value: walletInterface,
    type: "object"
  })

  const {
    name,
    connect,
    disconnect,
    address,
    network,
    balance
  } = walletInterface

  validateType({ name: "name", value: name, type: "string" })
  validateType({
    name: "connect",
    value: connect,
    type: "function",
    optional: true
  })
  validateType({
    name: "disconnect",
    value: disconnect,
    type: "function",
    optional: true
  })

  validateType({ name: "address", value: address, type: "object" })
  validateType({
    name: "address.get",
    value: address.get,
    type: "function",
    optional: true
  })
  validateType({
    name: "address.onChange",
    value: address.onChange,
    type: "function",
    optional: true
  })

  validateType({ name: "network", value: network, type: "object" })
  validateType({
    name: "network.get",
    value: network.get,
    type: "function",
    optional: true
  })
  validateType({
    name: "network.onChange",
    value: network.onChange,
    type: "function",
    optional: true
  })

  validateType({ name: "balance", value: balance, type: "object" })
  validateType({
    name: "balance.get",
    value: balance.get,
    type: "function",
    optional: true
  })
  validateType({
    name: "balance.onChange",
    value: balance.onChange,
    type: "function",
    optional: true
  })
}

export function validateReadyDefaultsOptions(
  options: ReadyDefaultsOptions
): never | void {
  validateType({
    name: "ready defaults options",
    value: options,
    type: "object"
  })

  const { networkId, minimumBalance } = options

  validateType({ name: "networkId", value: networkId, type: "number" })
  validateType({
    name: "minimumBalance",
    value: minimumBalance,
    type: "string",
    optional: true
  })
}

export function validateSelectDefaultsOptions(
  options: SelectDefaultsOptions
): never | void {
  validateType({
    name: "select defaults options",
    value: options,
    type: "object"
  })

  const {
    heading,
    description,
    networkId,
    fortmaticInit,
    portisInit,
    squarelinkInit,
    walletConnectInit
  } = options

  validateType({
    name: "heading",
    value: heading,
    type: "string",
    optional: true
  })

  validateType({
    name: "description",
    value: description,
    type: "string",
    optional: true
  })

  validateType({ name: "networkId", value: networkId, type: "number" })

  validateType({
    name: "fortmaticInit",
    value: fortmaticInit,
    type: "object",
    optional: true
  })

  validateType({
    name: "portisInit",
    value: portisInit,
    type: "object",
    optional: true
  })

  validateType({
    name: "portisInit",
    value: portisInit,
    type: "object",
    optional: true
  })

  validateType({
    name: "squarelinkInit",
    value: squarelinkInit,
    type: "object",
    optional: true
  })

  validateType({
    name: "walletConnectInit",
    value: walletConnectInit,
    type: "object",
    optional: true
  })
}
