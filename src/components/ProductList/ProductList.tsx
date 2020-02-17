import React, { FunctionComponent } from 'react';
import { RouteProps } from 'react-router-dom';
import ProductItem from '../ProductItem/ProductItem';
import './ProductList.scss';
import { Product } from '../../models/product';

interface IProductListProps extends RouteProps {
  products: Product[]
}

const ProductList: FunctionComponent<IProductListProps> = props => {
  return (
    <ul className="product-list">
      {
        props.products.map((product) => (
          <ProductItem product={product} key={product.productId} />
        ))
      }
    </ul>
  );
};

export default ProductList;
