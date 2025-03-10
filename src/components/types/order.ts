export interface IOrder {
  products: IOrderProduct[];
  coupon?: string;
  email: string;
}

export interface IOrderProduct {
  product: string;
  quantity: number;
}

export interface ICoupon {
  productId: string;
  subTotal: number;
  couponCode: string;
}
