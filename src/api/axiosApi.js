import axios from "axios";
import API_BASE_URL from "@/config";

const productsUrl = `${API_BASE_URL}/api/products`;
const categoriesUrl = `${API_BASE_URL}/api/productCategories`;
const colorsUrl = `${API_BASE_URL}/api/colors`;
const materialsUrl = `${API_BASE_URL}/api/materials`;
const seasonsUrl = `${API_BASE_URL}/api/seasons`;
const deliveriesUrl = `${API_BASE_URL}/api/deliveries`;

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
    });
  }

  static getColors() {
    return axios({
      method: "get",
      url: colorsUrl,
    });
  }

  static getMaterials() {
    return axios({
      method: "get",
      url: materialsUrl,
    });
  }

  static getSeasons() {
    return axios({
      method: "get",
      url: seasonsUrl,
    });
  }

  static getDeliveries() {
    return axios({
      method: "get",
      url: deliveriesUrl,
    });
  }
}
