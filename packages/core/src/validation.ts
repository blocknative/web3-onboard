import Joi from 'joi'

import {
  type ChainId,
  type DecimalChainId,
  type WalletInit,
  type WalletModule,
  type ValidateReturn,
  type AppMetadata,
  chainNamespaceValidation,
  chainIdValidation,
  chainValidation,
  validate
} from '@web3-onboard/common'

import type {
  InitOptions,
  WalletState,
  ConnectOptions,
  DisconnectOptions,
  ConnectOptionsString,
  AccountCenter,
  NotifyOptions,
  Notification,
  CustomNotification,
  CustomNotificationUpdate,
  Notify,
  ConnectModalOptions,
  Theme
} from './types.js'

const unknownObject = Joi.object().unknown()

const connectedChain = Joi.object({
  namespace: chainNamespaceValidation.required(),
  id: chainIdValidation.required()
})

const ens = Joi.any().allow(
  Joi.object({
    name: Joi.string().required(),
    avatar: Joi.string(),
    contentHash: Joi.any().allow(Joi.string(), null),
    getText: Joi.function().arity(1).required()
  }),
  null
)

const uns = Joi.any().allow(
  Joi.object({
    name: Joi.string().required()
  }),
  null
)

const balance = Joi.any().allow(
  Joi.object({
    eth: Joi.number()
  }).unknown(),
  null
)

const secondaryTokens = Joi.any().allow(
  Joi.object({
    balance: Joi.string().required(),
    icon: Joi.string()
  }),
  null
)

const account = Joi.object({
  address: Joi.string().required(),
  ens,
  uns,
  balance,
  secondaryTokens
})

const chains = Joi.array()
  .items(chainValidation)
  .unique((a, b) => a.id === b.id)
  .error(e => {
    if (e[0].code === 'array.unique') {
      return new Error(
        `There is a duplicate Chain ID in your Onboard Chains array: ${e}`
      )
    }
    return new Error(`${e}`)
  })

const accounts = Joi.array().items(account)

const wallet = Joi.object({
  label: Joi.string(),
  icon: Joi.string(),
  provider: unknownObject,
  instance: unknownObject,
  accounts,
  chains: Joi.array().items(connectedChain),
  wagmiConnector: unknownObject
})
  .required()
  .error(new Error('wallet must be defined'))

const wallets = Joi.array().items(wallet)

const recommendedWallet = Joi.object({
  name: Joi.string().required(),
  url: Joi.string().uri().required()
})

const agreement = Joi.object({
  version: Joi.string().required(),
  termsUrl: Joi.string().uri(),
  privacyUrl: Joi.string().uri()
})

const appMetadata = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  icon: Joi.string(),
  logo: Joi.string(),
  gettingStartedGuide: Joi.string(),
  email: Joi.string(),
  appUrl: Joi.string(),
  explore: Joi.string(),
  recommendedInjectedWallets: Joi.array().items(recommendedWallet),
  agreement
})

const appMetadataUpdate = Joi.object({
  name: Joi.string(),
  description: Joi.string(),
  icon: Joi.string(),
  logo: Joi.string(),
  gettingStartedGuide: Joi.string(),
  email: Joi.string(),
  appUrl: Joi.string(),
  explore: Joi.string(),
  recommendedInjectedWallets: Joi.array().items(recommendedWallet),
  agreement
})

const walletModule = Joi.object({
  label: Joi.string().required(),
  getInfo: Joi.function().arity(1).required(),
  getInterface: Joi.function().arity(1).required()
})

const walletInit = Joi.array().items(Joi.function()).required()

const locale = Joi.string()

const commonPositions = Joi.string().valid(
  'topRight',
  'bottomRight',
  'bottomLeft',
  'topLeft'
)

const gasPriceProbabilities = [70, 80, 90, 95, 99]

const notify = Joi.object({
  transactionHandler: Joi.function().optional(),
  enabled: Joi.boolean(),
  position: commonPositions,
  replacement: Joi.object({
    gasPriceProbability: Joi.object({
      speedup: Joi.number().valid(...gasPriceProbabilities),
      cancel: Joi.number().valid(...gasPriceProbabilities)
    })
  })
})

