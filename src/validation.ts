import {
  Initialization,
  Subscriptions,
  WalletSelectModule,
  WalletCheckModule,
  WalletModule,
  ConfigOptions,
  WalletCheckModal,
  WalletInterface,
  WalletInit,
  WalletCheckInit
} from './interfaces'

const validSubscriptionKeys = ['address', 'network', 'balance', 'wallet']

export function validateType(options: {
  name: string
  value: any
  type: string
  optional?: boolean
}): never | void {
  const { name, value, type, optional } = options
  if (!optional && typeof value === 'undefined') {
    throw new Error(`"${name}" is required`)
  }

  if (
    typeof value !== 'undefined' &&
    (type === 'array' ? Array.isArray(type) : typeof value !== type)
  ) {
    throw new Error(
      `"${name}" must be of type: ${type}, received type: ${typeof value} from value: ${value}`
    )
  }
}

function invalidParams(
  params: object,
  validParams: string[],
  functionName: string
): void | never {
  const invalid = Object.keys(params)

  if (invalid.length > 0) {
    throw new Error(
      `${
        invalid[0]
      } is not a valid parameter for ${functionName}, must be one of the following valid parameters: ${validParams.join(
        ', '
      )}`
    )
  }
}

export function validateInit(init: Initialization): never | void {
  validateType({ name: 'init', value: init, type: 'object' })

  const { dappId, networkId, subscriptions, modules, ...otherParams } = init

  invalidParams(otherParams, ['dappId', 'subscriptions', 'modules'], 'init')

  validateType({ name: 'dappId', value: dappId, type: 'string' })
  validateType({ name: 'networkId', value: networkId, type: 'number' })

  validateSubscriptions(subscriptions)
  validateModules(modules)
}

function validateSubscriptions(subscriptions: Subscriptions): never | void {
  validateType({
    name: 'subscriptions',
    value: subscriptions,
    type: 'object',
    optional: true
  })

  if (subscriptions) {
    Object.keys(subscriptions).forEach((key: string) => {
      if (!validSubscriptionKey(key)) {
        throw new Error(
          `${key} is not a valid subscription parameter, must be one of the following keys: ${validSubscriptionKeys.join(
            ', '
          )}`
        )
      }

      validateType({
        name: 'subscription parameter',
        value: subscriptions[key],
        type: 'function',
        optional: true
      })
    })
  }
}

function validateModules(modules: {
  walletSelect: WalletSelectModule
  walletCheck: WalletCheckModule[]
}): never | void {
  validateType({ name: 'modules', value: modules, type: 'object' })

  const { walletSelect, walletCheck, ...otherParams } = modules

  invalidParams(otherParams, ['walletSelect', 'walletCheck'], 'modules')

  validateWalletSelect(walletSelect)
  validateWalletCheck(walletCheck)
}

function validateWalletSelect(walletSelect: WalletSelectModule): never | void {
  validateType({ name: 'walletSelect', value: walletSelect, type: 'object' })

  const { heading, description, wallets, ...otherParams } = walletSelect

  invalidParams(
    otherParams,
    ['heading', 'description', 'wallets'],
    'walletSelect'
  )

  validateType({ name: 'heading', value: heading, type: 'string' })
  validateType({ name: 'description', value: description, type: 'string' })

  validateType({ name: 'wallets', value: wallets, type: 'array' })

  wallets.forEach((module: WalletModule) => {
    validateWalletModule(module)
  })
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
    preferred,
    desktop,
    mobile,
    ...otherParams
  } = module

  invalidParams(
    otherParams,
    [
      'name',
      'iconSrc',
      'iconSrcSet',
      'svg',
      'wallet',
      'link',
      'installMessage',
      'preferred'
    ],
    'module'
  )

  validateType({ name: 'name', value: name, type: 'string' })
  validateType({ name: 'wallet', value: wallet, type: 'function' })
  validateType({
    name: 'iconSrc',
    value: iconSrc,
    type: 'string',
    optional: true
  })
  validateType({
    name: 'iconSrcSet',
    value: iconSrcSet,
    type: 'string',
    optional: true
  })
  validateType({ name: 'svg', value: svg, type: 'string', optional: true })
  validateType({ name: 'link', value: link, type: 'string', optional: true })
  validateType({
    name: 'installMessage',
    value: installMessage,
    type: 'function',
    optional: true
  })
  validateType({
    name: 'preferred',
    value: preferred,
    type: 'boolean',
    optional: true
  })
  validateType({
    name: 'desktop',
    value: desktop,
    type: 'boolean',
    optional: true
  })
  validateType({
    name: 'mobile',
    value: mobile,
    type: 'boolean',
    optional: true
  })
}

function validateWalletCheck(walletCheck: WalletCheckModule[]): never | void {
  validateType({ name: 'walletCheck', value: walletCheck, type: 'array' })

  walletCheck.forEach((module: WalletCheckModule) => {
    validateType({
      name: 'walletCheck module',
      value: module,
      type: 'function'
    })
  })
}

function validSubscriptionKey(key: string): boolean {
  return !!validSubscriptionKeys.find((validKey: string) => validKey === key)
}

