import '../styles/globals.css'
import type { AppProps } from 'next/app'
import web3Onboard from '../web3-onboard'
import { Web3OnboardProvider } from '@web3-onboard/react'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Web3OnboardProvider web3Onboard={web3Onboard}>
      <Component {...pageProps} />
    </Web3OnboardProvider>
  )
}
