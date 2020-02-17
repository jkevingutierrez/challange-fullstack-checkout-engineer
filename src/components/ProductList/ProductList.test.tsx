import React from 'react';
import { render, cleanup } from '@testing-library/react';
import ProductList from './ProductList';

afterEach(cleanup);

test('ProductList empty', () => {
  const { getByText } = render(<ProductList products={[]} />);
  const countTextElement = getByText(/0 Products/i);
  expect(countTextElement).toBeInTheDocument();
});
