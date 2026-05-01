// material-ui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { ThemeDirection, ThemeMode } from 'config';
import useConfig from '../../../hooks/useConfig';
// select company-size
import ReactDraft from 'sections/forms/plugins/ReactDraft';
// ==============================|| CONTACT US - FORM ||============================== //

export default function ContactForm() {
  const theme = useTheme();
  const { mode, themeDirection } = useConfig();

  return (
    <Box sx={{ p: { xs: 2.5, sm: 0 } }}>
      <Grid container spacing={5} justifyContent="center">
        <Grid item xs={12} sm={10} lg={6}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Stack spacing={1}>
                <Typography variant="subtitle1" color="secondary">
                  First Name{' '}
                  <Box component="span" sx={{ color: 'red' }}>
                    *
                  </Box>
                </Typography>
                <TextField fullWidth type="text" placeholder="First name" />
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack spacing={1}>
                <Typography variant="subtitle1" color="secondary">
                  Last Name{' '}
                  <Box component="span" sx={{ color: 'red' }}>
                    *
                  </Box>
                </Typography>
                <TextField fullWidth type="text" placeholder="Last name" />
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack spacing={1}>
                <Typography variant="subtitle1" color="secondary">
                  Title {''}
                  <Box component="span" sx={{ color: 'red' }}>
                    *
                  </Box>
                </Typography>
                <TextField fullWidth type="text" placeholder="Title" />
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack spacing={1}>
                <Typography variant="subtitle1" color="secondary">
                  Contact Information{' '}
                  <Box component="span" sx={{ color: 'red' }}>
                    *
                  </Box>
                </Typography>
                <TextField fullWidth type="email" placeholder="Contact information (mobile or email)" />
              </Stack>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                '& .rdw-editor-wrapper': {
                  bgcolor: theme.palette.background.paper,
                  border: '1px solid',
                  borderColor: theme.palette.divider,
                  borderRadius: '4px',
                  overflow: 'visible',
                  '& .rdw-editor-main': { px: 2, py: 0.5, border: 'none' },
                  '& .rdw-editor-toolbar': {
                    pt: 1.25,
                    border: 'none',
                    borderBottom: '1px solid',
                    borderColor: theme.palette.divider,
                    bgcolor: 'secondary.lighter',
                    '& .rdw-option-wrapper': {
                      bgcolor: mode === ThemeMode.DARK ? 'dark.light' : 'secondary.lighter',
                      borderColor: theme.palette.divider
                    },
                    '& .rdw-dropdown-wrapper': {
                      bgcolor: mode === ThemeMode.DARK ? 'dark.light' : 'secondary.lighter',
                      borderColor: theme.palette.divider,
                      '& .rdw-dropdown-selectedtext': { color: mode === ThemeMode.DARK ? 'secondary.100' : 'secondary.darker' },
                      '& .rdw-dropdownoption-default': { color: mode === ThemeMode.DARK ? 'secondary.100' : 'secondary.darker' },
                      '& .rdw-dropdown-carettoopen': { position: themeDirection === ThemeDirection.RTL ? 'initial' : 'absolute' }
                    },
                    '& .rdw-embedded-modal-link-input': { backgroundColor: 'secondary.lighter' },
                    '& .rdw-embedded-modal-size-input': { backgroundColor: 'secondary.lighter', color: 'secondary.main' },
                    '& .rdw-emoji-modal': { left: { xs: -140, sm: -195, md: 5 } },
                    '& .rdw-embedded-modal': { left: { xs: -100, sm: -165, md: 5 } },
                    '& .rdw-link-modal': { left: { xs: 0, sm: -100, md: 5 } },
                    '& .rdw-image-modal': { left: { xs: -190, sm: 30, md: 5 }, top: '15px' },
                    '& .rdw-colorpicker-modal': { left: { xs: -150, sm: 5 } }
                  },
                  ...(theme.direction === ThemeDirection.RTL && {
                    '.rdw-dropdown-carettoopen': {
                      position: 'absolute !important',
                      right: '10%',
                      left: 'inherit'
                    },
                    '.rdw-dropdown-carettoclose': { right: '10%', left: 'inherit' }
                  }),
                  ...(theme.palette.mode === ThemeMode.DARK && {
                    '& .rdw-link-modal-btn': {
                      color: 'common.black'
                    },
                    '& .rdw-image-modal-btn': {
                      color: 'common.black'
                    },
                    '& .rdw-embedded-modal-btn': {
                      color: 'common.black'
                    }
                  })
                }
              }}
            >
              <Stack spacing={1}>
                <Typography variant="subtitle1" color="secondary">
                  Description{' '}
                  <Box component="span" sx={{ color: 'red' }}>
                    *
                  </Box>
                </Typography>
                <ReactDraft />
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack direction="row" alignItems="center" sx={{ ml: -1 }}>
                <Checkbox sx={{ '& .css-1vjb4cj': { borderRadius: '2px' } }} defaultChecked />
                <Typography>
                  I agree to all the{' '}
                  <Typography sx={{ cursor: 'pointer' }} component="span" color={theme.palette.primary.main}>
                    Terms & Condition
                  </Typography>
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" fullWidth>
                Submit
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
