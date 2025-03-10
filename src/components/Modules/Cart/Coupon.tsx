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
  productSelector,
  subTotalSelector,
} from "@/redux/features/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

export default function Coupon() {
  const subTotal = useAppSelector(subTotalSelector);
  const productId = useAppSelector(productSelector);
  const { isLoading, code } = useAppSelector(couponSelector);
  const dispatch = useAppDispatch();
  const form = useForm();
  const couponInput = form.watch("coupon");
  const handleRemoveCoupon = () => {
    form.reset();
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res: any = await dispatch(
        fetchCoupon({ couponCode: data.coupon, subTotal, productId }) as any
      ).unwrap();
      console.log(res, "inside component");
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="border-2 border-white bg-background brightness-105 rounded-md col-span-4 ">
      <div className="flex flex-col justify-between h-full">
        <h1 className="text-xl font-bold uppercase text-blue-500">
          Use Coupon code
        </h1>
        <Form {...form}>
          <form className="mt-3" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="coupon"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      className=" border-blue-500"
                      placeholder="Coupon code"
                      value={field.value || code}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="flex gap-2 mt-2">
              <Button
                disabled={!couponInput}
                type="submit"
                className="w-full bg-blue-500 text-xl font-semibold py-5 "
              >
                {isLoading ? "Applying..." : "Apply"}
              </Button>
              {couponInput && (
                <Button
                  onClick={handleRemoveCoupon}
                  variant="outline"
                  className="bg-red-100 rounded-full size-10"
                >
                  <Trash size={24} className="text-red-500" />
                </Button>
              )}
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
