import { LogLevel } from '@azure/msal-browser';

export const msalConfig = {
  auth: {
    clientId: import.meta.env.VITE_APP_MSAL_CLIENT_ID,
    authority: import.meta.env.VITE_APP_MSAL_AUTHORITY,
    redirectUri: import.meta.env.VITE_APP_MSAL_REDIRECT_URI
  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: true
  },
  system: {
    loggerOptions: {
      loggerCallback: (level: LogLevel, message: string, containsPii: boolean): void => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            return;
          case LogLevel.Info:
            console.info(message);
            return;
          case LogLevel.Verbose:
            console.debug(message);
            return;
          case LogLevel.Warning:
            console.warn(message);
            return;
          default:
            return;
        }
      }
    }
  }
};

export const protectedResources = {
  toDoListAPI: {
    endpoint: import.meta.env.VITE_APP_TODOLIST_API_ENDPOINT,
    scopes: {
      read: [import.meta.env.VITE_APP_TODOLIST_API_SCOPE_READ],
      write: [import.meta.env.VITE_APP_TODOLIST_API_SCOPE_WRITE]
    }
  }
};

export const loginRequest = {
  scopes: [...protectedResources.toDoListAPI.scopes.read, ...protectedResources.toDoListAPI.scopes.write]
};

// Graph API configuration object
export const graphConfig = {
  graphMeEndpoint: import.meta.env.VITE_APP_GRAPH_ME_ENDPOINT
};
