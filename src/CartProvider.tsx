import React, { FunctionComponent, useState, useEffect } from 'react';
import CartContext from './CartContext';
import { Basket } from './models/basket';
import basketsApi from './services/baskets.api';

const CartProvider: FunctionComponent = props => {
  const [cart, setCart] = useState({} as Basket);

  useEffect(() => {
    let isSubscribed = true;
    const basketId = basketsApi.getId();

    if (basketId) {
      basketsApi.get(basketId).then((response: Basket) => {
        if (isSubscribed) {
          setCart({
            ...response,
          } as Basket);
        }
      });
    }

    return () => { isSubscribed = false };
  }, [])

  const value = { cart, setCart };

  return (
    <CartContext.Provider value={value}>
      { props.children }
    </CartContext.Provider>
  );
};

export default CartProvider;
