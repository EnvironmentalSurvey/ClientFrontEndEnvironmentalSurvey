// material-ui
import Box from '@mui/material/Box';

// project-imports
import SimpleBar from 'components/third-party/SimpleBar';

// ==============================|| DRAWER - CONTENT ||============================== //
interface Props {
  searchValue?: string;
}
export default function Navigation({ searchValue }: Props) {
  return (
    <SimpleBar
      sx={{
        height: { xs: 'calc(100vh - 70px)', md: 'calc(100% - 70px)' },
        '& .simplebar-content': {
          display: 'flex',
          flexDirection: 'column'
        }
      }}
    >
      <Box sx={{ p: 3, pt: 1.5 }}>
        <Navigation searchValue={searchValue} />
      </Box>
    </SimpleBar>
  );
}
