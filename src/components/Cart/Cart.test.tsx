import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Cart from './Cart';

afterEach(cleanup);

test('Cart', () => {
  const { getByText } = render(<Cart />);
});
