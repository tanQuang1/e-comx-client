import { UserDataType } from '@/types/user.type';

export interface UserStateType {
  userDetail: null | UserDataType;
  isLoading: boolean;
  userList: any;
  totalRows: number;
}
