import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
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
      component: () => import('../views/ExampleView.vue'),
    },
    {
      path: '/example/:lang(en|fr|de)',
      name: 'example-lang',
      component: () => import('../views/ExampleView.vue'),
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
      component: () => import('../views/ReportView.vue'),
      props: true,
      meta: { noindex: true },
    },
    {
      path: '/terms',
      name: 'terms',
      component: () => import('../views/TermsView.vue'),
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
