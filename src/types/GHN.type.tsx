export interface ProvinceType {
  ProvinceID: number;
  ProvinceName: string;
  NameExtension: string[];
  CanUpdateCOD: boolean;
  Status: number;
}

export interface DistrictType {
  DistrictID: number;
  ProvinceID: number;
  DistrictName: string;
  Code: string;
  SupportType: number;
  Status: number;
}

export interface WardType {
  WardCode: string;
  DistrictID: number;
  WardName: string;
  Status: number;
}

export interface DataProviceType {
  ProviceName: string;
  ProviceID: number;
}

export interface AvailableServicesType {
  service_id: number;
  short_name: string;
  service_type_id: number;
}
