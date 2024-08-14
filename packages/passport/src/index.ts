import type { WalletInit } from '@web3-onboard/common'
import type { AuthenticatedHeaders } from '@0xpass/passport/dist/types'
import type { PassportOptions } from './types'
import { Network } from '@0xpass/passport'

async function createUsernameModal(
  passport: any,
  iconPath: string,
  encryptionSecret: string = '',
  setSession: (headers: AuthenticatedHeaders, secret: string) => void
): Promise<string> {
  const passportLogo = (await import('./passportlogo.svg')).default

  return new Promise((resolve, reject) => {
    const modal = document.createElement('div')
    const modalContent = document.createElement('div')
    const closeButton = document.createElement('button')
    const header = document.createElement('h1')
    const image = document.createElement('img')
    const input = document.createElement('input')
    const submitButton = document.createElement('button')
    const signInUpHeader = document.createElement('h2')

    modal.style.position = 'fixed'
    modal.style.left = '0'
    modal.style.top = '0'
    modal.style.width = '100%'
    modal.style.height = '100%'
    modal.style.backgroundColor = 'rgba(0, 0, 0, 0.75)'
    modal.style.display = 'flex'
    modal.style.justifyContent = 'center'
    modal.style.alignItems = 'center'
    modal.style.zIndex = '1000'

    modalContent.style.backgroundColor = '#000'
    modalContent.style.width = '400px'
    modalContent.style.padding = '20px'
    modalContent.style.borderRadius = '10px'
    modalContent.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)'
    modalContent.style.display = 'flex'
    modalContent.style.flexDirection = 'column'
    modalContent.style.alignItems = 'center'
    modalContent.style.position = 'relative'

    closeButton.style.position = 'absolute'
    closeButton.style.top = '10px'
    closeButton.style.right = '10px'
    closeButton.style.background = '#333'
    closeButton.style.border = 'none'
    closeButton.style.cursor = 'pointer'
    closeButton.style.borderRadius = '50%'
    closeButton.style.width = '30px'
    closeButton.style.height = '30px'
    closeButton.style.display = 'flex'
    closeButton.style.alignItems = 'center'
    closeButton.style.justifyContent = 'center'
    closeButton.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 6L6 18" stroke="#999" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M6 6L18 18" stroke="#999" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`
    closeButton.onclick = () => {
      document.body.removeChild(modal)
      reject(new Error('Passport modal closed.'))
    }

    header.innerHTML =
      'Passkeys <span style="font-size: 10px; font-weight: 600;">(by Passport Protocol)</span>'
    header.style.color = '#FFF'
    header.style.marginTop = '20px'
    header.style.marginBottom = '20px'
    header.style.fontSize = '18px'

    signInUpHeader.textContent = 'Sign In / Up'
    signInUpHeader.style.color = '#FFF'
    signInUpHeader.style.marginTop = '5px'
    signInUpHeader.style.marginBottom = '20px'
    signInUpHeader.style.fontSize = '22px'
    signInUpHeader.style.fontWeight = 'bold'
    signInUpHeader.style.textAlign = 'center'

    if (iconPath) {
      image.src = iconPath
    } else {
      image.src = `data:image/svg+xml;base64,${btoa(passportLogo)}`
    }
    image.style.width = '100px'
    image.style.height = '100px'
    image.style.marginBottom = '40px'

    input.type = 'text'
    input.placeholder = 'Enter your username'
    input.style.fontSize = '14px'
    input.style.padding = '14px'
    input.style.marginBottom = '16px'
    input.style.border = '1px solid rgb(75, 85, 99)'
    input.style.borderRadius = '6px'
    input.style.backgroundColor = '#161618'
    input.style.color = '#FFF'
    input.style.width = 'calc(100% - 24px)'
    input.style.textAlign = 'center'
    input.style.outline = '1px solid black'

    submitButton.textContent = 'Continue'
    submitButton.style.padding = '14px 20px'
    submitButton.style.border = '1px solid #FFF'
    submitButton.style.borderRadius = '6px'
    submitButton.style.backgroundColor = 'black'
    submitButton.style.color = '#FFF'
    submitButton.style.fontSize = '14px'
    submitButton.style.cursor = 'pointer'
    submitButton.style.marginTop = '8px'
    submitButton.style.width = 'calc(100% - 24px)'

    submitButton.onmouseover = () => {
      submitButton.style.backgroundColor = '#161618'
    }

    submitButton.onmouseout = () => {
      submitButton.style.backgroundColor = 'black'
    }

    submitButton.onclick = async () => {
      const username = input.value.trim()
      if (username) {
        input.disabled = true
        submitButton.disabled = true
        submitButton.textContent = 'Loading...'

        try {
          let authenticatedHeaders
          try {
            // Attempt to authenticate the user
            ;[authenticatedHeaders] = await passport.authenticate({
              username: username,
              userDisplayName: username
            })
            setSession(authenticatedHeaders, encryptionSecret)
          } catch (error) {
            // If authentication fails due to user not being registered
            // attempt to register the user.
            const errorMessage: string = (error as Error).message
            if (
              errorMessage.includes(
                'Account credential lookup yielded no results'
              )
            ) {
              const register = await passport.register({
                username: username,
                userDisplayName: username
              })

              if (!register.result) {
                throw new Error('Unable to register user')
              }

              ;[authenticatedHeaders] = await passport.authenticate({
                username: username,
                userDisplayName: username
              })
              setSession(authenticatedHeaders, encryptionSecret)
            } else {
              input.style.border = '1px solid #ff6666'
            }
          }
          resolve(authenticatedHeaders)
          document.body.removeChild(modal)
        } catch (error) {
          reject(error)
        } finally {
          submitButton.textContent = 'Continue'
          input.disabled = false
          submitButton.disabled = false
        }
      } else {
        input.style.border = '1px solid #ff6666'
      }
    }

    modalContent.appendChild(closeButton)
    modalContent.appendChild(header)
    modalContent.appendChild(signInUpHeader)
    modalContent.appendChild(image)
    modalContent.appendChild(input)
    modalContent.appendChild(submitButton)
    modal.appendChild(modalContent)
    document.body.appendChild(modal)

    input.focus()

    // Close modal when clicking outside the modal content
    modal.addEventListener('click', function (event) {
      if (event.target === modal) {
        reject(new Error('Passport modal closed.'))
        document.body.removeChild(modal)
      }
    })
  })
}

