import React, { FunctionComponent, useEffect, useState, useContext } from 'react';
import { RouteProps } from 'react-router-dom';
import './ProductCartItem.scss';
import productsApi from '../../services/products.api';
import CartContext from '../../CartContext';
import basketsApi from '../../services/baskets.api';
import { ProductLineItem } from '../../models/productLineItem';
import { Shipment } from '../../models/shipment';

interface IProductCartItemProps extends RouteProps {
  product: ProductLineItem
}

const ProductCartItem: FunctionComponent<IProductCartItemProps> = props => {
  const { cart, setCart } = useContext(CartContext);

  const [price, setPrice] = useState(0);

  useEffect(() => {
    productsApi.get(props?.product?.productId)
      .then((response) => {
        setPrice(response?.pricing_information?.currentPrice);
      });
  }, [props]);

  const handleRemoveFromCart = (event: React.FormEvent) => {
    event.preventDefault();

    basketsApi.removeProduct(basketsApi.getId(), props?.product?.productId).then((response) => {
      const products = cart?.shipmentList?.[0]?.productLineItemList?.filter(product => {
        return product?.productId !== props?.product?.productId;
      });

      setCart({
        ...cart,
        shipmentList: [
          { productLineItemList: products }
        ] as Shipment[],
      });
    });
  }

  return (
    <>
      {
        props?.product?.productId && props?.product?.productName && (props?.product?.quantity || 0) > 0 && (props?.product?.availableStock || 0) > 0 && (
          <li className="product-cart-item">
            <div className="product-item__container">
              <div className="image__container">
                <img className="image" src={props?.product?.productImage} alt={props?.product?.productName} />
              </div>
              <div>
                <h3 title={props?.product?.productName}>{props?.product?.productName.replace(/\s/g, ' ')}</h3>
                <p>{price > 0 ? `Price: $${price}` : 'Loading...'}</p>
              </div>
              <form onSubmit={handleRemoveFromCart}>
                <div>
                  <label>
                    Choose a size:
                    <select disabled>
                      <option value={props?.product?.size}>
                        {props?.product?.size}
                      </option>
                    </select>
                  </label>
                </div>
                <div>
                  <label>
                    Quantity:
                    <input type="number" value={props?.product?.quantity} disabled />
                  </label>
                </div>
                <div>
                  <button type="submit" className="button">Remove from cart</button>
                </div>
              </form>
            </div>
          </li>
        )
      }
    </>
  );
};

export default ProductCartItem;