export function validateConfig(configuration: ConfigOptions): never | void {
  validateType({ name: 'configuration', value: configuration, type: 'object' })

  const { darkMode, ...otherParams } = configuration

  invalidParams(otherParams, ['darkMode'], 'configuration')

  validateType({
    name: 'darkMode',
    value: darkMode,
    type: 'boolean',
    optional: true
  })
}

export function validateModal(modal: WalletCheckModal): never | void {
  validateType({ name: 'modal', value: modal, type: 'object' })

  const {
    img,
    heading,
    description,
    button,
    invalidMsg,
    eventCode,
    action,
    loading,
    icon,
    loading,
    ...otherParams
  } = modal

  invalidParams(
    otherParams,
    [
      'img',
      'heading',
      'description',
      'button',
      'invalidMsg',
      'eventCode',
      'action',
      'icon'
    ],
    'modal'
  )

  validateType({ name: 'img', value: img, type: 'string', optional: true })
  validateType({ name: 'heading', value: heading, type: 'string' })
  validateType({ name: 'description', value: description, type: 'string' })
  validateType({
    name: 'invalidMsg',
    value: invalidMsg,
    type: 'string',
    optional: true
  })
  validateType({ name: 'eventCode', value: eventCode, type: 'string' })
  validateType({
    name: 'action',
    value: action,
    type: 'function',
    optional: true
  })

  validateType({
    name: 'loading',
    value: loading,
    type: 'function',
    optional: true
  })

  validateType({
    name: 'button',
    value: button,
    type: 'object',
    optional: true
  })

  if (button) {
    const { onclick, text, ...restParams } = button
    invalidParams(restParams, ['onclick', 'text'], 'button')
    validateType({ name: 'onclick', value: onclick, type: 'function' })
    validateType({ name: 'text', value: text, type: 'string' })
  }

  validateType({ name: 'icon', value: icon, type: 'string', optional: true })
}

export function validateWalletInterface(
  walletInterface: WalletInterface
): never | void {
  validateType({
    name: 'walletInterface',
    value: walletInterface,
    type: 'object'
  })

  const {
    name,
    connect,
    disconnect,
    address,
    network,
    balance,
    ...otherParams
  } = walletInterface

  invalidParams(
    otherParams,
    ['name', 'connect', 'disconnect', 'address', 'network', 'balance'],
    'walletInterface'
  )

  validateType({ name: 'name', value: name, type: 'string' })
  validateType({
    name: 'connect',
    value: connect,
    type: 'function',
    optional: true
  })
  validateType({
    name: 'disconnect',
    value: disconnect,
    type: 'function',
    optional: true
  })

  validateType({ name: 'address', value: address, type: 'object' })
  validateType({
    name: 'address.get',
    value: address.get,
    type: 'function',
    optional: true
  })
  validateType({
    name: 'address.onChange',
    value: address.onChange,
    type: 'function',
    optional: true
  })

  validateType({ name: 'network', value: network, type: 'object' })
  validateType({
    name: 'network.get',
    value: network.get,
    type: 'function',
    optional: true
  })
  validateType({
    name: 'network.onChange',
    value: network.onChange,
    type: 'function',
    optional: true
  })

  validateType({ name: 'balance', value: balance, type: 'object' })
  validateType({
    name: 'balance.get',
    value: balance.get,
    type: 'function',
    optional: true
  })
  validateType({
    name: 'balance.onChange',
    value: balance.onChange,
    type: 'function',
    optional: true
  })
}

export function validateWalletCheckInit(
  walletCheckInit: WalletCheckInit[]
): void | never {
  validateType({
    name: 'walletCheckInit',
    value: walletCheckInit,
    type: 'array'
  })

  walletCheckInit.forEach(init => {
    validateType({ name: 'walletCheckInit', value: init, type: 'object' })
    validateType({
      name: 'walletCheckInit.name',
      value: init.name,
      type: 'string'
    })
    validateType({
      name: 'walletCheckInit.networkId',
      value: init.networkId,
      type: 'number',
      optional: true
    })
    validateType({
      name: 'walletCheckInit.minimumBalance',
      value: init.minimumBalance,
      type: 'string',
      optional: true
    })
  })
}

export function validateWalletInit(walletInit: WalletInit[]): void | never {
  validateType({
    name: 'walletInit',
    value: walletInit,
    type: 'array'
  })

  walletInit.forEach(init => {
    validateType({ name: 'walletInit', value: init, type: 'object' })
    validateType({
      name: 'walletInit.name',
      value: init.name,
      type: 'string'
    })
    validateType({
      name: 'walletInit.apiKey',
      value: init.apiKey,
      type: 'string',
      optional: true
    })
    validateType({
      name: 'walletInit.networkId',
      value: init.networkId,
      type: 'number',
      optional: true
    })
    validateType({
      name: 'walletInit.infuraKey',
      value: init.infuraKey,
      type: 'string',
      optional: true
    })
    validateType({
      name: 'walletInit.preferred',
      value: init.preferred,
      type: 'boolean',
      optional: true
    })
  })
}
