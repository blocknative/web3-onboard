declare module "promise-cancelable" {
  export default class Cancelable extends Promise<any> {
    constructor(executor: any)
    cancel(): any
    isFulfilled(): any
    isResolved(): any
    isRejected(): any
  }
}
declare module "@walletconnect/web3-provider"
declare module "squarelink"
declare module "fortmatic"
