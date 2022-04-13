import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import TimerIcon from '@mui/icons-material/Timer';
import { Avatar } from '@mui/material';
export default function Menu() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Avatar 
            aria-label="menu"
            sx={{ mr: 2, background: "#FFF"  }}
          >
            <TimerIcon sx={{fill:'#1976d2'}} />
          </Avatar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            BeFit
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
