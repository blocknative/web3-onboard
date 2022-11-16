export type UauthInitOptions = {
    clientID: string
    redirectUri: string
    scope?: string
    shouldLoginWithRedirect?: boolean
    bridge?: string
    qrcodeModalOptions?: {
        mobileLinks: string[]
    }
    connectFirstChainId?: boolean
}

