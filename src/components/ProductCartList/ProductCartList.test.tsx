import React from 'react';
import { render } from '@testing-library/react';
import ProductCartList from './ProductCartList';

test('ProductCartList', () => {
  const { getByText } = render(<ProductCartList products={[]}/>);
  const textElement = getByText(/Home/i);
  expect(textElement).toBeInTheDocument();
});
