import React, { FunctionComponent, useState, useEffect } from 'react';
import searchApi from './services/search.api';
import { Product } from './models/product';
import ProductsContext from './ProductsContext';

const ProductsProvider: FunctionComponent = props => {
  const [products, setProducts] = useState([] as Product[]);

  useEffect(() => {
    let isSubscribed = true;

    searchApi.getProducts()
      .then((response) => {
        const products = response?.itemList?.items as Product[];

        if (isSubscribed) {
          setProducts(products);
        }
      })

    return () => { isSubscribed = false };
  }, []);

  const value = { products, setProducts };

  return (
    <ProductsContext.Provider value={value}>
      {props.children}
    </ProductsContext.Provider>
  );
};

export default ProductsProvider;
