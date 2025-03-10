/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { createOrder } from "@/components/services/Coupon";
import { Button } from "@/components/ui/button";
import {
  clearCart,
  couponSelector,
  discountAmountSelector,
  emailSelector,
  grandTotalSelector,
  orderedProductsSelector,
  orderSelector,
  subTotalSelector,
} from "@/redux/features/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function PaymentDetails() {
  const subTotal = useAppSelector(subTotalSelector);
  const discountAmount = useAppSelector(discountAmountSelector);
  const grandTotal = useAppSelector(grandTotalSelector);
  const order = useAppSelector(orderSelector);
  const email = useAppSelector(emailSelector);
  const cartProducts = useAppSelector(orderedProductsSelector);
  const coupon = useAppSelector(couponSelector);

  const router = useRouter();

  const dispatch = useAppDispatch();

  const handleOrder = async () => {
    const orderLoading = toast.loading("Order is being placed");
    try {
      if (!email) {
        throw new Error("Email is missing");
      }

      if (cartProducts.length === 0) {
        throw new Error("Cart is empty, what are you trying to order ??");
      }

      let orderData;

      if (coupon.code) {
        orderData = { ...order, coupon: coupon.code };
      } else {
        orderData = order;
      }

      const res = await createOrder(orderData as any);

      if (res.success) {
        toast.success(res.message, { id: orderLoading });
        dispatch(clearCart());
        router.push(res.data.paymentUrl);
      }

      if (!res.success) {
        toast.error(res.message, { id: orderLoading });
      }
    } catch (error: any) {
      toast.error(error.message, { id: orderLoading });
    }
  };

  return (
    <div className="border-2 border-blue-100 bg-background brightness-105 rounded-md col-span-4 h-fit p-5">
      <h1 className="text-xl font-bold text-blue-500 uppercase">
        Payment Details
      </h1>
      {coupon.isLoading && <div>Loading...</div>}
      {!coupon.isLoading && (
        <>
          <div className="space-y-2 mt-4">
            <div className="flex justify-between">
              <p className="text-gray-500 ">Subtotal</p>
              <p className="font-semibold">{subTotal}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-500 ">Discount</p>
              <p className="font-semibold">{discountAmount}</p>
            </div>
          </div>
          <div className="flex justify-between mt-10 mb-5">
            <p className="text-gray-500 ">Grand Total</p>
            <p className="font-semibold">{grandTotal}</p>
          </div>
        </>
      )}
      <Button
        onClick={handleOrder}
        className="w-full bg-blue-500 text-xl font-semibold py-5"
      >
        Order Now
      </Button>
    </div>
  );
}
