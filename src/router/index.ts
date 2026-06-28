import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ReportView from '../views/ReportView.vue';
import TermsView from '../views/TermsView.vue';
import ExampleView from '../views/ExampleView.vue';
import type { ReportLanguage } from '../composables/useLanguage';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/example',
      name: 'example',
      component: ExampleView,
    },
    {
      path: '/example/:lang(en|fr|de)',
      name: 'example-lang',
      component: ExampleView,
      props: (route) => ({ lang: route.params.lang as ReportLanguage }),
    },
    {
      path: '/reports',
      name: 'reports',
      component: () => import('../views/ReportsView.vue'),
      meta: { noindex: true },
    },
    {
      path: '/report/:id',
      name: 'report',
      component: ReportView,
      props: true,
      meta: { noindex: true },
    },
    {
      path: '/terms',
      name: 'terms',
      component: TermsView,
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { top: 0 };
  },
});

export default router;
