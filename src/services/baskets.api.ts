import { isDevelopment } from "./environment";
import BaseApi from "./base.api";
import errorService from './error.api';
import { BasketModification } from "../models/basketModification";
import { ProductToAdd } from "../models/productToAdd";
import { Basket } from "../models/basket";
import mockBasket from '../static/basket.json';
import mockEmptyBasket from '../static/emptyBasket.json';

const BASKETS_API_URL = 'https://www.adidas.com/api/checkout/baskets/'
const BASKET_ID_KEY_NAME = 'basketId';
const BASKET_KEY_NAME = 'basket';

const BasketsApi = (path?: string, options = {} as any) => {
  const url = `${BASKETS_API_URL}${path}`;

  return fetch(url, options)
    .then(response => response.json())
    .catch(error => {
      errorService.reportError(error);
    });
};

const MockBasketsApi = (path?: string, options = {} as any) => {
  const url = `${BASKETS_API_URL}${path}`;

  console.log(`Calling mock ${url} with options`, options)

  return new Promise(
    resolve => {
      window.setTimeout(() => {
        const basket = localStorage.getItem(BASKET_KEY_NAME);

        if (path?.includes('items') && options?.method?.includes('POST')) {
          resolve(mockBasket);
        } else if (path?.includes('items') && options?.method?.includes('DELETE')) {
          resolve(mockEmptyBasket);
        } else if (path?.includes('items') && options?.method?.includes('PATCH')) {
          resolve(mockBasket);
        } else if (options?.method?.includes('POST')) {
          resolve(mockBasket);
        } else if (options?.method?.includes('DELETE')) {
          localStorage.removeItem(BASKET_KEY_NAME);
          resolve({});
        } else if (options?.method?.includes('PATCH')) {
          resolve(mockBasket);
        } else {
          if (!basket) {
            localStorage.setItem(BASKET_KEY_NAME, JSON.stringify(mockEmptyBasket));
            resolve(mockEmptyBasket);
          }

          resolve(JSON.parse(basket || ''));
        }
      }, Math.random() * 1000 + 1000);
    }
  );
};

class BasketsService extends BaseApi {
  getId() {
    const basketId = localStorage.getItem(BASKET_ID_KEY_NAME);

    if (!basketId) {
      this.create();
    }

    return basketId || '';
  }

  get(basketId: string): Promise<Basket> {
    return this.api(basketId);
  }

  async create(): Promise<Basket> {
    const options = {
      method: 'POST',
    };

    const response = await this.api('', options);
    localStorage.setItem(BASKET_ID_KEY_NAME, response.basketId);

    return response;
  }

  async delete(basketId: string): Promise<string> {
    const options = {
      method: 'DELETE',
    };

    const response = await this.api(basketId, options);
    localStorage.removeItem(BASKET_ID_KEY_NAME);
    return response;
  }

  update(basketId: string, parameters: BasketModification): Promise<Basket> {
    const options = {
      method: 'PATCH',
      body: JSON.stringify({
        product: parameters,
      }),
    };

    return this.api(basketId, options);
  }

  addProduct(basketId: string, product: ProductToAdd): Promise<Basket> {
    const options = {
      method: 'POST',
      body: JSON.stringify({
        products: [product],
      }),
    };

    return this.api(`${basketId}/items/`, options);
  }

  removeProduct(basketId: string, productId: string): Promise<Basket> {
    const options = {
      method: 'DELETE',
    };

    return this.api(`${basketId}/items/${productId}`, options);
  }

  updateProduct(basketId: string, productId: string, product: ProductToAdd): Promise<Basket> {
    const options = {
      method: 'PATCH',
      body: JSON.stringify({
        product: product,
      }),
    };

    return this.api(`${basketId}/items/${productId}`, options);
  }
}

export default new BasketsService(isDevelopment() ? MockBasketsApi : BasketsApi);
