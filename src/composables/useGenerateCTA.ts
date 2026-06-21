import { computed } from 'vue';
import { useLanguage } from './useLanguage';
import { useAuth } from '../useAuth';
import { hasClaimedFreeCredit } from '../firebase';
import { useReportManagement } from './useReportManagement';

/** When to show "free report" marketing vs paid credit messaging. */
export function useGenerateCTA() {
  const { ui } = useLanguage();
  const { user, credits } = useAuth();
  const { savedReports } = useReportManagement();

  const showFreeOffer = computed(() => {
    if (!user.value) return true;
    if (credits.value > 0) return false;
    if (hasClaimedFreeCredit(user.value.uid)) return false;
    return savedReports.value.length === 0;
  });

  const generateLabel = computed(() =>
    showFreeOffer.value ? ui.value.heroPrimaryFree : ui.value.heroPrimaryPaid,
  );

  const creditCostLabel = computed(() => ui.value.creditCostPerReport);

  const generateButtonLabel = computed(() => {
    if (showFreeOffer.value) return generateLabel.value;
    return `${generateLabel.value} · ${creditCostLabel.value}`;
  });

  return {
    showFreeOffer,
    generateLabel,
    creditCostLabel,
    generateButtonLabel,
  };
}
