import axios from "axios";
import API_BASE_URL from "@/config";

const productsUrl = `${API_BASE_URL}/api/products`;
const categoriesUrl = `${API_BASE_URL}/api/productCategories`;
const colorsUrl = `${API_BASE_URL}/api/colors`;
const materialsUrl = `${API_BASE_URL}/api/materials`;
const seasonsUrl = `${API_BASE_URL}/api/seasons`;
const deliveriesUrl = `${API_BASE_URL}/api/deliveries`;
const paymentsUrl = `${API_BASE_URL}/api/payments`;
const basketUrl = `${API_BASE_URL}/api/baskets`;
const basketProductsUrl = `${API_BASE_URL}/api/baskets/products`;
const ordersUrl = `${API_BASE_URL}/api/orders`;

export default class AxiosApi {
  static getProducts(params = {}) {
    return axios({
      method: "get",
      url: productsUrl,
      params,
      timeout: 2000,
    });
  }

  static getProduct(id) {
    return axios({
      method: "get",
      url: `${API_BASE_URL}/api/products/${id}`,
      timeout: 2000,
    });
  }

  static getCategories() {
    return axios({
      method: "get",
      url: categoriesUrl,
      timeout: 2000,
    });
  }

  static getColors() {
    return axios({
      method: "get",
      url: colorsUrl,
      timeout: 2000,
    });
  }

  static getMaterials() {
    return axios({
      method: "get",
      url: materialsUrl,
      timeout: 2000,
    });
  }

  static getSeasons() {
    return axios({
      method: "get",
      url: seasonsUrl,
      timeout: 2000,
    });
  }

  static getDeliveries() {
    return axios({
      method: "get",
      url: deliveriesUrl,
      timeout: 2000,
    });
  }

  static getPayments(deliveryTypeId) {
    return axios({
      method: "get",
      url: paymentsUrl,
      params: { deliveryTypeId },
      timeout: 2000,
    });
  }

  static getBasket(userAccessKey = {}) {
    return axios({
      method: "get",
      url: basketUrl,
      params: { userAccessKey },
      timeout: 2000,
    });
  }

  static postBasket(userAccessKey = {}, body = {}) {
    return axios({
      method: "post",
      url: basketProductsUrl,
      params: { userAccessKey },
      data: body,
      timeout: 2000,
    });
  }

  static putBasket(userAccessKey = {}, body = {}) {
    return axios({
      method: "put",
      url: basketProductsUrl,
      params: { userAccessKey },
      data: body,
      timeout: 2000,
    });
  }

  static deleteBasket(userAccessKey = {}, body = {}) {
    return axios({
      method: "delete",
      url: basketProductsUrl,
      params: { userAccessKey },
      data: body,
      timeout: 2000,
    });
  }

  static postOrder(userAccessKey = {}, body = {}) {
    return axios({
      method: "post",
      url: ordersUrl,
      params: { userAccessKey },
      data: body,
      timeout: 2000,
    });
  }

  static getOrder(userAccessKey = {}, orderId = '') {
    return axios({
      method: "get",
      url: `${API_BASE_URL}/api/orders/${orderId}`,
      params: { userAccessKey },
      timeout: 2000,
    });
  }
}