function passport(options: PassportOptions): WalletInit {
  return () => {
    return {
      label: 'Passport',
      getIcon: async () => (await import('./icon')).default,
      getInterface: async ({ EventEmitter }) => {
        const { Passport, Network } = await import('@0xpass/passport')
        const { createPassportClient } = await import('@0xpass/passport-viem')
        const { http } = await import('viem')
        const { mainnet } = await import('viem/chains')
        const { createEIP1193Provider } = await import('@web3-onboard/common')
        const CryptoJS = await import('crypto-js')

        function encrypt(data: string, secret: string): string {
          return CryptoJS.AES.encrypt(data, secret).toString()
        }

        function decrypt(data: string, secret: string): string {
          const bytes = CryptoJS.AES.decrypt(data, secret)
          return bytes.toString(CryptoJS.enc.Utf8)
        }

        function setSession(
          authenticatedHeaders: AuthenticatedHeaders,
          encryptionSecret: string = ''
        ) {
          const expirySeconds = 60 * 60
          const sessionData = {
            authenticatedHeaders,
            expiry: new Date().getTime() + expirySeconds * 1000
          }
          const sessionString = JSON.stringify(sessionData)
          const encryptedSession = encrypt(sessionString, encryptionSecret)

          window.localStorage.setItem('passport-onboard', encryptedSession)
        }

        function checkAuthenticated(encryptionSecret: string = '') {
          const session = window?.localStorage.getItem('passport-onboard')
          if (!session) {
            return false
          }

          let sessionString
          try {
            sessionString = decrypt(session, encryptionSecret)
          } catch (error) {
            // If decryption fails, assume the encryption secret has changed or is removed
            window.localStorage.removeItem('passport-onboard')
            return false
          }

          const sessionData = JSON.parse(sessionString)

          if (new Date().getTime() > sessionData.expiry) {
            window.localStorage.removeItem('passport-onboard')
            return false
          }

          return sessionData.authenticatedHeaders
        }

        const passport = new Passport({
          signer: options.signer,
          scopeId: options.scopeId,
          network: options.network || Network.TESTNET
        })

        await passport.setupEncryption()

        let authenticatedHeaders = checkAuthenticated(options.encryptionSecret)

        if (!authenticatedHeaders) {
          authenticatedHeaders = await createUsernameModal(
            passport,
            options.iconPath,
            options.encryptionSecret,
            setSession
          )
        }

        // At this point, authenticatedHeaders should be defined
        const client = await createPassportClient(
          authenticatedHeaders,
          http(options.fallbackProvider),
          options.chain ?? mainnet,
          options.network ?? Network.TESTNET
        )

        const provider = createEIP1193Provider(client)

        const events = new EventEmitter()
        provider.on = events.on.bind(events)

        return {
          instance: passport,
          provider: provider
        }
      }
    }
  }
}

export default passport
export { Network }
