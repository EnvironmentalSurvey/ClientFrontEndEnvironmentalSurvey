import { useState, MouseEvent } from 'react';

// material-ui
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

// assets
import { Clipboard, Logout, Profile } from 'iconsax-react';
import { useNavigate } from 'react-router-dom';

interface Props {
  handleLogout: () => void;
}

// ==============================|| HEADER PROFILE - PROFILE TAB ||============================== //

export default function ProfileTab({ handleLogout }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  // const handleListItemClick = (event: MouseEvent<HTMLDivElement>, index: number) => {
  //   setSelectedIndex(index);
  // };
  const navigate = useNavigate();
  const handleListItemClick = (event: MouseEvent<HTMLDivElement>, index: number, route: string = '') => {
    setSelectedIndex(index);

    if (route && route !== '') {
      navigate(route);
    }
  };
  return (
    <List component="nav" sx={{ p: 0, '& .MuiListItemIcon-root': { minWidth: 32 } }}>
      <ListItemButton
        selected={selectedIndex === 1}
        onClick={(event: MouseEvent<HTMLDivElement>) => handleListItemClick(event, 1, '/profiles/user/personal')}
      >
        <ListItemIcon>
          <Profile variant="Bulk" size={18} />
        </ListItemIcon>
        <ListItemText primary="View Profile" />
      </ListItemButton>

      <ListItemButton
        selected={selectedIndex === 4}
        onClick={(event: MouseEvent<HTMLDivElement>) => handleListItemClick(event, 4, '/profiles/user/history-join')}
      >
        <ListItemIcon>
          <Clipboard variant="Bulk" size={18} />
        </ListItemIcon>
        <ListItemText primary="History" />
      </ListItemButton>
      <ListItemButton selected={selectedIndex === 2} onClick={handleLogout}>
        <ListItemIcon>
          <Logout variant="Bulk" size={18} />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItemButton>
    </List>
  );
}
