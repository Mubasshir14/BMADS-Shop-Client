"use server";
import { revalidateTag } from "next/cache";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { cookies } from "next/headers";

export const createCoupon = async (couponData: any) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/coupon`, {
      method: "POST",
      headers: {
        Authorization: (await cookies()).get("accessToken")!.value,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(couponData),
    });
    revalidateTag("COUPON");
    return await res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const getAllCoupon = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/coupon`, {
      next: {
        tags: ["COUPON"],
      },
    });

    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const deleteCoupon = async (couponId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/coupon/${couponId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
        },
      }
    );
    revalidateTag("COUPON");

    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
