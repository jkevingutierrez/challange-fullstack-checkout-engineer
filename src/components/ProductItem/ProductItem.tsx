import React, { FunctionComponent, useEffect, useState, useContext, useRef } from 'react';
import './ProductItem.scss';
import { Product } from '../../models/product';
import productsApi from '../../services/products.api';
import CartContext from '../../CartContext';
import basketsApi from '../../services/baskets.api';
import { Basket } from '../../models/basket';
import LazyLoadImage from '../LazyLoadImage';

interface IProductItemProps {
  product: Product
}

const ProductItem: FunctionComponent<IProductItemProps> = props => {
  const element = useRef({} as any );

  const { setCart } = useContext(CartContext);

  const [price, setPrice] = useState(0);
  const [availability, setAvailability] = useState({
    availability_status: '',
    variation_list: [] as any[],
    selectedElement: {
      sku: '',
      quantity: 0,
      maxQuantity: 0,
    },
  });

  useEffect(() => {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          productsApi.get(props?.product?.productId)
            .then((response) => {
              setPrice(response?.pricing_information?.currentPrice);
            });

          productsApi.checkAvailability(props?.product?.productId)
            .then((response) => {
              setAvailability({
                availability_status: response?.availability_status,
                variation_list: response?.variation_list,
                selectedElement: {
                  sku: '',
                  quantity: 0,
                  maxQuantity: 0,
                },
              });
            });

          observer.disconnect();
        }
      });
    });

    observer.observe(element.current as Element);
  }, [props]);

  const handleChangeSize = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const index = Number(event?.target?.value);
    const element = availability?.variation_list[index];

    setAvailability((prevState) => ({
      ...prevState,
      selectedElement: {
        ...prevState?.selectedElement,
        sku: element?.sku,
        maxQuantity: element?.availability,
      },
    }));
  };

  const handleChangeQuantity = (event: React.ChangeEvent<HTMLInputElement>) => {
    const quantity = Number(event?.target?.value);

    setAvailability((prevState) => ({
      ...prevState,
      selectedElement: {
        ...prevState?.selectedElement,
        quantity: quantity,
      },
    }));
  };

  const handleAddTocart = (event: React.FormEvent) => {
    event.preventDefault();

    if (validateFields()) {
      const { selectedElement } = availability;

      const basketId = basketsApi.getId();

      basketsApi.addProduct(basketId, {
        productId: selectedElement.sku,
        quantity: selectedElement.quantity,
      }).then((response: Basket) => {
        setCart({
          ...response,
        });
      });
    }
  }

  const validateFields = () => {
    const { selectedElement } = availability

    if (selectedElement?.quantity <= selectedElement.maxQuantity && selectedElement?.sku && selectedElement?.quantity > 0) {
      return true;
    }

    return false;
  }

  return (
    <>
      {
        props?.product?.productId && props?.product?.displayName && (
          <li className="product-item" ref={element}>
            <div className="product-item__container">
              <div className="image__container">
                <LazyLoadImage className="image" src={props?.product?.image?.src} alt={props?.product?.displayName} loading="lazy" />
              </div>
              <div>
                <span>{props?.product?.division}</span>
                <h3 title={props?.product?.displayName}>{props?.product?.displayName.replace(/\s/g, ' ')}</h3>
                <p>{price > 0 ? `Price: $${price}` : 'Loading...'}</p>
              </div>
              <form onSubmit={handleAddTocart}>
                <div>
                  <label>
                    Choose a size:
                    <select onChange={handleChangeSize} required>
                      <option value=""></option>
                      {
                        availability?.variation_list?.map((variation: any, index: number) => (
                          <option value={index} disabled={variation?.availability_status === 'NOT_AVAILABLE'}>
                            {variation?.size}
                          </option>
                        ))
                      }
                    </select>
                  </label>
                </div>
                <div>
                  <label>
                    Quantity:
                    <input type="number" min="0" max={availability?.selectedElement?.maxQuantity} value={availability?.selectedElement?.quantity} onChange={handleChangeQuantity} required />
                  </label>
                </div>
                <div>
                  <button type="submit" className="button" disabled={!validateFields()}>Add to cart</button>
                </div>
              </form>
            </div>
          </li>
        )
      }
    </>
  );
};

export default ProductItem;
