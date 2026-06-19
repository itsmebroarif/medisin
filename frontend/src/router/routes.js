const routes = [
  {
    path: '/login',
    component: () => import('@/pages/LoginPage.vue')
  },
  {
    path: '/',
    component: () => import('@/layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('@/pages/DashboardPage.vue') },
      {
        path: 'patients/create',
        component: () => import('@/pages/PatientCreatePage.vue')
      },
      { path: 'visits', component: () => import('@/pages/VisitsPage.vue') },
      {
        path: 'visits/create',
        component: () => import('@/pages/VisitCreatePage.vue')
      }
    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('@/pages/ErrorNotFound.vue')
  }
]

export default routes
