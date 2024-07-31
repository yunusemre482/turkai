import { createRouter, createWebHistory } from 'vue-router';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      meta: {
        authRequired: 'false',
      },
    },
    {
      path: '/auth/login',
      name: 'login',
      component: () => import('../views/Authentication/SigninView.vue'),
      meta: {
        authRequired: 'false',
      },
    },
    {
      path: '/auth/register',
      name: 'register',
      component: () => import('../views/Authentication/SignupView.vue'),
      meta: {
        authRequired: 'false',
      },
    },
    {
      path: '/employee',
      name: 'employee',
      component: () => import('../views/EmployeeView.vue'),
      meta: {
        authRequired: 'true',
      },
    },
    {
      path: '/companies',
      name: 'companies',
      component: () => import('../views/CompanyView.vue'),
      meta: {
        authRequired: 'true',
      },
    },
    {
      path: '/unauthorized',
      name: 'unauthorized',
      component: () => import('../views/UnauthorizedView.vue'),
      meta: {
        authRequired: 'false',
      },
    },
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: () => import('../views/NotFoundView.vue'),
      meta: {
        authRequired: 'false',
      },

    }
  ],
});


router.beforeEach((to, from, next) => {
  //check page is protected or not
  if (to.meta.authRequired === 'true') {
    //access check
    if (
      localStorage.getItem('access_token') &&
      localStorage.getItem('access_token') !== 'undefined'
    ) {
      return next()
    } else {
      router.push({
        name: 'unauthorized'
      })
    }
  } else {
    next()
  }
});

export default router;
