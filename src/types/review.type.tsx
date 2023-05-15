export interface ReviewsType {
  content: string;
  createdAt: string;
  name: string;
  product: string;
  score: number;
  updatedAt: string;
  user: string;
  _id: string;
}

export interface FormReviewsType {
  productId: string | undefined | string[];
  content: string;
  score: number;
}

export interface AddReviewType {
  success: boolean;
  status: number;
  msg: string;
}
