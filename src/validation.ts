import {
  Initialization,
  Subscriptions,
  WalletSelectModule,
  WalletCheckModule,
  WalletModule,
  ConfigOptions,
  WalletCheckModal,
  WalletInterface,
  WalletInitOptions,
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

  const {
    dappId,
    networkId,
    subscriptions,
    walletSelect,
    walletCheck,
    darkMode,
    ...otherParams
  } = init

  invalidParams(
    otherParams,
    [
      'dappId',
      'networkId',
      'subscriptions',
      'walletSelect',
      'walletCheck',
      'darkMode'
    ],
    'init'
  )

  validateType({ name: 'dappId', value: dappId, type: 'string' })
  validateType({ name: 'networkId', value: networkId, type: 'number' })
  validateType({
    name: 'darkMode',
    value: darkMode,
    type: 'boolean',
    optional: true
  })

  validateType({
    name: 'subscriptions',
    value: subscriptions,
    type: 'object',
    optional: true
  })

  if (subscriptions) {
    validateSubscriptions(subscriptions)
  }

  validateType({
    name: 'walletSelect',
    value: walletSelect,
    type: 'object',
    optional: true
  })

  if (walletSelect) {
    validateWalletSelect(walletSelect)
  }

  validateType({
    name: 'walletCheck',
    value: walletCheck,
    type: 'object',
    optional: true
  })

  if (walletCheck) {
    validateWalletCheck(walletCheck)
  }
}

function validateSubscriptions(subscriptions: Subscriptions): never | void {
  const { address, network, balance, wallet, ...otherParams } = subscriptions

  invalidParams(otherParams, validSubscriptionKeys, 'subscriptions')

  validateType({
    name: 'subscriptions.address',
    value: address,
    type: 'function',
    optional: true
  })

  validateType({
    name: 'subscriptions.network',
    value: network,
    type: 'function',
    optional: true
  })

  validateType({
    name: 'subscriptions.balance',
    value: balance,
    type: 'function',
    optional: true
  })

  validateType({
    name: 'subscriptions.wallet',
    value: wallet,
    type: 'function',
    optional: true
  })
}

function validateWalletSelect(walletSelect: WalletSelectModule): never | void {
  validateType({ name: 'walletSelect', value: walletSelect, type: 'object' })

  const { heading, description, wallets, ...otherParams } = walletSelect

  invalidParams(
    otherParams,
    ['heading', 'description', 'wallets'],
    'walletSelect'
  )

  validateType({
    name: 'heading',
    value: heading,
    type: 'string',
    optional: true
  })
  validateType({
    name: 'description',
    value: description,
    type: 'string',
    optional: true
  })

  if (Array.isArray(wallets)) {
    wallets.forEach(validateWallet)
  }
}

export function isWalletModule(obj: any): obj is WalletModule {
  return (obj as WalletModule).wallet !== undefined
}

export function isWalletInit(obj: any): obj is WalletInitOptions {
  return (obj as WalletInitOptions).walletName !== undefined
}

export function validateWallet(
  obj: WalletModule | WalletInitOptions
): never | void {
  validateType({
    name: 'selectWallet.wallets item',
    value: obj,
    type: 'object'
  })

  if (isWalletModule(obj)) {
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
    } = obj

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
        'preferred',
        'desktop',
        'mobile'
      ],
      'selectWallets.wallets item'
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

    return
  }

  validateWalletInit(obj)
}

export function isWalletCheckModule(obj: any): obj is WalletCheckModule {
  return typeof obj === 'function'
}

function validateWalletCheck(
  walletCheck: Array<WalletCheckModule | WalletCheckInit>
): never | void {
  validateType({ name: 'walletCheck', value: walletCheck, type: 'array' })
  walletCheck.forEach(check => {
    if (isWalletCheckModule(check)) {
      validateWalletCheckModule(check)
    } else {
      validateType({ name: 'walletCheck item', value: check, type: 'object' })
      const { checkName, minimumBalance, ...otherParams } = check
      invalidParams(
        otherParams,
        ['checkName', 'minimumBalance'],
        'walletCheck item'
      )
      validateType({ name: 'checkName', value: checkName, type: 'string' })
      validateType({
        name: 'minimumBalance',
        value: minimumBalance,
        type: 'string',
        optional: true
      })
    }
  })
}

export function validateWalletCheckModule(module: WalletCheckModule) {
  validateType({
    name: 'walletCheck module',
    value: module,
    type: 'function'
  })
}

