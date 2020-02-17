import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import Page from './components/Page';
import Navigation from './components/Navigation/Navigation';
import Products from './pages/Products';
import ShoppingCart from './pages/ShoppingCart';
import AppProvider from './AppProvider';

function AppRouter() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Navigation />
        <main>
          <Switch>
            <Page path="/cart" component={ShoppingCart} title="Shopping Cart" />
            <Page path="/" component={Products} title="Index" />
          </Switch>
        </main>
      </AppProvider>
    </BrowserRouter>
  );
}

export default AppRouter;
