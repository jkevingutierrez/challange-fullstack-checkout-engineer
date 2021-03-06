import React, { FunctionComponent, useEffect, useState, useContext } from 'react';
import './ProductCartItem.scss';
import productsApi from '../../services/products.api';
import CartContext from '../../CartContext';
import basketsApi from '../../services/baskets.api';
import { ProductLineItem } from '../../models/productLineItem';
import LazyLoadImage from '../LazyLoadImage';

interface IProductCartItemProps {
  product: ProductLineItem;
}

const ProductCartItem: FunctionComponent<IProductCartItemProps> = props => {
  const { setCart } = useContext(CartContext);

  const [price, setPrice] = useState(0);

  useEffect(() => {
    let isSubscribed = true;

    if (props?.product?.pricing?.price) {
      setPrice(props?.product?.pricing?.price);
    } else {
      productsApi.get(props?.product?.productId)
        .then((response) => {
          if (isSubscribed) {
            setPrice(response?.pricing_information?.currentPrice);
          }
        });
      }

    return () => { isSubscribed = false };
  }, [props]);

  const handleRemoveFromCart = (event: React.FormEvent) => {
    event.preventDefault();

    basketsApi.removeProduct(basketsApi.getId(), props?.product?.productId).then((response) => {
      setCart({
        ...response
      });
    });
  }

  return (
    <>
      {
        props?.product?.productId && props?.product?.productName && (props?.product?.quantity || 0) > 0 && (props?.product?.availableStock || 0) > 0 && (
          <li className="product-cart-item">
            <div className="product-cart-item__container">
              <div className="image__container">
                <LazyLoadImage className="image" src={props?.product?.productImage} alt={props?.product?.productName} loading="lazy" />
              </div>
              <div className="text__container">
                <div>
                  <h3 title={props?.product?.productName} className="no-margin">{props?.product?.productName.replace(/\s/g, ' ')}</h3>
                  <h3 title={props?.product?.color} className="no-margin">{props?.product?.color.replace(/\s/g, ' ')}</h3>
                  <p>{price > 0 ? `$${price.toFixed(2)}` : 'Loading...'}</p>
                </div>
                <form onSubmit={handleRemoveFromCart}>
                  <div>
                    <label>
                      SIZE: {props?.product?.size}
                    </label>
                  </div>
                  <div>
                    <label aria-label="Quantity">
                      <input type="number" value={props?.product?.quantity} disabled />
                    </label>
                  </div>
                  <div>
                    <button type="submit" className="button" aria-label="Remove from cart">&#215;</button>
                  </div>
                </form>
              </div>
            </div>
          </li>
        )
      }
    </>
  );
};

export default ProductCartItem;
