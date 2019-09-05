import ow from "ow"

export function validateInit(init) {
  ow(
    init,
    "Initialization Options",
    ow.object.exactShape({
      networkId: ow.number,
      dappId: ow.string,
      subscriptions: ow.optional.object.exactShape({
        address: ow.optional.function,
        network: ow.optional.function,
        balance: ow.optional.function,
        provider: ow.optional.function
      }),
      modules: ow.object.exactShape({
        selectWallet: ow.object.exactShape({
          heading: ow.string,
          description: ow.string,
          wallets: ow.object.exactShape({
            mobile: ow.optional.array.nonEmpty.ofType(
              ow.object.exactShape({
                name: ow.string,
                iconSrc: ow.string,
                iconSrcSet: ow.optional.string,
                wallet: ow.function,
                link: ow.optional.string,
                installMessage: ow.optional.function
              })
            ),
            desktop: ow.optional.array.nonEmpty.ofType(
              ow.object.exactShape({
                name: ow.string,
                iconSrc: ow.string,
                iconSrcSet: ow.optional.string,
                wallet: ow.function,
                link: ow.optional.string,
                installMessage: ow.optional.function
              })
            )
          })
        }),
        prepareWallet: ow.array.nonEmpty.ofType(ow.function)
      })
    })
  )
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
