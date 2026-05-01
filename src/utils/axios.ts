import axios, { AxiosRequestConfig } from 'axios';
import { loginRequest } from '../auth/authConfig';
import { PublicClientApplication } from '@azure/msal-browser';
import { msalConfig } from '../auth/authConfig';

const msalInstance = new PublicClientApplication(msalConfig);

async function initializeMsalInstance() {
  if (!msalInstance.getAllAccounts().length) {
    await msalInstance.initialize();
  }
  await msalInstance.initialize();
}

const axiosServices = axios.create({ baseURL: import.meta.env.VITE_APP_API_URL || 'http://localhost:3010/' });

axiosServices.interceptors.request.use(
  async (config) => {
    await initializeMsalInstance();
    const accounts = msalInstance.getAllAccounts();
    if (accounts.length > 0) {
      const request = {
        ...loginRequest,
        account: accounts[0]
      };
      const response = await msalInstance.acquireTokenSilent(request);
      console.log(response.accessToken);
      config.headers.Authorization = `Bearer ${response.accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// axiosServices.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     console.log('Interceptor triggered - Step 1');
//     const activeAccount = msalInstance.getActiveAccount();
//     if (error.response?.status === 401) {
//       if (!activeAccount) {
//         console.log('Interceptor - Redirecting to /login - Step 2');
//         window.location.pathname = '/login';
//       } else {
//         console.log('Interceptor - Redirecting to /maintenance/500 - Step 2');
//         window.location.pathname = '/maintenance/500';
//       }
//     }
//     console.log('Interceptor - Returning error - Step 3');
//     return Promise.reject((error.response && error.response.data) || 'Unknown error');
//   }
// );
export default axiosServices;

export const fetcher = async (args: string | [string, AxiosRequestConfig]) => {
  const [url, config] = Array.isArray(args) ? args : [args];

  const res = await axiosServices.get(url, { ...config });

  return res.data;
};

export const fetcherPost = async (args: string | [string, AxiosRequestConfig]) => {
  const [url, config] = Array.isArray(args) ? args : [args];

  const res = await axiosServices.post(url, { ...config });

  return res.data;
};
