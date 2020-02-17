import React from 'react';
import { getByText, render } from '@testing-library/react';
import ProductList from './ProductList';

test('ProductList empty', () => {
  const { getByText } = render(<ProductList products={[]} />);
  const countTextElement = getByText(/0 Products/i);
  expect(countTextElement).toBeInTheDocument();
});
