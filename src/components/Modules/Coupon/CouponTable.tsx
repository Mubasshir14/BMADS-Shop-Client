/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"; // Required if using Next.js App Router

import { useEffect, useState } from "react";

import { Trash2 } from "lucide-react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { deleteCoupon, getAllCoupon } from "@/components/services/Cpupons";
import { toast } from "sonner";

const CouponTable = () => {
  const [coupons, setCoupons] = useState<any[]>([]);

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const { data } = await getAllCoupon();

        setCoupons(data);
      } catch (error: any) {
        toast.error("Failed to load coupons.");
        console.log(error);
      }
    };
    fetchCoupons();
  }, []);

  const handleDelete = async (couponId: string) => {
    try {
      const res = await deleteCoupon(couponId);
      if (res.success) {
        toast.success("Successfully Deleted");
      }
      setCoupons((prevCoupons) =>
        prevCoupons.filter((c) => c._id !== couponId)
      );
      toast.success("Coupon deleted successfully!");
    } catch (error: any) {
      toast.error("Failed to delete coupon.");
      // console.log(error);
    }
  };

  return (
    <div className="p-6 rounded-lg shadow-lg bg-white ">
      {coupons.length === 0 ? (
        <p className="text-center text-gray-500">No coupons available.</p>
      ) : (
        <Table className="border rounded-md">
          <TableHeader className="rounded-md">
            <TableRow className="text-lg bg-blue-500 rounded-md">
              <TableHead className="p-4 text-black">Code</TableHead>
              <TableHead className="p-4 text-black">Discount</TableHead>
              <TableHead className="p-4 text-black">Start Date</TableHead>
              <TableHead className="p-4 text-black">End Date</TableHead>
              <TableHead className="p-4 text-center text-black">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {coupons.map((coupon) => (
              <TableRow
                key={coupon._id}
                className="border-b border-blue-300 hover:bg-blue-100 transition"
              >
                <TableCell className="p-4 font-medium text-gray-700">
                  {coupon.code}
                </TableCell>
                <TableCell className="p-4 text-blue-600 font-semibold">
                  {coupon.discountValue}%
                </TableCell>
                <TableCell className="p-4 text-gray-500">
                  {new Date(coupon.startDate).toLocaleDateString()}
                </TableCell>
                <TableCell className="p-4 text-gray-500">
                  {new Date(coupon.endDate).toLocaleDateString()}
                </TableCell>
                <TableCell className="p-4 text-center">
                  <Button
                    onClick={() => handleDelete(coupon._id)}
                    variant="ghost"
                    className="text-red-500 hover:text-red-700 transition-transform transform hover:scale-110"
                  >
                    <Trash2 size={20} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default CouponTable;
