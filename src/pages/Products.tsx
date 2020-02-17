import React, { useContext } from 'react';
import ProductList from '../components/ProductList/ProductList';
import ProductsContext from '../ProductsContext';

function Products() {
  const { products } = useContext(ProductsContext);

  return (
    <div className="products">
      <h1>Products Page</h1>
      <ProductList products={products} />
    </div>
    );
};

export default Products;
