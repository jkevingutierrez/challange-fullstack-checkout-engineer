import React from 'react';
import { render, cleanup } from '@testing-library/react';
import ProductItem from './ProductItem';

afterEach(cleanup);

test('ProductItem empty', () => {
  const { getByText } = render(<ProductItem product={{ productId: '' }}/>);
});
