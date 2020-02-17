import React, { FunctionComponent } from 'react';
import { RouteProps } from 'react-router-dom';
import ProductCartItem from '../ProductCartItem/ProductCartItem';
import './ProductCartList.scss';
import { Product } from '../../models/product';

interface IProductCartListProps extends RouteProps {
  products: Product[]
}

const ProductCartList: FunctionComponent<IProductCartListProps> = props => {
  return (
    <ul className="product-cart-list">
      {
        props.products.map((product) => (
          <ProductCartItem product={product} key={product.productId} />
        ))
      }
    </ul>
  );
};

export default ProductCartList;
