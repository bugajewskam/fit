import { Menu } from "@mui/material";
import { render } from "react-dom";


describe('app-bar', () => {
    test('app bar', () => {
      render (<Menu/>);
  
      expect(screen.getByText('BeFit')).toBeInTheDocument();
    });
  });
