import { isDevelopment } from "./environment";
import BaseApi from "./base.api";
import errorService from './error.api';
import mockGetProduct from '../static/getProduct.json';
import mockCheckAvailability from '../static/checkAvailability.json';

const PRODUCTS_API_URL = 'https://www.adidas.com/api/products/'

const ProductsApi = (path?: string, options = {}) => {
  const url = `${PRODUCTS_API_URL}${path}`;

  return fetch(url, options)
    .then(response => response.json())
    .catch(error => {
      errorService.reportError(error);
    });
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
      }, Math.random() * 1000 + 1000);
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

export default new ProductsService(isDevelopment() ? MockProductsApi : ProductsApi);
