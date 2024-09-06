import React from 'react';
import { Drawer, Box, List, ListItem, ListItemIcon, ListItemText, Divider, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { Dashboard as DashboardIcon, Settings as SettingsIcon, Error as ErrorIcon } from '@mui/icons-material';
import FolderIcon from '@mui/icons-material/Folder';

const Sidebar = () => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 250,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 250,
          bgcolor: '#1E1E2D',
          color: 'white',
          paddingTop: 2
        },
      }}
    >
      <Box sx={{ padding: 2 }}>
        <Typography variant="h6" noWrap>
          Pro-Facture
        </Typography>
      </Box>
      <Divider />
      <List>
        <ListItem button component={Link} to="/dashboard">
          <ListItemIcon><DashboardIcon sx={{ color: 'white' }} /></ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component={Link} to="/dashboard/repertoire">
          <ListItemIcon><FolderIcon sx={{ color: 'white' }} /></ListItemIcon>
          <ListItemText primary="Répertoire" />
        </ListItem>
        <ListItem button component={Link} to="/dashboard/settings">
          <ListItemIcon><SettingsIcon sx={{ color: 'white' }} /></ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
        <ListItem button component={Link} to="/dashboard/error">
          <ListItemIcon><ErrorIcon sx={{ color: 'white' }} /></ListItemIcon>
          <ListItemText primary="Error" />
        </ListItem>
      </List>
      <Divider />
      <Box sx={{ padding: 2 }}>
        <Typography variant="caption" display="block" gutterBottom>
          Besoin de plus de fonctionnalités ?
        </Typography>
        <Button variant="contained" color="primary">
          Version Pro
        </Button>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
