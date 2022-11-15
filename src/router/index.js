import Vue from "vue";
import VueRouter from "vue-router";
import MainPage from "@/pages/MainPage.vue";
import ProductPage from "@/pages/ProductPage.vue";
import NotFoundPage from "@/pages/NotFoundPage.vue";
import BasketPage from "@/pages/BasketPage.vue";
import OrderPage from "@/pages/OrderPage.vue";
import OrderSuccessPage from "@/pages/OrderSuccessPage.vue";

Vue.use(VueRouter);

const routes = [
  { name: "main", component: MainPage, path: "/" },
  { name: "product", component: ProductPage, path: "/product/:id" },
  { name: "cart", component: BasketPage, path: "/cart" },
  { name: "order", component: OrderPage, path: "/order" },
  { name: "orderSuccess", component: OrderSuccessPage, path: "/order-success/:id" },
  { name: "404", component: NotFoundPage, path: "*" },
];

const router = new VueRouter({
  routes,
});

export default router;
