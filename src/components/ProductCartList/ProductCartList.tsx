import React, { FunctionComponent, useContext } from 'react';
import { RouteProps } from 'react-router-dom';
import ProductCartItem from '../ProductCartItem/ProductCartItem';
import './ProductCartList.scss';
import { ProductLineItem } from '../../models/productLineItem';
import CartContext from '../../CartContext';

interface IProductCartListProps extends RouteProps {
  products?: ProductLineItem[]
}

const ProductCartList: FunctionComponent<IProductCartListProps> = props => {
  const { cart } = useContext(CartContext);

  return (
    <div className="product-cart-list__container">
      <h4>TOTAL: ({props?.products?.length || 0} Products) ${cart?.currency}{cart?.pricing?.baseTotal || 0}</h4>
      <ul className="product-cart-list">
        {
          props?.products?.map((product) => (
            <ProductCartItem product={product} key={product.productId} />
          ))
        }
      </ul>
    </div>
  );
};

export default ProductCartList;
