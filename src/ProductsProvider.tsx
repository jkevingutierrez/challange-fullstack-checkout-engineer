import React, { FunctionComponent, useState, useEffect } from 'react';
import searchApi from './services/search.api';
import { Product } from './models/product';
import ProductsContext from './ProductsContext';

const ProductsProvider: FunctionComponent = props => {
  const [products, setProducts] = useState([] as Product[]);

  useEffect(() => {
    searchApi.getProducts()
      .then((response) => {
        const products = response?.itemList?.items as Product[];

        setProducts(products);
      })
  }, []);

  const value = { products, setProducts };

  return (
    <ProductsContext.Provider value={value}>
      {props.children}
    </ProductsContext.Provider>
  );
};

export default ProductsProvider;
