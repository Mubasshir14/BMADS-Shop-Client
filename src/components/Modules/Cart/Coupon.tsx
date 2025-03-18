/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Trash } from "lucide-react";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { toast } from "sonner";
import {
  couponSelector,
  fetchCoupon,
  subTotalSelector,
} from "@/redux/features/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

export default function Coupon() {
  const subTotal = useAppSelector(subTotalSelector);
  const { isLoading, code } = useAppSelector(couponSelector);
  const dispatch = useAppDispatch();
  const form = useForm();
  const couponInput = form.watch("coupon");
  const handleRemoveCoupon = () => {
    form.reset();
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = "creating";
    // console.log({ couponCode: data.coupon, subTotal });
    try {
      const res: any = await dispatch(
        fetchCoupon({ couponCode: data.coupon, subTotal }) as any
      ).unwrap();
      if (res.success) {
        toast.success(res.message, {
          id: toastId,
        });
      } else {
        toast.error(res.error.message, {
          id: toastId,
        });
      }
    } catch (error: any) {
      console.log('coupon', error);
      toast.error("Invalid Coupon Code", {
        id: toastId,
      });
    }
  };

  return (
    <div className="border-2 border-white bg-background brightness-105 rounded-md col-span-4 ">
      <div className="flex flex-row items-center justify-between gap-x-2 w-full">
        <Form {...form}>
          <form
            className="flex flex-row items-center gap-2 w-full"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="coupon"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      {...field}
                      className="border-blue-500 text-sm py-1 w-full"
                      placeholder="Coupon code"
                      value={field.value || code}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              disabled={!couponInput}
              type="submit"
              className="bg-blue-500 text-sm"
            >
              {isLoading ? "Applying..." : "Apply"}
            </Button>
            {couponInput && (
              <Button
                onClick={handleRemoveCoupon}
                variant="outline"
                className="bg-red-100 p-1 rounded-full size-10"
              >
                <Trash size={20} className="text-red-500" />
              </Button>
            )}
          </form>
        </Form>
      </div>
    </div>
  );
}
