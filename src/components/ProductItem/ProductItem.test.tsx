import React from 'react';
import { render } from '@testing-library/react';
import ProductItem from './ProductItem';

test('ProductItem empty', () => {
  const { getByText } = render(<ProductItem product={{ productId: '' }}/>);
});
