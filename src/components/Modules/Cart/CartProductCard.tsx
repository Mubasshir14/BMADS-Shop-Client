import { Button } from "@/components/ui/button";
import {
  CartProduct,
  decrementOrderQuantity,
  incrementOrderQuantity,
  removeProduct,
} from "@/redux/features/cartSlice";
import { useAppDispatch } from "@/redux/hooks";

import { Minus, Plus, Trash } from "lucide-react";
import Image from "next/image";

export default function CartProductCard({ product }: { product: CartProduct }) {
  const dispatch = useAppDispatch();

  const handleIncrementQuantity = (id: string) => {
    dispatch(incrementOrderQuantity(id));
  };

  const handleDecrementQuantity = (id: string) => {
    dispatch(decrementOrderQuantity(id));
  };

  const handleRemoveProduct = (id: string) => {
    dispatch(removeProduct(id));
  };

  return (
    <div className="bg-white border-2 border-blue-100 rounded-lg flex p-1 gap-3">
      <div className="h-full w-14 rounded-md overflow-hidden">
        <Image
          src={product?.imageUrls?.[0]}
          height={200}
          width={200}
          alt="product"
          className="aspect-square object-cover"
        />
      </div>
      <div className="flex flex-col justify-between flex-grow">
        <h1 className="text-sm font-semibold">{product?.name}</h1>
        <div className="flex justify-between items-center gap-5 my-2">
          <p>
            <span className="text-gray-500 text-sm">Stock :</span>{" "}
            <span className="font-semibold text-sm">{product?.stock}</span>
          </p>
          <div>
            <h2 className="text-sm">
              Price: $ {product.offerPrice ? product.offerPrice : product.price}
            </h2>
          </div>
        </div>
        <hr className="my-1" />
        <div className="flex items-center justify-between text-sm">
          {/* <h2 className="text-sm">
            Price: $ {product.offerPrice ? product.offerPrice : product.price}
          </h2> */}
          <div className="flex items-center gap-2">
            <Button
              onClick={() => handleDecrementQuantity(product._id)}
              variant="outline"
              className="size-4 rounded-sm"
            >
              <Minus />
            </Button>
            <p className="font-semibold  text-sm">{product?.orderQuantity}</p>
            <Button
              onClick={() => handleIncrementQuantity(product._id)}
              variant="outline"
              className="size-4 rounded-sm"
            >
              <Plus />
            </Button>
            <Button
              onClick={() => handleRemoveProduct(product._id)}
              variant="outline"
              className="size-4 rounded-sm"
            >
              <Trash className="text-red-500/50" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
