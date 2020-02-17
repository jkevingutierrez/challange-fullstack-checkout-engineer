import React from "react";
import { Basket } from "./models/basket";

const DEFAULT_CONTEXT = {
  cart: {} as Basket,
  setCart: (cart: Basket) => {},
};

const CartContext = React.createContext(DEFAULT_CONTEXT);

export default CartContext;
