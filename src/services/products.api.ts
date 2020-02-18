import { isDevelopment } from "./environment";
import BaseApi from "./base.api";
import errorService from './error.api';
import mockProducts from '../static/products.json';
import mockAvailabilities from '../static/availabilities.json';

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
          const productId = path.split('/')?.[0];
          const productAvailability = mockAvailabilities.find(product => product.id === productId);

          resolve(productAvailability);
        } else {
          const productId = path;
          const product = mockProducts.find(product => product.id === productId);
          resolve(product);
        }
      }, Math.random() * 1000 + 1000);
    }
  );
};

class ProductsService extends BaseApi {
  get(productId: string) {
    return this.api(productId);
  }

  checkAvailability(productId: string) {
    return this.api(`${productId}/availability`);
  }
}

export default new ProductsService(isDevelopment() ? MockProductsApi : ProductsApi);
