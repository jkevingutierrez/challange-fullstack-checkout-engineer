import React, { FunctionComponent, useState, useEffect } from 'react';
import AppContext from './AppContext';
import searchApi from './services/search.api';
import { Product } from './models/product';
import { Basket } from './models/basket';

const AppProvider: FunctionComponent = props => {
  const [globalState, setGlobalState] = useState({
    cart: {} as Basket,
    products: [] as any[],
  });

  useEffect(() => {
    searchApi.getProducts()
      .then((response) => {
        setGlobalState(prevState => ({
          ...prevState,
          products: response?.itemList?.items as Product[],
        }));
      })
  }, []);

  const value = { globalState, setGlobalState };

  return (
    <AppContext.Provider value={value}>
      { props.children }
    </AppContext.Provider>
  );
};

export default AppProvider;
