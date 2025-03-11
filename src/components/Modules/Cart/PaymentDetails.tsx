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
import { ScaleLoader } from "react-spinners";
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
        orderData = { ...order, email, coupon: coupon.code };
        console.log(orderData);
      } else {
        orderData = { ...order, email };
      }
      console.log(orderData);
      const res = await createOrder(orderData as any);
      console.log(res);
      if (res.success) {
        toast.success(res.message, { id: orderLoading });
        dispatch(clearCart());

        console.log("Redirecting to:", res.data.data.paymentUrl);
        router.push(res.data.data.paymentUrl);

      }

      if (!res.error) {
        toast.error(res.message, { id: orderLoading });
      }
    } catch (error: any) {
      toast.error(error.message, { id: orderLoading });
    }
  };

  return (
    <div className="border-2 border-blue-100 bg-background brightness-105 rounded-md col-span-4 h-fit px-5">
      <h1 className="text-lg font-bold text-blue-500 uppercase">
        Payment Details
      </h1>
      {coupon.isLoading && (
        <div className="flex items-center justify-center">
          <ScaleLoader color="#4ADABD" />
        </div>
      )}
      {!coupon.isLoading && (
        <>
          <div className="space-y-2 ">
            <div className="flex justify-between">
              <p className="text-gray-500 text-sm">Subtotal</p>
              <p className="font-semibold text-sm">{subTotal.toFixed(2)}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-500 text-sm">Discount</p>
              <p className="font-semibold text-sm">
                {discountAmount.toFixed(2)}
              </p>
            </div>
          </div>
          <div className="flex justify-between mb-5">
            <p className="text-gray-500 text-sm">Grand Total</p>
            <p className="font-semibold text-sm">{grandTotal.toFixed(2)}</p>
          </div>
        </>
      )}
      <Button
        onClick={handleOrder}
        className="w-full bg-blue-500 text-sm   font-semibold mb-2"
      >
        Order Now
      </Button>
    </div>
  );
}
