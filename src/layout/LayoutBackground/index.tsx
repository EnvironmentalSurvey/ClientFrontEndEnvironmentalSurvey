import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

// project import
import Loader from 'components/Loader';
import { SimpleLayoutType } from 'config';
import Box from '@mui/material/Box';

const Header = lazy(() => import('./Header'));
const FooterBlock = lazy(() => import('./FooterBlock'));

// ==============================|| LAYOUT - SIMPLE / LANDING ||============================== //

export default function SimpleLayout({ layout = SimpleLayoutType.SIMPLE }: { layout?: SimpleLayoutType }) {
  return (
    <Suspense fallback={<Loader />}>
      <Box sx={{ backgroundColor: '#5FBA73' }}>
        <Header />
        <Outlet />
        <FooterBlock isFull={layout === SimpleLayoutType.LANDING} />
      </Box>
    </Suspense>
  );
}
