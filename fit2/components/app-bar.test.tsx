import { render, screen } from '@testing-library/react';
import Menu from "./app-bar";


describe('app-bar', () => {
    test('app bar', () => {
      render (<Menu/>); 
      expect(screen.getByText('BeFit')).toBeInTheDocument();
    });
  });
