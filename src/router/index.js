import Vue from "vue";
import VueRouter from "vue-router";
// import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [{
        path: "/",
        redirect: "/login",
    },
    {
        path: "/login",

        name: "login",
        // route level code-splitting
        // this generates a separate chunk (login.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "login" */ "../views/login.vue"),
    },
    {
        path: "/todo",
        name: "todo",
        // route level code-splitting
        // this generates a separate chunk (login.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "login" */ "../views/todo.vue"),
    },
];

const router = new VueRouter({
    routes,
});

export default router;