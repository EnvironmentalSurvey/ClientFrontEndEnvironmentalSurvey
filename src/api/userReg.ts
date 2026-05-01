import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axiosServices from 'utils/axios';
import { UserProps, UserReg } from 'types/user';
import { Gender } from '../config';

// Initial state for modal
const initialState: UserProps = {
  modal: false
};

// Endpoints configuration
export const endpoints = {
  key: 'api/RegUser',
  modal: '/modal'
};

// Insert a new user function
const regUser = async (newUser: UserReg): Promise<UserReg> => {
  const data = {
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
export function useRegUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: regUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['regUsers'] });
    },
    onError: (error: any) => {
      console.error('Error inserting user:', error);
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
