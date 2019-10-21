export function validateInit(init) {
  if (!init || typeof init !== "object") {
    throw new Error(
      `"onboard" must be called with an initialization object, received: ${init}`
    )
  }

  const { networkId, dappId, subscriptions, modules } = init

  if (!dappId || typeof dappId !== "string") {
    throw new Error(`"dappId" must be of type string, received: ${dappId}`)
  }

  if (!networkId || typeof networkId !== "number") {
    throw new Error(
      `"networkId" must be of type number, received: ${networkId}`
    )
  }

  validateSubscriptions(subscriptions)
  validateModules(modules)
}

function validateSubscriptions(subscriptions) {
  if (subscriptions) {
    if (typeof subscriptions !== "object") {
      throw new Error(
        `"subscriptions" must be of type object, received: ${subscriptions}`
      )
    }

    Object.keys(subscriptions).forEach(key => {
      if (!validSubscriptionKey(subscriptions[key])) {
        throw new Error(
          `${key} is not a valid subscription listener, received: ${key}`
        )
      }

      if (subscriptions[key] !== "function") {
        throw new Error(
          `subscription listener must be a function, received: ${subscriptions[key]}`
        )
      }
    })
  }
}

function validateModules(modules) {
  if (!modules || typeof modules !== "object") {
    throw new Error(
      `"onboard" must be called with a modules object, received: ${modules}`
    )
  }

  const { walletSelect, walletReady } = modules

  validateWalletSelect(walletSelect)
  validateWalletReady(walletReady)
}

function validateWalletSelect(walletSelect) {
  if (!walletSelect || typeof walletSelect !== "object") {
    throw new Error(
      `"modules" must have a "walletSelect" object, received: ${walletSelect}`
    )
  }

  const { heading, description, wallets } = walletSelect

  if (!heading || typeof heading !== "string") {
    throw new Error(
      `"walletSelect" requires a "heading" parameter of type string, received: ${heading}`
    )
  }

  if (!description || typeof description !== "string") {
    throw new Error(
      `"walletSelect" requires a "description" parameter of type string, received: ${description}`
    )
  }

  if (!wallets || typeof wallets !== "object") {
    throw new Error(
      `"walletSelect" must have a "wallets" object, received: ${wallets}`
    )
  }

  const { mobile, desktop } = wallets

  if (mobile) {
    if (!Array.isArray(mobile) || mobile.length < 1) {
      throw new Error(
        `"mobile" must be an array of at least one wallet object, received: ${mobile}`
      )
    }

    mobile.forEach(module => {
      validateWalletModule(module)
    })
  }

  if (desktop) {
    if (!Array.isArray(desktop) || desktop.length < 1) {
      throw new Error(
        `"desktop" must be an array of at least one wallet object, received: ${desktop}`
      )
    }

    desktop.forEach(module => {
      validateWalletModule(module)
    })
  }
}

function validateWalletModule(module) {
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

  if (!name || typeof name !== "string") {
    throw new Error(
      `wallet module must have a name property of type string, received: ${name}`
    )
  }

  if (!wallet || typeof wallet !== "string") {
    throw new Error(
      `wallet module must have a "wallet" property of type string, received: ${wallet}`
    )
  }

  if (iconSrc && typeof iconSrc !== "string") {
    throw new Error(`"iconSrc" must be of type string, received: ${iconSrc}`)
  }

  if (iconSrcSet && typeof iconSrcSet !== "string") {
    throw new Error(
      `"iconSrcSet" must be of type string, received: ${iconSrcSet}`
    )
  }

  if (svg && typeof svg !== "string") {
    throw new Error(`"svg" must be of type string, received: ${svg}`)
  }

  if (link && typeof link !== "string") {
    throw new Error(`"link" must be of type string, received: ${link}`)
  }

  if (installMessage && typeof installMessage !== "function") {
    throw new Error(
      `"installMessage" must be of type function, received: ${installMessage}`
    )
  }

  if (preferred && typeof preferred !== "boolean") {
    throw new Error(
      `"preferred" must be of type boolean, received: ${preferred}`
    )
  }
}

function validateWalletReady(walletReady) {
  if (!walletReady || typeof walletReady !== "object") {
    throw new Error(
      `"modules" must have a "walletReady" object, received: ${walletReady}`
    )
  }

  if (!Array.isArray(walletReady) || walletReady.length < 1) {
    throw new Error(
      `"walletReady" must be an array of at least one readiness object, received: ${walletReady}`
    )
  }

  walletReady.forEach(module => {
    if (typeof module !== "function") {
      throw new Error(
        `"walletReady" module must be of type function, received: ${module}`
      )
    }
  })
}

function validSubscriptionKey(key) {
  switch (key) {
    case "address":
    case "network":
    case "balance":
    case "wallet":
      return true
    default:
      return false
  }
}

export function validateConfig(configuration) {
  ow(
    configuration,
    "config",
    ow.object.exactShape({
      darkMode: ow.boolean
    })
  )
}

export function validateModal(modal) {
  ow(
    modal,
    "modal",
    ow.object.exactShape({
      img: ow.optional.string,
      heading: ow.string,
      description: ow.string,
      button: ow.optional.string,
      invalidMsg: ow.optional.string,
      eventCode: ow.string,
      action: ow.optional.function,
      button: ow.optional.object.exactShape({
        onclick: ow.function,
        text: ow.string
      }),
      icon: ow.optional.string
    })
  )
}

export function validateWalletInterface(walletInterface) {
  ow(
    walletInterface,
    "wallet interface",
    ow.object.exactShape({
      name: ow.string,
      connect: ow.optional.function,
      disconnect: ow.optional.function,
      address: ow.object
        .hasAnyKeys("get", "onChange")
        .valuesOfType(ow.function),
      network: ow.object
        .hasAnyKeys("get", "onChange")
        .valuesOfType(ow.function),
      balance: ow.object.hasAnyKeys("get", "onChange").valuesOfType(ow.function)
    })
  )
}
