import React from 'react';
import { render } from '@testing-library/react';
import Loading from './Loading';

test('renders nav links', () => {
  const { getByText } = render(<Loading />);
  const textElement = getByText(/Home/i);
  expect(textElement).toBeInTheDocument();
});
