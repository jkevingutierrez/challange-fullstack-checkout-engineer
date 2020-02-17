import React from "react";
import { Basket } from "./models/basket";
import { Product } from "./models/product";

const DEFAULT_CONTEXT = {
  globalState: {
    cart: {} as Basket,
    products: [] as any[],
  },
  setGlobalState: (globalState: { cart: Basket, products: Product[]}) => {},
};

const AppContext = React.createContext(DEFAULT_CONTEXT);

export default AppContext;
