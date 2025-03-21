/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { emailSelector, updateEmail } from "@/redux/features/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

export default function Email() {
  const dispatch = useAppDispatch();
  const emailSelected = useAppSelector(emailSelector);

  const handleEmail = (email: string) => {
    dispatch(updateEmail(email));
  };

  return (
    <div className="border-2 border-white bg-background brightness-105 rounded-md col-span-4 mt-2">
      <div className="flex flex-col justify-between h-full">
        <div className="mt-2">
          <Input
          type="email"
            className="border-blue-500"
            placeholder="Your Email"
            onChange={(e) => handleEmail(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
