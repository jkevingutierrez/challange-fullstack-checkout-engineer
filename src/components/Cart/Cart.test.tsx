import React from 'react';
import { render } from '@testing-library/react';
import Cart from './Cart';

test('Cart', () => {
  const { getByText } = render(<Cart />);
});