export function validateConfig(configuration: ConfigOptions): never | void {
  validateType({ name: 'configuration', value: configuration, type: 'object' })

  const { darkMode, networkId, ...otherParams } = configuration

  invalidParams(otherParams, ['darkMode', 'networkId'], 'configuration')

  validateType({
    name: 'darkMode',
    value: darkMode,
    type: 'boolean',
    optional: true
  })

  validateType({
    name: 'networkId',
    value: networkId,
    type: 'number',
    optional: true
  })
}

export function validateModal(modal: WalletCheckModal): never | void {
  validateType({ name: 'modal', value: modal, type: 'object' })

  const {
    heading,
    description,
    button,
    eventCode,
    action,
    icon,
    html,
    ...otherParams
  } = modal

  invalidParams(
    otherParams,
    ['heading', 'description', 'button', 'eventCode', 'action', 'icon', 'html'],
    'modal'
  )

  validateType({ name: 'heading', value: heading, type: 'string' })
  validateType({ name: 'description', value: description, type: 'string' })
  validateType({ name: 'eventCode', value: eventCode, type: 'string' })
  validateType({
    name: 'action',
    value: action,
    type: 'function',
    optional: true
  })

  validateType({
    name: 'button',
    value: button,
    type: 'object',
    optional: true
  })

  validateType({
    name: 'html',
    value: html,
    type: 'string',
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
      name: 'walletCheckInit.checkName',
      value: init.checkName,
      type: 'string'
    })

    validateType({
      name: 'walletCheckInit.minimumBalance',
      value: init.minimumBalance,
      type: 'string',
      optional: true
    })
  })
}

export function validateWalletInit(
  walletInit: WalletInitOptions
): void | never {
  validateType({ name: 'walletInit', value: walletInit, type: 'object' })

  const {
    walletName,
    apiKey,
    networkId,
    infuraKey,
    preferred,
    label,
    iconSrc,
    svg,
    appUrl,
    email,
    rpcUrl,
    buildEnv,
    buttonPosition,
    enableLogging,
    loginMethod,
    showTorusButton,
    disableNotifications,
    appName,
    appLogoUrl,
    ...otherParams
  } = walletInit

  invalidParams(
    otherParams,
    [
      'walletName',
      'apiKey',
      'networkId',
      'infuraKey',
      'preferred',
      'label',
      'iconSrc',
      'svg',
      'appUrl',
      'email',
      'rpcUrl',
      'buildEnv',
      'buttonPosition',
      'enableLogging',
      'loginMethod',
      'showTorusButton',
      'appName',
      'appLogoUrl'
    ],
    'walletInitObject'
  )

  validateType({
    name: 'walletInit.walletName',
    value: walletName,
    type: 'string'
  })

  validateType({
    name: 'walletInit.apiKey',
    value: apiKey,
    type: 'string',
    optional: true
  })

  validateType({
    name: 'walletInit.networkId',
    value: networkId,
    type: 'number',
    optional: true
  })

  validateType({
    name: 'walletInit.infuraKey',
    value: infuraKey,
    type: 'string',
    optional: true
  })

  validateType({
    name: 'walletInit.preferred',
    value: preferred,
    type: 'boolean',
    optional: true
  })

  validateType({
    name: 'walletInit.label',
    value: label,
    type: 'string',
    optional: true
  })

  validateType({
    name: 'walletInit.iconSrc',
    value: iconSrc,
    type: 'string',
    optional: true
  })

  validateType({
    name: 'walletInit.svg',
    value: svg,
    type: 'string',
    optional: true
  })

  validateType({
    name: 'walletInit.appUrl',
    value: appUrl,

    type: 'string',
    optional: true
  })

  validateType({
    name: 'walletInit.email',
    value: email,

    type: 'string',
    optional: true
  })

  validateType({
    name: 'walletInit.rpcUrl',
    value: rpcUrl,
    type: 'string',
    optional: true
  })

  validateType({
    name: 'walletInit.enableLogging',
    value: enableLogging,
    type: 'boolean',
    optional: true
  })

  validateType({
    name: 'walletInit.loginMethod',
    value: loginMethod,
    type: 'string',
    optional: true
  })

  validateType({
    name: 'walletInit.showTorusButton',
    value: showTorusButton,
    type: 'boolean',
    optional: true
  })

  validateType({
    name: 'walletInit.buttonPosition',
    value: buttonPosition,
    type: 'string',
    optional: true
  })

  validateType({
    name: 'walletInit.buildEnv',
    value: buildEnv,
    type: 'string',
    optional: true
  })

  validateType({
    name: 'walletInit.disableNotifications',
    value: disableNotifications,
    type: 'boolean',
    optional: true
  })

  validateType({
    name: 'walletInit.appName',
    value: appName,
    type: 'string',
    optional: true
  })

  validateType({
    name: 'walletInit.appLogoUrl',
    value: appLogoUrl,
    type: 'string',
    optional: true
  })
}
