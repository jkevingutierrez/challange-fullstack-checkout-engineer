import React from 'react';
import { render, cleanup } from '@testing-library/react';
import ProductCartList from './ProductCartList';

afterEach(cleanup);

test('ProductCartList empty', () => {
  const { getByText } = render(<ProductCartList />);
});
