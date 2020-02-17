import React from 'react';
import { render } from '@testing-library/react';
import ProductItem from './ProductItem';

test('ProductItem', () => {
  const { getByText } = render(<ProductItem product={{ productId: '' }}/>);
  const textElement = getByText(/Home/i);
  expect(textElement).toBeInTheDocument();
});
