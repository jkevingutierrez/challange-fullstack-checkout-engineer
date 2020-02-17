import React, { useContext } from 'react';
import './Cart.scss';
import ProductCartList from '../ProductCartList/ProductCartList';
import CartContext from '../../CartContext';

function Cart() {
  const { cart } = useContext(CartContext);

  return (
    <div>
      <div>
        <ProductCartList products={cart?.shipmentList?.[0]?.productLineItemList} />
      </div>
    </div>
  );
};

export default Cart;
