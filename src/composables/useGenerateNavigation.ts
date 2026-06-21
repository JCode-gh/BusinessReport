import type { LocationQuery, RouteLocationNormalizedLoaded, Router } from 'vue-router';

export const GENERATE_QUERY = 'generate';

export function wantsGenerateLaunch(query: LocationQuery): boolean {
  return query[GENERATE_QUERY] === '1';
}

export function navigateToGenerate(router: Router) {
  void router.push({ path: '/', query: { [GENERATE_QUERY]: '1' }, hash: '#brief' });
}

export function clearGenerateLaunchQuery(router: Router, route: RouteLocationNormalizedLoaded) {
  if (!wantsGenerateLaunch(route.query)) return;
  const query = { ...route.query };
  delete query[GENERATE_QUERY];
  void router.replace({ query, hash: route.hash || '#brief' });
}
