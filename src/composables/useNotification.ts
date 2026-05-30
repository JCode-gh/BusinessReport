import { reactive } from 'vue';

const notification = reactive({
  visible: false,
  title: '',
  message: '',
  type: 'error' as 'error' | 'success' | 'info',
});

let notificationTimer: number | null = null;

export function useNotification() {
  function showNotification(
    title: string,
    message: string,
    type: 'error' | 'success' | 'info' = 'error'
  ) {
    if (notificationTimer) {
      clearTimeout(notificationTimer);
    }
    notification.title = title;
    notification.message = message;
    notification.type = type;
    notification.visible = true;
    notificationTimer = window.setTimeout(() => {
      notification.visible = false;
    }, 5000);
  }

  function hideNotification() {
    notification.visible = false;
    if (notificationTimer) {
      clearTimeout(notificationTimer);
      notificationTimer = null;
    }
  }

  return {
    notification,
    showNotification,
    hideNotification,
  };
}
