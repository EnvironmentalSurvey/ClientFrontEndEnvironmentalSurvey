import React, { ReactElement, useEffect } from 'react';
import { useMsal } from '@azure/msal-react';
import { useNavigate } from 'react-router-dom';
import Error404 from '../pages/maintenance/error/404';

interface PrivateRouteProps {
  children: ReactElement;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { accounts } = useMsal();
  const navigate = useNavigate();

  useEffect(() => {
    if (!accounts || accounts.length === 0) {
      navigate('/login');
    }
  }, [accounts, navigate]);

  if (!accounts || accounts.length === 0) {
    return <Error404 />;
  }

  return children;
};

export default PrivateRoute;
