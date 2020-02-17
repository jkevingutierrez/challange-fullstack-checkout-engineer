import React from 'react';
import { render } from '@testing-library/react';
import ProductList from './ProductList';

test('ProductList', () => {
  const { getByText } = render(<ProductList  products={[]}/>);
  const textElement = getByText(/Home/i);
  expect(textElement).toBeInTheDocument();
});
