// material-ui
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

// third-party
import { motion } from 'framer-motion';

// project-imports
import Logo from 'components/logo';

// assets
import { Dribbble, Facebook, Link2, Youtube, Xrp } from 'iconsax-react';

// link - custom style
const FooterLink = styled(Link)(({ theme }) => ({
  color: theme.palette.text.primary,
  '&:hover, &:active': {
    color: theme.palette.primary.main
  }
}));

type showProps = {
  isFull?: boolean;
};

// ==============================|| LANDING - FOOTER PAGE ||============================== //

export default function FooterBlock({ isFull }: showProps) {
  const theme = useTheme();

  const linkSX = {
    color: theme.palette.text.secondary,
    fontWeight: 400,
    opacity: '0.6',
    cursor: 'pointer',
    '&:hover': {
      opacity: '1'
    }
  };

  return (
    <>
      <Box sx={{ pt: isFull ? 5 : 10, pb: 10, bgcolor: 'secondary.200', borderTop: `1px solid ${theme.palette.divider}` }}>
        <Container>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <motion.div
                initial={{ opacity: 0, translateY: 550 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 150,
                  damping: 30
                }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Logo />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 400, maxWidth: 320 }}>
                      Our platform is dedicated to raising awareness about environmental protection through interactive surveys,
                      competitions, and educational initiatives. We aim to engage participants, reduce paper usage, and foster a sense of
                      responsibility towards the environment.
                    </Typography>
                  </Grid>
                </Grid>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={8}>
              <Grid container spacing={{ xs: 5, md: 2 }}>
                <Grid item xs={6} sm={4}>
                  <Stack spacing={3}>
                    <Typography variant="h5">Company</Typography>
                    <Stack spacing={{ xs: 1.5, md: 2.5 }}>
                      <FooterLink href="" underline="none">
                        Profile
                      </FooterLink>
                      <FooterLink href="" underline="none">
                        Portfolio
                      </FooterLink>
                      <FooterLink href="" underline="none">
                        Follow Us
                      </FooterLink>
                      <FooterLink href="" underline="none">
                        Website
                      </FooterLink>
                    </Stack>
                  </Stack>
                </Grid>
                <Grid item xs={6} sm={4}>
                  <Stack spacing={3}>
                    <Typography variant="h5">Help & Support</Typography>
                    <Stack spacing={{ xs: 1.5, md: 2.5 }}>
                      <FooterLink href="" underline="none">
                        Documentation
                      </FooterLink>
                      <FooterLink href="" underline="none">
                        Feature Request
                      </FooterLink>
                      <FooterLink href="" underline="none">
                        RoadMap
                      </FooterLink>
                      <FooterLink href="" underline="none">
                        Support
                      </FooterLink>
                      <FooterLink href="" underline="none">
                        Email Us
                      </FooterLink>
                    </Stack>
                  </Stack>
                </Grid>
                <Grid item xs={6} sm={4}>
                  <Stack spacing={3}>
                    <Typography variant="h5">Useful Resources</Typography>
                    <Stack spacing={{ xs: 1.5, md: 2.5 }}>
                      <FooterLink href="" underline="none">
                        Support Policy
                      </FooterLink>
                      <FooterLink href="" underline="none">
                        Licenses Term
                      </FooterLink>
                    </Stack>
                  </Stack>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box
        sx={{
          py: 2.4,
          borderTop: `1px solid ${theme.palette.divider}`,
          bgcolor: 'secondary.200'
        }}
      >
        <Container>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={8}>
              <Typography>
                © {new Date().getFullYear()} <strong>EnviroSurvey</strong> by Team{' '}
                <Link href="#" underline="hover" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                  T3.2307.E1 Group 4
                </Link>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Grid container spacing={2} alignItems="center" sx={{ justifyContent: 'flex-end' }}>
                <Grid item>
                  <Tooltip title="Linkedin">
                    <Link href="" underline="none" sx={linkSX}>
                      <Link2 variant="Bold" size={24} />
                    </Link>
                  </Tooltip>
                </Grid>
                <Grid item>
                  <Tooltip title="Twitter">
                    <Link href="" underline="none" sx={linkSX}>
                      <Xrp variant="Bold" size={16} />
                    </Link>
                  </Tooltip>
                </Grid>
                <Grid item>
                  <Tooltip title="Facebook">
                    <Link href="" underline="none" sx={linkSX}>
                      <Facebook variant="Bold" size={20} />
                    </Link>
                  </Tooltip>
                </Grid>
                <Grid item>
                  <Tooltip title="Dribbble">
                    <Link href="" underline="none" sx={linkSX}>
                      <Dribbble variant="Bold" size={20} />
                    </Link>
                  </Tooltip>
                </Grid>
                <Grid item>
                  <Tooltip title="Youtube">
                    <Link href="" underline="none" sx={linkSX}>
                      <Youtube variant="Bold" size={20} />
                    </Link>
                  </Tooltip>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}
