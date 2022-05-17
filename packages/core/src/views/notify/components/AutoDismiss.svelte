<script lang="ts">
  import type {
    CustomNotificationObject,
    NotificationObject
  } from '../../../types'

  import { notifications } from '../../../stores'
  export let notification: NotificationObject & CustomNotificationObject

  if (notification.autoDismiss && notification.id) {
    setTimeout(() => {
      notifications.remove(notification.id, notification.eventCode)
    }, notification.autoDismiss)
  }
</script>
