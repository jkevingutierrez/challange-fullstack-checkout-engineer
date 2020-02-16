import React from 'react';
import './App.scss';
import { BrowserRouter, Switch } from 'react-router-dom';
import Page from './components/Page';
import Navigation from './components/Navigation';
import Products from './pages/Products';
import ShoppingCart from './pages/ShoppingCart';

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Switch>
        <Page path="/cart" component={ShoppingCart} title="Shopping Cart" />
        <Page path="/" component={Products} title="Index" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
