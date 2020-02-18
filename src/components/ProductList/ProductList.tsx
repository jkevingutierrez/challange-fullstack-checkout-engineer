import React, { FunctionComponent } from 'react';
import ProductItem from '../ProductItem/ProductItem';
import './ProductList.scss';
import { Product } from '../../models/product';

interface IProductListProps {
  products: Product[]
}

const ProductList: FunctionComponent<IProductListProps> = props => {
  return (
    <div className="product-list__container">
      <h4>{props?.products?.length} Products</h4>
      <ul className="product-list">
        {
          props?.products?.map((product) => (
            <ProductItem product={product} key={product.productId} />
          ))
        }
      </ul>
    </div>
  );
};

export default ProductList;
