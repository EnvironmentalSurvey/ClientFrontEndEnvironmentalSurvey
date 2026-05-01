import { Link, useNavigate } from 'react-router-dom';

// material-ui
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project-imports
import Logo from 'components/logo';
import AuthSocButton from 'sections/auth/AuthSocButton';
import AuthDivider from 'sections/auth/AuthDivider';
import AuthWrapper from 'sections/auth/AuthWrapper';
import AuthLogin from 'sections/auth/auth-forms/AuthLogin';
import imgMicrosoft from 'assets/images/auth/microsoft.svg';
import { useMsal } from '@azure/msal-react';
import { useAuthStore } from '../../../store/authStore';
import { loginRequest } from '../../../auth/authConfig';
// assets

// ================================|| LOGIN ||================================ //

export default function Login() {
  // const { isLoggedIn } = useAuth();
  const { instance } = useMsal();
  const { loginWithMicrosoft, isLoggedIn } = useAuthStore();
  const navigate = useNavigate();
  async function handleMicrosoftLogin() {
    try {
      await instance.loginPopup(loginRequest);
      const accounts = instance.getAllAccounts();
      if (accounts.length > 0) {
        instance.setActiveAccount(accounts[0]);
        await loginWithMicrosoft();
        navigate('/survey');
      } else {
        console.error('No accounts available after login');
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  }

  return (
    <AuthWrapper>
      <Grid container spacing={3}>
        <Grid item xs={12} sx={{ textAlign: 'center' }}>
          <Logo />
        </Grid>

        <Grid item xs={12}>
          <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
            <Typography variant="h3">Login</Typography>
            <Typography
              component={Link}
              to={isLoggedIn ? '/auth/register' : '/register'}
              variant="body1"
              sx={{ textDecoration: 'none' }}
              color="primary"
            >
              Don&apos;t have an account?
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <AuthLogin forgot="/auth/forgot-password" />
        </Grid>
        <Grid item xs={12}>
          <AuthDivider>
            <Typography variant="body1">OR</Typography>
          </AuthDivider>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <AuthSocButton onClick={handleMicrosoftLogin}>
                <img src={imgMicrosoft} alt="Microsoft" style={{ margin: '0 10px' }} />
                Sign In with Microsoft
              </AuthSocButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </AuthWrapper>
  );
}
