export interface RegisterFormDataType {
  firstname: string;
  lastname: string;
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

export interface LoginFormDataType {
  username: string;
  password: string;
  remember: boolean;
}

export interface AddressType {
  province: {
    provinceId: number;
    provinceName: string;
  };
  district: {
    districtId: number;
    districtName: string;
  };
  ward: {
    wardId: number;
    wardName: string;
  };
  detail: string;
}

export interface UserDataType {
  id: string;
  username: string;
  name: string;
  address: AddressType;
  phone?: number;
  email: string;
  gender?: string;
  avatar?: string;
  role?: string;
  // status?: 'active' | 'inactive';
}
