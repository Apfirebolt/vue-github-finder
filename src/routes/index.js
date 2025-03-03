import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import NotFound from '../views/NotFound.vue'
import Cookie from 'js-cookie'

const authGuard = (to, from, next) => {
    const isAuthenticated = Cookie.get('user') ? true : false
    if (to.name !== 'Login' && to.name !== 'Register' && !isAuthenticated) {
        next({ name: 'Login' })
    } else {
        next()
    }
}

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('../views/Dashboard.vue')
    },
    {
        path: '/:username',
        name: 'UserDetail',
        component: () => import('../views/UserDetail.vue'),
    },
    {
        path: '/:catchAll(.*)',
        name: 'NotFound',
        component: NotFound
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach(authGuard)

export default router