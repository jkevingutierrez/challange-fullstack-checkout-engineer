import React, { FunctionComponent, useContext } from 'react';
import { RouteProps } from 'react-router-dom';
import './Cart.scss';
import ProductCartList from '../ProductCartList/ProductCartList';
import CartContext from '../../CartContext';

interface ICartProps extends RouteProps {
}

const Cart: FunctionComponent<ICartProps> = props => {
  const { cart } = useContext(CartContext);

  return (
    <div>
      <div>
        <ProductCartList products={[]} />
      </div>
    </div>
  );
};

export default Cart;
