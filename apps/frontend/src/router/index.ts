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
      path: '/employee/:id',
      name: 'employee-detail',
      component: () => import('../views/EmployeeDetailView.vue'),
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
      path: '/companies/:id',
      name: 'company-detail',
      component: () => import('../views/CompanyDetailView.vue'),
      meta: {
        authRequired: 'true',
      },
    }
  ],
});


router.beforeEach((to, from, next) => {
  //check page is protected or not
  if (to.meta.authRequired === 'true') {


    //access check
    if (
      //if user is admin or super admin
      to.meta.role === 'admin' && localStorage.getItem('role') === 'admin'
      //if user is logged in
    ) {
      return next()
    } else {
      router.push({
        name: 'Unauthorized'
      })
    }
  } else {
    return next()
  }
});

export default router;
