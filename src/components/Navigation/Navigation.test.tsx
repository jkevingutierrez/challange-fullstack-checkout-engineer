import React from 'react';
import { render } from '@testing-library/react';
import Navigation from './Navigation';
import { BrowserRouter } from 'react-router-dom';

test('renders nav links', () => {
  const { getByText } = render(<BrowserRouter><Navigation /></BrowserRouter>);
  const homeLinkElement = getByText(/Home/i);
  const cartLinkElement = getByText(/Cart/i);
  expect(homeLinkElement).toBeInTheDocument();
  expect(cartLinkElement).toBeInTheDocument();
});
