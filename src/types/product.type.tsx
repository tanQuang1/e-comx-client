import { SubcategoryDataType } from './app.type';

export interface ImageType {
  url: string;
  public_id: string;
  _id: string;
}

export interface ProductDataType {
  _id: string;
  code: string;
  name: string;
  images: ImageType[];
  price: number;
  available: number;
  description: string;
  tags: string[];
  brand: string;
  status: 'active' | 'inactive';
  subcategory: SubcategoryDataType;
  totalComment?: number;
  avg_review: number;
  createdAt?: string;
  updatedAt?: string;
  rating?: number;
  selling?: number;
}
