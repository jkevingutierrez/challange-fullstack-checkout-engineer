import React, { useContext } from 'react';
import './Cart.scss';
import ProductCartList from '../ProductCartList/ProductCartList';
import CheckoutButton from '../CheckoutButton/CheckoutButton';
import CartContext from '../../CartContext';
import basketsApi from '../../services/baskets.api';
import { Basket } from '../../models/basket';

function Cart() {
  const { cart, setCart } = useContext(CartContext);

  const buttonClickHandler = () => {
    const basketId = basketsApi.getId();

    if (basketId) {
      basketsApi.delete(basketId).then(() => {
        setCart({} as Basket);
      });
    }
  }

  const products = cart?.shipmentList?.[0]?.productLineItemList;

  return (
    <div className="cart__container">
      <h4>TOTAL: ({products?.length || 0} item{products?.length !== 1 ? 's' : ''}) <span>${cart?.currency}{cart?.pricing?.total || 0}</span></h4>
      <div className="cart">
        <div className="cart__left">
          <ProductCartList />
          <CheckoutButton buttonClickHandler={buttonClickHandler} />
        </div>
        <div className="cart__right">
          <CheckoutButton buttonClickHandler={buttonClickHandler} />
        </div>
      </div>
    </div>
  );
};

export default Cart;
