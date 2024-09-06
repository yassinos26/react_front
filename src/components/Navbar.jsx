import React from 'react';
import { AppBar, Toolbar, IconButton, Box, Avatar, InputBase, Menu, MenuItem } from '@mui/material';
import { Search as SearchIcon, Notifications as NotificationsIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ profilePicture, onLogout }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    onLogout();
    navigate('/sign-in');
  };

  const handleSettingsClick = () => {
    navigate('/dashboard/settings'); // Redirection vers la page des paramètres
    handleClose(); // Fermer le menu après redirection
  };

  return (
    <AppBar position="static" color="default" sx={{ bgcolor: 'white', boxShadow: 'none' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ flexGrow: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: '#F4F6F8', borderRadius: 1, p: '2px 4px' }}>
            <SearchIcon />
            <InputBase placeholder="Rechercher…" sx={{ ml: 1, flex: 1 }} />
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton size="large">
            <NotificationsIcon />
          </IconButton>
          <Avatar
            alt="Utilisateur"
            src={profilePicture}
            onClick={handleAvatarClick}
            sx={{ cursor: 'pointer', ml: 2 }}
          />
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            sx={{ mt: '45px' }}
          >
            <MenuItem onClick={handleSettingsClick}>Paramètres</MenuItem>
            <MenuItem onClick={handleLogout}>Déconnexion</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
