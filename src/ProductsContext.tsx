import React from "react";
import { Product } from "./models/product";

const DEFAULT_CONTEXT = {
  products: [] as Product[],
  setProducts: (products: Product[]) => {},
};

const ProductsContext = React.createContext(DEFAULT_CONTEXT);

export default ProductsContext;
