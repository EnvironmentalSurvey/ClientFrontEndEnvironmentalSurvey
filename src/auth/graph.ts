import axiosServices from '../utils/axios';
import { graphConfig } from './authConfig';

interface UserProfile {
  givenName: string;
  surname: string;
  userPrincipalName: string;
  id: string;
}

/**
 * Attaches a given access token to a MS Graph API call and returns information about the user.
 * @returns UserProfile - The user data returned from Microsoft Graph
 */
export async function callMsGraph(): Promise<UserProfile> {
  try {
    const response = await axiosServices.get<UserProfile>(graphConfig.graphMeEndpoint);
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
}
