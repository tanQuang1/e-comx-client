interface ProvinceType {
  provinceId: number;
  provinceName: string;
}
interface DistrictType {
  districtId: number;
  districtName: string;
}
interface WardType {
  wardId: number;
  wardName: string;
}
interface addressType {
  province: ProvinceType;
  district: DistrictType;
  ward: WardType;
  detail: string;
}
interface ShippingDetailType {
  address: addressType;
  fullname: string;
  phone: string;
  email: string;
}
interface ProductType {
  product: string;
  quantity: number;
}
export interface CreateOrderFormType {
  products: ProductType[];
  // coupon: string;
  shippingDetail: ShippingDetailType;
  paymentType: string;
}

export interface responseCreateOrderType {
  msg: string;
  url: string;
}
