import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axiosServices from 'utils/axios';
import { UserList, UserProps } from 'types/user';

// Initial state for modal
const initialState: UserProps = {
  modal: false
};

// Endpoints configuration
export const endpoints = {
  key: 'api/users',
  modal: '/modal',
  me: 'api/users/me' // Endpoint for the "Me" (Get/Update by Token)
};

// Fetch function to retrieve all users
const fetchUsers = async () => {
  const response = await axiosServices.get(endpoints.key);
  return response.data;
};

// Fetch function to retrieve user by token
const fetchUserByToken = async (): Promise<UserList> => {
  const response = await axiosServices.get(endpoints.me);
  return response.data;
};

// useQuery to fetch all users
export function useGetUser() {
  const { data, isLoading, error, isFetching } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
    staleTime: Infinity
  });

  return {
    users: (data?.elements as UserList[]) || [],
    usersLoading: isLoading,
    usersError: error,
    usersValidating: isFetching,
    usersEmpty: !isLoading && !data?.elements?.length
  };
}

// useQuery to fetch user by token
export function useGetUserByToken() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['userByToken'],
    queryFn: fetchUserByToken,
    staleTime: Infinity
  });

  return {
    user: data || null,
    userLoading: isLoading,
    userError: error
  };
}

// Insert a new user function
const insertUser = async (newUser: UserList): Promise<UserList> => {
  const data = {
    accountEnabled: newUser.accountEnabled,
    displayName: newUser.displayName,
    mailNickname: newUser.mailNickname,
    userPrincipalName: newUser.userPrincipalName,
    passwordProfile: {
      forceChangePasswordNextSignIn: newUser.passwordProfile.forceChangePasswordNextSignIn,
      password: newUser.passwordProfile.password
    },
    role: newUser.role,
    firstName: newUser.firstName,
    lastName: newUser.lastName,
    email: newUser.email,
    specialization: newUser.specialization,
    memberCode: newUser.memberCode,
    className: newUser.className,
    gender: newUser.gender,
    dateOfBirth: new Date(newUser.dateOfBirth).toISOString(),
    phoneNumber: newUser.phoneNumber,
    avatar: newUser.avatar,
    status: newUser.status
  };

  await axiosServices.post(endpoints.key, data);
  return newUser;
};

// useMutation for inserting new user
export function useInsertUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: insertUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: (error: any) => {
      console.error('Error inserting user:', error);
    }
  });
}

// Update a user by token function
const updateUserByToken = async (updatedUser: UserList): Promise<UserList> => {
  const data = {
    displayName: updatedUser.displayName,
    firstName: updatedUser.firstName,
    lastName: updatedUser.lastName,
    email: updatedUser.email,
    specialization: updatedUser.specialization,
    className: updatedUser.className,
    gender: updatedUser.gender,
    dateOfBirth: new Date(updatedUser.dateOfBirth).toISOString(),
    phoneNumber: updatedUser.phoneNumber,
    avatar: updatedUser.avatar,
    role: updatedUser.role,
    status: updatedUser.status
  };

  const response = await axiosServices.put(endpoints.me, data); // PUT request to update user by token
  return response.data;
};

// useMutation for updating user by token
export function useUpdateUserByToken() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (updatedUser: UserList) => updateUserByToken(updatedUser),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userByToken'] }); // Invalidate cached userByToken
    },
    onError: (error: any) => {
      console.error('Error updating user by token:', error);
    }
  });
}

// Delete a user function
const deleteUser = async (userUuid: string): Promise<string> => {
  await axiosServices.delete(`${endpoints.key}/${userUuid}`);
  return userUuid;
};

// useMutation for deleting user
export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: (error: any) => {
      console.error('Error deleting user:', error);
    }
  });
}

// Fetch user master data (for modal state)
export function useGetUserMaster() {
  const { data, isLoading } = useQuery({
    queryKey: [endpoints.key + endpoints.modal],
    queryFn: () => initialState,
    staleTime: Infinity
  });

  return {
    userMaster: data,
    userMasterLoading: isLoading
  };
}

export function useHandlerUserDialog() {
  const queryClient = useQueryClient();

  return (modal: boolean) => {
    queryClient.setQueryData([endpoints.key + endpoints.modal], (currentData: any) => ({
      ...currentData,
      modal
    }));
  };
}
