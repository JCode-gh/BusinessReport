import { computed } from 'vue';
import { useLanguage } from './useLanguage';

/** Paid generate CTA — credits required before generation. */
export function useGenerateCTA() {
  const { ui } = useLanguage();

  const generateLabel = computed(() => ui.value.heroPrimaryPaid);

  const creditCostLabel = computed(() => ui.value.creditCostPerReport);

  const generateButtonLabel = computed(
    () => `${generateLabel.value} · ${creditCostLabel.value}`,
  );

  return {
    generateLabel,
    creditCostLabel,
    generateButtonLabel,
  };
}
