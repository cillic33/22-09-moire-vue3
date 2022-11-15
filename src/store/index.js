import Vue from "vue";
import Vuex from "vuex";
import moduleProducts from './moduleProducts';
import moduleCategories from "./moduleCategories";
import moduleColors from "./moduleColors";
import moduleMaterials from "./moduleMaterials";
import moduleSeasons from "./moduleSeasons";
import moduleDeliveries from "./moduleDeliveries";
import modulePayments from "./modulePayments";
import moduleProduct from "./moduleProduct";
import moduleBasket from "./moduleBasket";
import moduleUser from "./moduleUser";
import moduleOrder from "./moduleOrder";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    moduleProducts,
    moduleCategories,
    moduleColors,
    moduleMaterials,
    moduleSeasons,
    moduleDeliveries,
    modulePayments,
    moduleProduct,
    moduleBasket,
    moduleUser,
    moduleOrder,
  },
});

export default store;
