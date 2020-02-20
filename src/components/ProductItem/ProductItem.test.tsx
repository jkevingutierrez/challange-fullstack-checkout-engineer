import React from 'react';
import { render, cleanup } from '@testing-library/react';
import ProductItem from './ProductItem';

afterEach(cleanup);

beforeEach(() => {
  const global = window as any;

  global.IntersectionObserver = class IntersectionObserver {
    observe() {
      return null;
    }

    unobserve() {
      return null;
    }
  };
});

test('ProductItem empty', () => {
  const { getByText } = render(<ProductItem product={{ productId: '' }}/>);
});
