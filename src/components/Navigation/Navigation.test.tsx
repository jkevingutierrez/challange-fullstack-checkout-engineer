import React from 'react';
import { render } from '@testing-library/react';
import Navigation from './Navigation';

test('renders nav links', () => {
  const { getByText } = render(<Navigation />);
  const homeLinkElement = getByText(/Home/i);
  const cartLinkElement = getByText(/Cart/i);
  expect(homeLinkElement).toBeInTheDocument();
  expect(cartLinkElement).toBeInTheDocument();
});
