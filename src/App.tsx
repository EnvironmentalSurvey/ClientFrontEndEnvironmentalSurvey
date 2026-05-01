import { RouterProvider } from 'react-router-dom';

// project import
import router from 'routes';
import ThemeCustomization from 'themes';

import Locales from 'components/Locales';
// import RTLLayout from 'components/RTLLayout';
import ScrollTop from 'components/ScrollTop';
import Snackbar from 'components/@extended/Snackbar';
import { QueryProvider } from './QueryProvider';

// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

export default function App() {
  return (
    <ThemeCustomization>
      <Locales>
        <ScrollTop>
          <QueryProvider>
            <RouterProvider router={router} />
            <Snackbar />
          </QueryProvider>
        </ScrollTop>
      </Locales>
    </ThemeCustomization>
  );
}
