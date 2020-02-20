import React, { useContext } from 'react';
import ProductCartItem from '../ProductCartItem/ProductCartItem';
import './ProductCartList.scss';
import CartContext from '../../CartContext';

function ProductCartList() {
  const { cart } = useContext(CartContext);
  const products = cart?.shipmentList?.[0]?.productLineItemList;

  return (
    <div className="product-cart-list__container">
      <ul className="product-cart-list">
        {
          products?.map((product, index) => (
            <ProductCartItem product={product} key={`${product?.productId}-${index}`} />
          ))
        }
      </ul>
    </div>
  );
};

export default ProductCartList;
