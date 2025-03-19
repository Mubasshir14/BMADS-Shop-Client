"use client";

import { useState } from "react";
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
import { ScaleLoader } from "react-spinners";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid"; // Add this package for better ID generation

export default function PaymentDetails() {
  const [isProcessing, setIsProcessing] = useState(false);
  const subTotal = useAppSelector(subTotalSelector);
  const discountAmount = useAppSelector(discountAmountSelector);
  const grandTotal = useAppSelector(grandTotalSelector);
  const order = useAppSelector(orderSelector);
  const email = useAppSelector(emailSelector);
  const cartProducts = useAppSelector(orderedProductsSelector);
  const coupon = useAppSelector(couponSelector);
  const dispatch = useAppDispatch();

  const handleOrder = async () => {
    const orderLoading = toast.loading("Order is being placed");
    setIsProcessing(true);
    
    try {
      if (!email) {
        throw new Error("Email is missing");
      }
      
      if (cartProducts.length === 0) {
        throw new Error("Cart is empty, what are you trying to order?");
      }
      
      // Generate a more reliable order ID
      const orderId = uuidv4().substring(0, 8);
      
      // Create order data
      const orderData = { 
        ...order, 
        email, 
        orderId,
        ...(coupon.code ? { coupon: coupon.code } : {})
      };
      
      // Make API call
      const res = await createOrder(orderData);
      
      if (res.success) {
        toast.success(res.message, { id: orderLoading });
        dispatch(clearCart());
        
        // Add a small delay to ensure toast is visible before redirect
        setTimeout(() => {
          window.location.href = res.data.paymentUrl;
        }, 300);
      } else {
        // Fixed error handling logic
        toast.error(res.message || "Failed to create order", { id: orderLoading });
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
      toast.error(errorMessage, { id: orderLoading });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="border-2 border-blue-100 bg-background brightness-105 rounded-md col-span-4 h-fit px-5">
      <h1 className="text-lg font-bold text-blue-500 uppercase">
        Payment Details
      </h1>
      
      {coupon.isLoading ? (
        <div className="flex items-center justify-center">
          <ScaleLoader color="#4ADABD" />
        </div>
      ) : (
        <>
          <div className="space-y-2">
            <div className="flex justify-between">
              <p className="text-gray-500 text-sm">Subtotal</p>
              <p className="font-semibold text-sm">${subTotal.toFixed(2)}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-500 text-sm">Discount</p>
              <p className="font-semibold text-sm">
                ${discountAmount.toFixed(2)}
              </p>
            </div>
          </div>
          <div className="flex justify-between mb-5">
            <p className="text-gray-500 text-sm">Grand Total</p>
            <p className="font-semibold text-sm">${grandTotal.toFixed(2)}</p>
          </div>
        </>
      )}
      
      <Button
        onClick={handleOrder}
        disabled={cartProducts.length === 0 || !email || isProcessing}
        className="w-full bg-blue-500 text-sm font-semibold mb-2"
      >
        {isProcessing ? "Processing..." : "Order Now"}
      </Button>
    </div>
  );
}