import React, { FunctionComponent, useContext } from 'react';
import IPageProps from '../interfaces/PageProps';
import ProductList from '../components/ProductList/ProductList';
import AppContext from '../AppContext';

const Products: FunctionComponent<IPageProps> = props => {
  const app = useContext(AppContext);

  return (
    <div className="products">
      <h1>Products Page</h1>
      <ProductList products={app.globalState.products}/>
    </div>
    );
};

export default Products;
