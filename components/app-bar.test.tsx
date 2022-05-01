import { render, screen } from '@testing-library/react';
import Menu from "./app-bar";


describe('app-bar', () => {
    test('app bar', () => {
      const context = render (<Menu/>); 
      
      expect(context.getByText('BeFit')).toBeInTheDocument();
    });
  });
