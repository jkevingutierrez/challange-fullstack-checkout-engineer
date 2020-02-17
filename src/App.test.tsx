import React from 'react';
import { cleanup, render } from '@testing-library/react';
import App from './App';

afterEach(cleanup);

test('renders nav links', () => {
  const { getByText } = render(<App />);
  const homeLinkElement = getByText(/Home/i);
  const cartLinkElement = getByText(/Cart/i);
  expect(homeLinkElement).toBeInTheDocument();
  expect(cartLinkElement).toBeInTheDocument();
});
