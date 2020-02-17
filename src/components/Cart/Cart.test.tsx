import React from 'react';
import { render } from '@testing-library/react';
import Cart from './Cart';

test('renders nav links', () => {
  const { getByText } = render(<Cart />);
  const textElement = getByText(/Home/i);
  expect(textElement).toBeInTheDocument();
});
