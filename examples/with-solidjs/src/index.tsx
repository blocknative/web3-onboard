/* @refresh reload */
import { render } from 'solid-js/web'
import OnboardProvider from './providers/onboard-provider'
import './index.css'
import App from './App'

const root = document.getElementById('root')

render(
  () => (
    <OnboardProvider>
      <App />
    </OnboardProvider>
  ),
  root
)
