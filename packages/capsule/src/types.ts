import { Environment } from '@usecapsule/web-sdk'
import { ChainId } from '@web3-onboard/common'

export type CapsuleInitOptions = {
    environment: Environment
    appName: string
    chainIds: number[]
    initialChainId: number
    apiKey?: string
}