const notifyOptions = Joi.object({
  desktop: notify,
  mobile: notify
})

const accountCenterInitOptions = Joi.object({
  enabled: Joi.boolean(),
  position: commonPositions,
  minimal: Joi.boolean(),
  containerElement: Joi.string(),
  hideTransactionProtectionBtn: Joi.boolean(),
  transactionProtectionInfoLink: Joi.string()
})

const accountCenter = Joi.object({
  enabled: Joi.boolean(),
  position: commonPositions,
  expanded: Joi.boolean(),
  minimal: Joi.boolean(),
  hideTransactionProtectionBtn: Joi.boolean(),
  transactionProtectionInfoLink: Joi.string(),
  containerElement: Joi.string()
})

const connectModalOptions = Joi.object({
  showSidebar: Joi.boolean(),
  disableClose: Joi.boolean(),
  autoConnectLastWallet: Joi.boolean(),
  autoConnectAllPreviousWallet: Joi.boolean(),
  iDontHaveAWalletLink: Joi.string(),
  wheresMyWalletLink: Joi.string(),
  removeWhereIsMyWalletWarning: Joi.boolean(),
  removeIDontHaveAWalletInfoLink: Joi.boolean(),
  disableUDResolution: Joi.boolean()
})

const containerElements = Joi.object({
  accountCenter: Joi.string(),
  connectModal: Joi.string()
})

const themeMap = Joi.object({
  '--w3o-background-color': Joi.string(),
  '--w3o-font-family': Joi.string(),
  '--w3o-foreground-color': Joi.string(),
  '--w3o-text-color': Joi.string(),
  '--w3o-border-color': Joi.string(),
  '--w3o-action-color': Joi.string(),
  '--w3o-border-radius': Joi.string()
})

const presetTheme = Joi.string().valid('default', 'dark', 'light', 'system')

const theme = Joi.alternatives().try(themeMap, presetTheme)

const initOptions = Joi.object({
  wallets: walletInit,
  chains: chains.required(),
  appMetadata: appMetadata,
  i18n: Joi.object().unknown(),
  apiKey: Joi.string(),
  accountCenter: Joi.object({
    desktop: accountCenterInitOptions,
    mobile: accountCenterInitOptions,
    hideTransactionProtectionBtn: Joi.boolean(),
    transactionProtectionInfoLink: Joi.string()
  }),
  notify: [notifyOptions, notify],
  gas: Joi.object({
    get: Joi.function().required(),
    stream: Joi.function().required()
  }),
  wagmi: Joi.function(),
  connect: connectModalOptions,
  containerElements: containerElements,
  // transactionPreview is deprecated but is still allowed to 
  // avoid breaking dapps a console error is shown although 
  // transactionPreview functionality has been removed
  transactionPreview: Joi.any(),
  theme: theme,
  disableFontDownload: Joi.boolean(),
  unstoppableResolution: Joi.function()
})

const connectOptions = Joi.object({
  autoSelect: Joi.alternatives().try(
    Joi.object({
      label: Joi.string().required(),
      disableModals: Joi.boolean()
    }),
    Joi.string()
  )
})

const disconnectOptions = Joi.object({
  label: Joi.string().required()
}).required()

const secondaryTokenValidation = Joi.object({
  address: Joi.string().required(),
  icon: Joi.string().optional()
})

const setChainOptions = Joi.object({
  chainId: chainIdValidation.required(),
  chainNamespace: chainNamespaceValidation,
  wallet: Joi.string(),
  rpcUrl: Joi.string(),
  label: Joi.string(),
  token: Joi.string(),
  protectedRpcUrl: Joi.string(),
  secondaryTokens: Joi.array().max(5).items(secondaryTokenValidation).optional()
})

