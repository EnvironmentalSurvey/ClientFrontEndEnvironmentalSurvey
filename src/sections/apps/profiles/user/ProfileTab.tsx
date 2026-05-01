import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// material-ui
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemButton from '@mui/material/ListItemButton';
// assets
import { Lock, NotificationStatus, Profile } from 'iconsax-react';

function getPathIndex(pathname: string) {
  let selectedTab = 0;
  switch (pathname) {
    case '/profiles/user/password':
      selectedTab = 1;
      break;
    case '/profiles/user/history-join':
      selectedTab = 2;
      break;
    case '/profiles/user/personal':
    default:
      selectedTab = 0;
  }
  return selectedTab;
}

// ==============================|| USER PROFILE - BASIC ||============================== //

export default function ProfileTab() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [selectedIndex, setSelectedIndex] = useState(getPathIndex(pathname));
  const handleListItemClick = (index: number, route: string) => {
    setSelectedIndex(index);
    navigate(route);
  };

  useEffect(() => {
    setSelectedIndex(getPathIndex(pathname));
  }, [pathname]);

  return (
    <List component="nav" sx={{ p: 0, '& .MuiListItemIcon-root': { minWidth: 32, color: 'secondary.main' } }}>
      <ListItemButton selected={selectedIndex === 0} onClick={() => handleListItemClick(0, '/profiles/user/personal')}>
        <ListItemIcon>
          <Profile size={18} />
        </ListItemIcon>
        <ListItemText primary="Personal Information" />
      </ListItemButton>

      <ListItemButton selected={selectedIndex === 1} onClick={() => handleListItemClick(1, '/profiles/user/password')}>
        <ListItemIcon>
          <Lock size={18} />
        </ListItemIcon>
        <ListItemText primary="Change Password" />
      </ListItemButton>

      <ListItemButton selected={selectedIndex === 2} onClick={() => handleListItemClick(0, '/profiles/user/history-join')}>
        <ListItemIcon>
          <NotificationStatus size={18} />
        </ListItemIcon>
        <ListItemText primary="History Join" />
      </ListItemButton>
    </List>
  );
}
