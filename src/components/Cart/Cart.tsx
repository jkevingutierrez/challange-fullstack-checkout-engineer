import React, { FunctionComponent } from 'react';
import { RouteProps } from 'react-router-dom';
import './Cart.scss';
import ProductCartList from '../ProductCartList/ProductCartList';

interface ICartProps extends RouteProps {
}

const Cart: FunctionComponent = props => {

  return (
    <div>
      <div>
        <ProductCartList products={[{ productId: '' }]} />
      </div>
    </div>
  );
};

export default Cart;
