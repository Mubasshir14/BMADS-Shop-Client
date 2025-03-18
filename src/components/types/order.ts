export interface IOrder {
  products: IOrderProduct[];
  coupon?: string;
  email: string;
  orderId: string;
}

export interface IOrderProduct {
  product: string;
  quantity: number;
  name: string;
}

export interface ICoupon {
  productId: string;
  subTotal: number;
  couponCode: string;
}
