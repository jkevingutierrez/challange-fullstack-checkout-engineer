import { isDevelopment } from "./environment";
import BaseApi from "./base.api";
import errorService from './error.api';
import { BasketModification } from "../models/basketModification";
import { ProductToAdd } from "../models/productToAdd";
import { Basket } from "../models/basket";
import mockEmptyBasket from '../static/emptyBasket.json';
import productsApi from "./products.api";
import { ProductLineItem } from "../models/productLineItem";
import { Shipment } from "../models/shipment";

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
        const basketString = localStorage.getItem(BASKET_KEY_NAME);
        const storedBasket = JSON.parse(basketString || '{}');

        if (path?.includes('items') && options?.method?.includes('POST')) {
          storedBasket.shipmentList = storedBasket?.shipmentList || [{
            shipmentId: 'me',
            shipmentType: 'inline',
            productLineItemList: []
          }];

          storedBasket.shipmentList[0].productLineItemList = storedBasket?.shipmentList[0]?.productLineItemList || [];

          const body = JSON.parse(options?.body || '[]');
          const { products } = body;

          products?.forEach(async (productToAdd: any) => {
            const sku = productToAdd?.productId;
            const productId = sku.split('_')[0];

            const product = await productsApi.get(productId);
            const productTotal = product.pricing_information.currentPrice * productToAdd.quantity;

            const availabilityProduct = await productsApi.checkAvailability(productId);

            const { availability, size } = availabilityProduct?.variation_list?.find((variation: any) => variation.sku === sku);

            const productLineItem = {
              ...productToAdd,
              productName: product?.name,
              "canonicalProductName": "d-rose-x-bleacher-report---d-rose-park-fleece-hoodie",
              "productImage": product?.view_list?.[0]?.image_url,
              "pricing": {
                "baseUnitPrice": product?.pricing_information?.currentPrice,
                "unitPrice": product?.pricing_information?.currentPrice,
                "basePrice": product?.pricing_information?.currentPrice,
                "price": product?.pricing_information?.currentPrice,
                "priceAfterAllDiscounts": product?.pricing_information?.currentPrice,
                "unitPriceWithoutTax": product?.pricing_information?.currentPrice
              },
              "gender": product?.attribute_list?.gender,
              "color": product?.attribute_list?.color,
              "size": size,
              "allowedActions": {
                "delete": true,
                "edit": true,
                "moveToWishlist": true
              },
              "maxQuantityAllowed": availability,
              "isBonusProduct": false,
              "productType": product?.product_type?.toUpperCase(),
              "availableStock": availability,
              "lastAdded": true,
              "isFlashProduct": false
            } as ProductLineItem;

            storedBasket?.shipmentList[0]?.productLineItemList?.push(productLineItem);
            storedBasket.pricing.total = storedBasket.pricing.total + productTotal;
            localStorage.setItem(BASKET_KEY_NAME, JSON.stringify(storedBasket));
          });

          resolve(storedBasket);
        } else if (path?.includes('items') && options?.method?.includes('DELETE')) {
          const pathArray = path.split('/');
          const productId = pathArray[pathArray.length - 1];

          storedBasket.shipmentList.forEach((shipmentElement: Shipment) => {
            shipmentElement.productLineItemList.forEach((productLineItem: ProductLineItem, index: number, ) => {
              if (productLineItem.productId === productId) {
                const productTotal = productLineItem.pricing.price * productLineItem.quantity;
                const basketTotal = storedBasket.pricing.total - productTotal;
                shipmentElement.productLineItemList.splice(index, 1)

                storedBasket.pricing.total = Math.max(basketTotal, 0);
              }
            });
          });

          localStorage.setItem(BASKET_KEY_NAME, JSON.stringify(storedBasket));
          resolve(storedBasket);
        } else if (path?.includes('items') && options?.method?.includes('PATCH')) {
          // TODO: IMPLEMENT

          resolve(storedBasket);
        } else if (options?.method?.includes('POST')) {
          localStorage.setItem(BASKET_KEY_NAME, JSON.stringify(mockEmptyBasket));
          resolve(mockEmptyBasket);
        } else if (options?.method?.includes('DELETE')) {
          localStorage.removeItem(BASKET_KEY_NAME);
          resolve({});
        } else if (options?.method?.includes('PATCH')) {
          // TODO: IMPLEMENT

          resolve(storedBasket);
        } else {
          if (!storedBasket?.basketId) {
            resolve(mockEmptyBasket);
          }
          resolve(storedBasket);
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
