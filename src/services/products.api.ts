import { isDevelopment } from "./environment";
import BaseApi from "./base.api";
import mockGetProduct from '../static/getProduct.json';
import mockCheckAvailability from '../static/checkAvailability.json';

const PRODUCTS_API_URL = 'https://www.adidas.com/api/products/'

const ProductsApi = (path?: string, options = {}) => {
  const url = `${PRODUCTS_API_URL}${path}`;

  console.log(`Calling ${url} with options`, options);

  return fetch(url, options)
    .then(response => response.json());
};

const MockProductsApi = (path?: string, options = {}) => {
  const url = `${PRODUCTS_API_URL}${path}`;

  console.log(`Calling mock ${url} with options`, options);

  return new Promise(
    resolve => {
      window.setTimeout(() => {
        if (path?.includes('availability')) {
          resolve(mockCheckAvailability);
        } else {
          resolve(mockGetProduct);
        }
      }, Math.random() * 2000 + 1000);
    }
  );
};

class ProductsService extends BaseApi {
  get(id: string) {
    return this.api(id);
  }

  checkAvailability(id: string) {
    return this.api(`${id}/availability`);
  }
}

export default new ProductsService(isDevelopment() ? ProductsApi : MockProductsApi);
