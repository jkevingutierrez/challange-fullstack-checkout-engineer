import React, { FunctionComponent, useState, useEffect } from 'react';
import CartContext from './CartContext';
import { Basket } from './models/basket';

const CartProvider: FunctionComponent = props => {
  const [cart, setCart] = useState({} as Basket);

  useEffect(() => {
    setCart({
      totalProductCount: 600,
    } as Basket);
  }, []);

  const value = { cart, setCart };

  return (
    <CartContext.Provider value={value}>
      { props.children }
    </CartContext.Provider>
  );
};

export default CartProvider;
