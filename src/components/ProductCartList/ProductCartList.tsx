import React, { useContext } from 'react';
import ProductCartItem from '../ProductCartItem/ProductCartItem';
import './ProductCartList.scss';
import { ProductLineItem } from '../../models/productLineItem';
import CartContext from '../../CartContext';

interface IProductCartListProps {
  products?: ProductLineItem[]
}

function ProductCartList() {
  const { cart } = useContext(CartContext);
  const products = cart?.shipmentList?.[0]?.productLineItemList;

  return (
    <div className="product-cart-list__container">
      <h4>TOTAL: ({products?.length || 0} Products) ${cart?.currency}{cart?.pricing?.total || 0}</h4>
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
