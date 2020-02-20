import React from 'react';
import { render, cleanup } from '@testing-library/react';
import CheckoutButton from './CheckoutButton';

afterEach(cleanup);

test('CheckoutButton', () => {
  const { getByText } = render(<CheckoutButton />);
  const buttonElement = getByText(/GO TO CHECKOUT/i);
  expect(buttonElement).toBeInTheDocument();
});
