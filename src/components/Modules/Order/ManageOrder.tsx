"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { getOrder, updateOrder } from "@/components/services/Coupon";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const ManageOrder = () => {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await getOrder();
        setOrders(data);
      } catch (error: any) {
        toast.error("Failed to fetch orders");
        console.log(error);
      }
    };

    fetchOrders();
  }, []);

  const handleStatusUpdate = async (id: string, status: string) => {
    const toastId = toast.loading("Updating order...");
    try {
      await updateOrder(id, status);
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === id ? { ...order, status } : order
        )
      );
      toast.success(`Order successfully ${status.toLowerCase()}`, {
        id: toastId,
      });
    } catch (error: any) {
      toast.error(error.message || "Failed to update order status", {
        id: toastId,
      });
    }
  };

  return (
    <div className="p-4">
      <h2 className="font-semibold text-blue-700 text-center text-xl mb-4">
        Manage Orders
      </h2>
      <div className="overflow-x-auto rounded-lg">
        <table className="min-w-full border border-blue-100">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="p-2 border">Product Name</th>
              <th className="p-2 border">Quantity</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Payment Status</th>
              <th className="p-2 border">Final Amount</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              const isDisabled =
                order.status === "Delivered" || order.status === "Cancelled";

              return (
                <tr key={order._id} className="text-center border">
                  <td className="p-2 border">
                    {order.products.map((p: any) => p.name).join(", ")}
                  </td>
                  <td className="p-2 border">
                    {order.products.map((p: any) => p.quantity).join(", ")}
                  </td>
                  <td className="p-2 border">{order.email}</td>
                  <td className="p-2 border">{order.status}</td>
                  <td className="p-2 border">{order.paymentStatus}</td>
                  <td className="p-2 border">${order.finalAmount}</td>
                  <td className="p-2 border">
                    <div className="flex flex-col items-center space-y-2">
                      <Button
                        disabled={isDisabled}
                        onClick={() =>
                          handleStatusUpdate(order._id, "Delivered")
                        }
                        variant="outline"
                        className="py-1 px-3 text-xs border-green-400 text-green-400"
                      >
                        Update
                      </Button>
                      <Button
                        disabled={isDisabled}
                        onClick={() =>
                          handleStatusUpdate(order._id, "Cancelled")
                        }
                        variant="outline"
                        className="py-1 px-3 text-xs border-red-400 text-red-400"
                      >
                        Cancel
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageOrder;
