import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import Page from './components/Page';
import Navigation from './components/Navigation/Navigation';
import Products from './pages/Products';
import ShoppingCart from './pages/ShoppingCart';
import CartProvider from './CartProvider';
import ProductsProvider from './ProductsProvider';

function AppRouter() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Navigation />
        <main>
            <Switch>
              <Page path="/cart" component={ShoppingCart} title="Shopping Cart" />
              <ProductsProvider>
                <Page path="/" component={Products} title="Index" />
              </ProductsProvider>
            </Switch>
        </main>
      </CartProvider>
    </BrowserRouter>
  );
}

export default AppRouter;
