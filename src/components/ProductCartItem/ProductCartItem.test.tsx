import React from 'react';
import { render, cleanup } from '@testing-library/react';
import ProductCartItem from './ProductCartItem';
import { ProductLineItem } from '../../models/productLineItem';

afterEach(cleanup);

test('ProductCartItem empty', () => {
  const { getByText } = render(<ProductCartItem product={{ productId: ''} as ProductLineItem}/>);
});
