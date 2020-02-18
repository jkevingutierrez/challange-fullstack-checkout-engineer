import { isDevelopment } from "./environment";
import BaseApi from "./base.api";
import errorService from './error.api';
import mockTaxonomyJson from '../static/searchTaxonomy.json';
import mockProductJson from '../static/searchProduct.json';
import { Product } from "../models/product";

const SEARCH_API_URL = 'https://www.adidas.com/api/search/'

const SearchApi = (path?: string, options = {}) => {
  const url = `${SEARCH_API_URL}${path}`;

  return fetch(url, options)
    .then(res => res.json())
    .catch(error => {
      errorService.reportError(error);
    });
};

const MockSearchApi = (path?: string, options = {}) => {
  const url = `${SEARCH_API_URL}${path}`;

  console.log(`Calling mock ${url} with options`, options);

  return new Promise(
    resolve => {
      window.setTimeout(() => {
        if (path?.includes('tf')) {
          resolve(mockTaxonomyJson);
        } else if (path?.includes('product')) {
          resolve(mockProductJson);
        }
      }, Math.random() * 1000 + 1000);
    }
  );
};

class SearchService extends BaseApi {
  getProducts(): Promise<{ itemList: { items: Product[] } }> {
    const queryParams = '?sitePath=us&query=men-shoes-new_arrivals'
    const path = `tf/taxonomy${queryParams}`;
    return this.api(path);
  }

  getProduct(productId: string): Promise<{ price: number }> {
    const queryParams = '?sitePath=us'
    const path = `product/${productId}${queryParams}`;
    return this.api(path);
  }
}

export default new SearchService(isDevelopment() ? MockSearchApi : SearchApi);
