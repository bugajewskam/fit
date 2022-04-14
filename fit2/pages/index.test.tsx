

import React from 'react';
import { render } from '@testing-library/react';


describe('NextPage', () => {
  test('renders NextPage component', () => {
    render(<NextPage />);
    screen.debug();
  });
});