const customNotificationUpdate = Joi.object({
  key: Joi.string().required(),
  type: Joi.string().allow('pending', 'error', 'success', 'hint'),
  eventCode: Joi.string(),
  message: Joi.string().required(),
  id: Joi.string().required(),
  autoDismiss: Joi.number(),
  onClick: Joi.function(),
  link: Joi.string()
})

const preflightNotifications = Joi.object({
  sendTransaction: Joi.function(),
  estimateGas: Joi.function(),
  gasPrice: Joi.function(),
  balance: Joi.alternatives(Joi.string(), Joi.number()),
  txDetails: Joi.object({
    value: Joi.alternatives(Joi.string(), Joi.number()),
    to: Joi.string(),
    from: Joi.string()
  }),
  txApproveReminderTimeout: Joi.number()
})

const customNotification = Joi.object({
  key: Joi.string(),
  type: Joi.string().allow('pending', 'error', 'success', 'hint'),
  eventCode: Joi.string(),
  message: Joi.string(),
  id: Joi.string(),
  autoDismiss: Joi.number(),
  onClick: Joi.function(),
  link: Joi.string()
})

const notification = Joi.object({
  id: Joi.string().required(),
  key: Joi.string().required(),
  type: Joi.string().allow('pending', 'error', 'success', 'hint').required(),
  eventCode: Joi.string().required(),
  message: Joi.string().required(),
  autoDismiss: Joi.number().required(),
  network: Joi.string().required(),
  startTime: Joi.number(),
  onClick: Joi.function(),
  link: Joi.string()
})

export function validateWallet(
  data: WalletState | Partial<WalletState>
): ValidateReturn {
  return validate(wallet, data)
}

export function validateInitOptions(data: InitOptions): ValidateReturn {
  return validate(initOptions, data)
}

export function validateWalletModule(data: WalletModule): ValidateReturn {
  return validate(walletModule, data)
}

export function validateConnectOptions(
  data: ConnectOptions | ConnectOptionsString
): ValidateReturn {
  return validate(connectOptions, data)
}

export function validateDisconnectOptions(
  data: DisconnectOptions
): ValidateReturn {
  return validate(disconnectOptions, data)
}

export function validateString(str: string, label?: string): ValidateReturn {
  return validate(
    Joi.string()
      .required()
      .label(label || 'value'),
    str
  )
}

export function validateSetChainOptions(data: {
  chainId: ChainId | DecimalChainId
  chainNamespace?: string
  wallet?: WalletState['label']
  rpcUrl?: string
  label?: string
  token?: string
}): ValidateReturn {
  return validate(setChainOptions, data)
}

export function validateAccountCenterUpdate(
  data: AccountCenter | Partial<AccountCenter>
): ValidateReturn {
  return validate(accountCenter, data)
}

export function validateConnectModalUpdate(
  data: ConnectModalOptions | Partial<ConnectModalOptions>
): ValidateReturn {
  return validate(connectModalOptions, data)
}

export function validateWalletInit(data: WalletInit[]): ValidateReturn {
  return validate(walletInit, data)
}

export function validateLocale(data: string): ValidateReturn {
  return validate(locale, data)
}

export function validateNotify(data: Partial<Notify>): ValidateReturn {
  return validate(notify, data)
}

export function validateNotifyOptions(
  data: Partial<NotifyOptions>
): ValidateReturn {
  return validate(notifyOptions, data)
}

export function validateNotification(data: Notification): ValidateReturn {
  return validate(notification, data)
}

export function validateCustomNotificationUpdate(
  data: CustomNotificationUpdate
): ValidateReturn {
  return validate(customNotificationUpdate, data)
}

export function validateCustomNotification(
  data: CustomNotification
): ValidateReturn {
  return validate(customNotification, data)
}

export function validateUpdateBalances(data: WalletState[]): ValidateReturn {
  return validate(wallets, data)
}

export function validateUpdateTheme(data: Theme): ValidateReturn {
  return validate(theme, data)
}

export function validateAppMetadataUpdate(
  data: AppMetadata | Partial<AppMetadata>
): ValidateReturn {
  return validate(appMetadataUpdate, data)
}
