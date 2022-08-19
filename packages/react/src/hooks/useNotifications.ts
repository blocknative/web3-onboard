import type {
  CustomNotification,
  Notify,
  UpdateNotification,
  Notification,
  PreflightNotificationsOptions
} from '@web3-onboard/core'
import { useWeb3Onboard } from '../context'
import { useAppState } from './useAppState'

export const useNotifications = (): [
  Notification[],
  (updatedNotification: CustomNotification) => {
    dismiss: () => void
    update: UpdateNotification
  },
  (update: Partial<Notify>) => void,
  (options: PreflightNotificationsOptions) => Promise<void | string>
] => {
  const web3Onboard = useWeb3Onboard()

  const customNotification = web3Onboard.state.actions.customNotification
  const updateNotify = web3Onboard.state.actions.updateNotify
  const preflightNotifications =
    web3Onboard.state.actions.preflightNotifications

  return [
    useAppState('notifications'),
    customNotification,
    updateNotify,
    preflightNotifications
  ]
}
