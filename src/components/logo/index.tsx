import { Link } from 'react-router-dom';
import { To } from 'history';

// material-ui
import ButtonBase from '@mui/material/ButtonBase';
import { SxProps } from '@mui/system';

// project-imports
import Logo from './LogoMain';
import LogoIcon from './LogoIcon';
import useAuth from 'hooks/useAuth';
import { APP_DEFAULT_PATH } from 'config';

interface Props {
  isIcon?: boolean;
  sx?: SxProps;
  to?: To;
}

// ==============================|| MAIN LOGO ||============================== //

export default function LogoSection({ isIcon, sx }: Props) {
  const { isLoggedIn } = useAuth();
  console.log(isLoggedIn);

  return (
    <ButtonBase sx={sx} component={Link} to={isLoggedIn ? APP_DEFAULT_PATH : '/'} disableRipple>
      {isIcon ? <LogoIcon /> : <Logo />}
    </ButtonBase>
  );
}
