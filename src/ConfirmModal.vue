<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { AlertTriangle, X } from "lucide-vue-next";

const props = defineProps<{
  modelValue: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", v: boolean): void;
  (e: "confirm"): void;
}>();

function close() {
  emit("update:modelValue", false);
}

function confirm() {
  emit("confirm");
  close();
}

const dragFromPanel = ref(false);

function onKey(e: KeyboardEvent) {
  if (!props.modelValue) return;
  if (e.key === "Escape") close();
  if (e.key === "Enter") confirm();
}

onMounted(() => window.addEventListener("keydown", onKey));
onBeforeUnmount(() => window.removeEventListener("keydown", onKey));
</script>

<template>
  <Teleport to="body">
    <Transition name="cm-fade">
      <div v-if="modelValue" class="cm-overlay" @click.self="!dragFromPanel && close(); dragFromPanel = false">
        <div class="cm-panel" role="alertdialog" aria-modal="true" :aria-labelledby="'cm-title'" @mousedown="dragFromPanel = true">
          <button class="cm-close" type="button" @click="close" aria-label="Close">
            <X :size="18" />
          </button>

          <div class="cm-icon-wrap">
            <AlertTriangle :size="22" />
          </div>

          <h2 class="cm-title" id="cm-title">{{ title }}</h2>
          <p class="cm-message">{{ message }}</p>

          <div class="cm-actions">
            <button class="cm-cancel" type="button" @click="close">
              {{ cancelLabel ?? "Cancel" }}
            </button>
            <button class="cm-confirm" type="button" @click="confirm">
              {{ confirmLabel ?? "Confirm" }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.cm-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(16, 13, 40, 0.65);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
}

.cm-panel {
  position: relative;
  background: #fff;
  border-radius: 16px;
  width: 100%;
  max-width: 380px;
  padding: 32px 28px 26px;
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.22);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.cm-close {
  position: absolute;
  top: 14px;
  right: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: none;
  border-radius: 6px;
  background: none;
  color: #9ca3af;
  cursor: pointer;
  transition: color 0.15s, background 0.15s;
}

.cm-close:hover {
  color: #374151;
  background: #f3f4f6;
}

.cm-icon-wrap {
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: #fff4f4;
  color: #e74c3c;
  margin-bottom: 16px;
}

.cm-title {
  font-size: 1.05rem;
  font-weight: 700;
  color: #100d28;
  margin: 0 0 8px;
  line-height: 1.3;
}

.cm-message {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0 0 24px;
  line-height: 1.55;
}

.cm-actions {
  display: flex;
  gap: 10px;
  width: 100%;
}

.cm-cancel {
  flex: 1;
  height: 42px;
  border: 1.5px solid #e5e7eb;
  border-radius: 10px;
  background: #fff;
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
  cursor: pointer;
  transition: border-color 0.15s, background 0.15s;
}

.cm-cancel:hover {
  border-color: #9ca3af;
  background: #f9fafb;
}

.cm-confirm {
  flex: 1;
  height: 42px;
  border: none;
  border-radius: 10px;
  background: #dc2626;
  font-size: 0.875rem;
  font-weight: 700;
  color: #fff;
  cursor: pointer;
  transition: background 0.15s;
}

.cm-confirm:hover {
  background: #b91c1c;
}

/* Transition */
.cm-fade-enter-active,
.cm-fade-leave-active {
  transition: opacity 0.18s ease;
}

.cm-fade-enter-active .cm-panel,
.cm-fade-leave-active .cm-panel {
  transition: transform 0.18s ease, opacity 0.18s ease;
}

.cm-fade-enter-from,
.cm-fade-leave-to {
  opacity: 0;
}

.cm-fade-enter-from .cm-panel,
.cm-fade-leave-to .cm-panel {
  transform: scale(0.95) translateY(6px);
  opacity: 0;
}
</style>
