import React from 'react';
import { render } from '@testing-library/react';
import ProductCartItem from './ProductCartItem';

test('ProductCartItem', () => {
  const { getByText } = render(<ProductCartItem product={{ productId: ''}}/>);
  const textElement = getByText(/Home/i);
  expect(textElement).toBeInTheDocument();
});
