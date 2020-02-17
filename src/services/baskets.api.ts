import { isDevelopment } from "./environment";
import BaseApi from "./base.api";
import errorService from './error.api';
import { BasketModification } from "../models/basketModification";
import { ProductToAdd } from "../models/productToAdd";
import { Basket } from "../models/basket";
import mockBasket from '../static/basket.json';
import mockEmptyBasket from '../static/emptyBasket.json';

const BASKETS_API_URL = 'https://www.adidas.com/api/checkout/baskets/'
const BASKET_KEY_NAME = 'basketId';

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
        if (path?.includes('items') && options?.method?.includes('POST')) {
          resolve(mockBasket);
        } else if (path?.includes('items') && options?.method?.includes('DELETE')) {
          resolve(mockEmptyBasket);
        } else if (path?.includes('items') && options?.method?.includes('PATCH')) {
          resolve({});
        } else if (options?.method?.includes('POST')) {
          resolve(mockBasket);
        } else if (options?.method?.includes('DELETE')) {
          resolve({});
        } else if (options?.method?.includes('PATCH')) {
          resolve({});
        } else {
          resolve(mockEmptyBasket)
        }
      }, Math.random() * 1000 + 1000);
    }
  );
};

class BasketsService extends BaseApi {
  getId() {
    const basketId = localStorage.getItem(BASKET_KEY_NAME);
    if (!basketId) {
      this.create();
    }

    return basketId || '';
  }

  get(id: string): Promise<Basket> {
    return this.api(id);
  }

  create(): Promise<Basket> {
    const options = {
      method: 'POST',
    };

    return this.api('', options)
      .then((response: Basket) => {
        localStorage.setItem(BASKET_KEY_NAME, response.basketId);
        return response;
      });
  }

  delete(id: string): Promise<string> {
    const options = {
      method: 'DELETE',
    };

    return this.api(id, options).then((response) => {
      localStorage.removeItem(BASKET_KEY_NAME);
      return response;
    });
  }

  update(id: string, parameters: BasketModification): Promise<Basket> {
    const options = {
      method: 'PATCH',
      body: JSON.stringify({
        product: parameters,
      }),
    };

    return this.api(id, options);
  }

  addProduct(id: string, parameters: ProductToAdd): Promise<Basket> {
    const options = {
      method: 'POST',
      body: JSON.stringify({
        product: parameters,
      }),
    };

    return this.api(`${id}/items/`, options);
  }

  removeProduct(id: string, productId: string): Promise<Basket> {
    const options = {
      method: 'DELETE',
    };

    return this.api(`${id}/items/${productId}`, options);
  }

  updateProduct(id: string, productId: string, parameters: ProductToAdd): Promise<Basket> {
    const options = {
      method: 'PATCH',
      body: JSON.stringify({
        product: parameters,
      }),
    };

    return this.api(`${id}/items/${productId}`, options);
  }
}

export default new BasketsService(isDevelopment() ? MockBasketsApi : BasketsApi);
