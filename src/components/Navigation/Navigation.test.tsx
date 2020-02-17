import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Navigation from './Navigation';
import { BrowserRouter } from 'react-router-dom';

afterEach(cleanup);

test('renders nav links', () => {
  const { getByText } = render(<BrowserRouter><Navigation /></BrowserRouter>);
  const homeLinkElement = getByText(/Home/i);
  const cartLinkElement = getByText(/Cart/i);
  expect(homeLinkElement).toBeInTheDocument();
  expect(cartLinkElement).toBeInTheDocument();
});
