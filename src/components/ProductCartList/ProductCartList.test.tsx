import React from 'react';
import { render } from '@testing-library/react';
import ProductCartList from './ProductCartList';

test('ProductCartList empty', () => {
  const { getByText } = render(<ProductCartList products={[]} />);
  const countTextElement = getByText(/0 Products/i);
  expect(countTextElement).toBeInTheDocument();
});
