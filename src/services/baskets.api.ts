import { isDevelopment } from "./environment";
import BaseApi from "./base.api";
import { BasketModification } from "../models/basketModification";
import { ProductToAdd } from "../models/productToAdd";
import { Basket } from "../models/basket";
import { ErrorResponse } from "../models/errorResponse";

const BASKETS_API_URL = 'https://www.adidas.com/api/checkout/baskets/'

const BasketsApi = (path?: string, options = {} as any) => {
  const url = `${BASKETS_API_URL}${path}`;

  console.log(`Calling ${url} with options`, options);

  return fetch(url, options)
    .then(response => response.json());
};

const MockBasketsApi = (path?: string, options = {} as any) => {
  const url = `${BASKETS_API_URL}${path}`;

  console.log(`Calling mock ${url} with options`, options)

  return new Promise(
    resolve => {
      window.setTimeout(() => {
        if (path?.includes('items') && options?.method?.includes('POST')) {
          resolve({});
        } else if (path?.includes('items') && options?.method?.includes('DELETE')) {
          resolve({});
        } else if (path?.includes('items') && options?.method?.includes('PATCH')) {
          resolve({});
        } else if (options?.method?.includes('POST')) {
          resolve({});
        } else if (options?.method?.includes('DELETE')) {
          resolve({});
        } else if (options?.method?.includes('PATCH')) {
          resolve({});
        } else {
          resolve({})
        }
      }, Math.random() * 2000 + 1000);
    }
  );
};

class BasketsService extends BaseApi {
  getId() {
    return 'f18316486d6c7bcbdb790c9478';
  }

  get(id: string): Promise<Basket | ErrorResponse> {
    return this.api(id);
  }

  create(): Promise<Basket | ErrorResponse> {
    const options = {
      method: 'POST',
    };

    return this.api('', options);
  }

  delete(id: string): Promise<string | ErrorResponse> {
    const options = {
      method: 'DELETE',
    };

    return this.api(id, options);
  }

  update(id: string, parameters: BasketModification): Promise<Basket | ErrorResponse> {
    const options = {
      method: 'PATCH',
      body: JSON.stringify({
        product: parameters,
      }),
    };

    return this.api(id, options);
  }

  addProduct(id: string, parameters: ProductToAdd): Promise<ProductToAdd | ErrorResponse> {
    const options = {
      method: 'POST',
      body: JSON.stringify({
        product: parameters,
      }),
    };

    return this.api(`${id}/items/`, options);
  }

  removeProduct(id: string, productId: string): Promise<Basket | ErrorResponse> {
    const options = {
      method: 'POST',
    };

    return this.api(`${id}/items/${productId}`, options);
  }

  updateProduct(id: string, productId: string, parameters: ProductToAdd): Promise<Basket | ErrorResponse> {
    const options = {
      method: 'POST',
      body: JSON.stringify({
        product: parameters,
      }),
    };

    return this.api(`${id}/items/${productId}`, options);
  }
}

export default new BasketsService(isDevelopment() ? BasketsApi : MockBasketsApi);
