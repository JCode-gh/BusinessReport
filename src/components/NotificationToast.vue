<script setup lang="ts">
import { AlertCircle, CheckCircle2, X } from 'lucide-vue-next';
import { useNotification } from '../composables/useNotification';

const { notification, hideNotification } = useNotification();
</script>

<template>
  <Teleport to="body">
    <Transition name="notification-slide">
      <div
        v-if="notification.visible"
        class="notification-toast"
        :class="`notification-${notification.type}`"
        role="alert"
      >
        <div class="notification-content">
          <div class="notification-header">
            <AlertCircle v-if="notification.type === 'error'" :size="18" />
            <CheckCircle2 v-if="notification.type === 'success'" :size="18" />
            <strong>{{ notification.title }}</strong>
          </div>
          <p>{{ notification.message }}</p>
        </div>
        <button
          class="notification-close"
          type="button"
          @click="hideNotification"
          aria-label="Close notification"
        >
          <X :size="16" />
        </button>
      </div>
    </Transition>
  </Teleport>
</template>
