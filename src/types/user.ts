import { Gender, Role } from 'config';

// ==============================|| TYPES - USER  ||============================== //

export interface UserProps {
  modal: boolean;
}

export interface UserList {
  uuid?: string;
  accountEnabled: boolean;
  displayName: string;
  mailNickname: string;
  userPrincipalName: string;
  passwordProfile: {
    forceChangePasswordNextSignIn: boolean;
    password: string;
  };
  role: Role;
  firstName: string;
  lastName: string;
  email: string;
  specialization: string;
  memberCode: string;
  className: string;
  gender: Gender;
  dateOfBirth: string;
  phoneNumber: string;
  avatar: number;
  status: number;
}


export interface UserReg {
  uuid?: string;
  role: Role;
  firstName: string;
  lastName: string;
  email: string;
  specialization: string;
  memberCode: string;
  className: string;
  gender: Gender;
  dateOfBirth: string;
  phoneNumber: string;
  avatar: number;
  status: number;
  createdAt: string;
}
