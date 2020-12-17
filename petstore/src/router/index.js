import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
import Main from '../components/Main.vue';
import Form from '../components/Form.vue';
import Product from '../components/Product.vue';
import EditProduct from "../components/EditProduct";

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'iMain',
      component: Main
    },
    {
      path: '/form',
      name: 'Form',
      component: Form,
      props: true,
    },
    {
      path: '/product/:id',
      name: 'Id',
      component: Product,
      props: true,
      children: [
        {
          path: 'edit',
          name: 'Edit',
          component: EditProduct,
          props: true,
        }
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
