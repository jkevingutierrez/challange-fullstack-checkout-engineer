import React, { FunctionComponent } from 'react';
import IPageProps from '../interfaces/PageProps';
import Cart from '../components/Cart/Cart';

const ShoppingCart: FunctionComponent<IPageProps> = props => {
  return (
    <div className="shoppingCart">
      <h1>Your bag</h1>
      <Cart />
    </div>
  );
};

export default ShoppingCart;
