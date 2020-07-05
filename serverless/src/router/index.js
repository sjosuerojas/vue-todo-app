import Vue from "vue";
import VueRouter from "vue-router";

// Public Pages
import ToDo from '@/views/ToDo.vue';

// Components
import Page404 from '@/components/Page404.vue';

Vue.use(VueRouter);

export const router = new VueRouter({
  mode: 'hash',
  scrollBehavior: () => ({ y: 0 }),
  routes: configRoutes(),
});

function configRoutes() {
  return [
    {
      path: '/',
      name: 'ToDo',
      component: ToDo,
      meta: {
        title: `ToDo-App | Home`,
      },
    }, 
    {
      path: '*',
      component: Page404,
      meta: {
        title: `ToDo-App | 404 Pagina no encontrada`,
      },
    },
  ];
}

router.beforeEach((to, from, next) => {

  const nearestWithTitle = to.matched
    .slice()
    .reverse()
    .find(r => r.meta && r.meta.title);

  // If a route with a title was found, set the document (page) title to that value.
  if (nearestWithTitle) document.title = nearestWithTitle.meta.title;

  return next();
});