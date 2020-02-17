import React from 'react';
import { render } from '@testing-library/react';
import ProductCartItem from './ProductCartItem';

test('ProductCartItem empty', () => {
  const { getByText } = render(<ProductCartItem product={{ productId: ''}}/>);
});
