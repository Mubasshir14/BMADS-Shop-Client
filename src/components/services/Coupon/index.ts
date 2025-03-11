/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { IOrder } from "@/components/types/order";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const createOrder = async (order: IOrder) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    });
    revalidateTag("ORDER");
    return await res.json();
  } catch (error: any) {
    return Error(error);
  }
};
export const getOrder = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/order`, {
      method: "GET",
      headers: {
        Authorization: (await cookies()).get("accessToken")!.value,

        "Content-Type": "application/json",
      },
      next: {
        tags: ["ORDER"],
      },
    });
    return await res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const updateOrder = async (
  orderId: string,
  status: string
): Promise<any> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/order/${orderId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: (await cookies()).get("accessToken")?.value || "",
        },
        body: JSON.stringify({ status }),
      }
    );

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to update order");
    }

    revalidateTag("ORDER");
    return res.json();
  } catch (error: any) {
    console.error("Update Order Error:", error);
    throw error;
  }
};

export const addCoupon = async (couponCode: string, subTotal: number) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/coupon/${couponCode}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderAmount: subTotal }),
      }
    );

    return await res.json();
  } catch (error: any) {
    return Error(error);
  }
};
