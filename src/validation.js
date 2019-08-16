import ow from "ow"

export function validateConfig(config) {
  ow(
    config,
    "config",
    ow.object.exactShape({
      networkId: ow.number,
      dappId: ow.string,
      subscriptions: ow.optional.object.exactShape({
        address: ow.optional.function,
        network: ow.optional.function,
        balance: ow.optional.function
      }),
      modules: ow.object.exactShape({
        selectWallet: ow.object.exactShape({
          heading: ow.string,
          description: ow.string,
          wallets: ow.object.exactShape({
            mobile: ow.array.nonEmpty.ofType(
              ow.object.exactShape({
                name: ow.string,
                icon: ow.string,
                connect: ow.function,
                link: ow.string,
                installMessage: ow.function
              })
            ),
            desktop: ow.array.nonEmpty.ofType(
              ow.object.exactShape({
                name: ow.string,
                icon: ow.string,
                connect: ow.function,
                link: ow.string,
                installMessage: ow.function
              })
            )
          })
        })
      })
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
      action: ow.optional.function
    })
  )
}

export function validateProviderInterface(providerInterface) {
  ow(
    providerInterface,
    "provider interface",
    ow.object.exactShape({
      address: ow.object
        .hasAnyKeys("get", "onChange")
        .valuesOfType(ow.function),
      network: ow.object
        .hasAnyKeys("get", "onChange")
        .valuesOfType(ow.function),
      balance: ow.object
        .hasAnyKeys("get", "onChange")
        .valuesOfType(ow.function),
      connect: ow.optional.function,
      name: ow.string
    })
  )
}
