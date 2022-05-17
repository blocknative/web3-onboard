import type { NotificationType } from './types'

export function eventToType(eventCode: string | undefined): NotificationType {
  switch (eventCode) {
    case 'txSent':
    case 'txPool':
    case 'txSpeedUp':
    case 'txCancel':
      return 'pending'
    case 'txRequest':
    case 'txRepeat':
    case 'txAwaitingApproval':
    case 'txConfirmReminder':
    case 'txStallPending':
    case 'txStallConfirmed':
    case 'txStuck':
      return 'hint'
    case 'txError':
    case 'txSendFail':
    case 'txFailed':
    case 'txDropped':
    case 'nsfFail':
    case 'txUnderpriced':
      return 'error'
    case 'txConfirmed':
      return 'success'
    default:
      return 'hint'
  }
}

export function typeToDismissTimeout(type: string): number {
  switch (type) {
    case 'success':
    case 'hint':
      return 4000
    default:
      return 0
  }
}
