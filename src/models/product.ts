import { ProductId } from './productId';
import { ProductImage } from './productImage';

export interface Product {
  productId: ProductId;

  displayName?: string;

  division?: string;

  image?: ProductImage;
}
