/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
// export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { getAllCategories } from "@/components/services/Category";
import { getAllProducts } from "@/components/services/Product";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Tooltip } from "@/components/ui/tooltip";
import { Loader2 } from "lucide-react";
import { IProduct } from "@/components/types/product";
import { addProduct } from "@/redux/features/cartSlice";
import { useAppDispatch } from "@/redux/hooks";
import { useUser } from "@/components/context/UserContext";
import { toast } from "sonner";
import CartModal from "@/components/Cart/CartModal";

const HomeTableData = () => {
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useAppDispatch();
  const { user } = useUser();
  useEffect(() => {
    const fetchData = async () => {
      const { data: fetchedCategories } = await getAllCategories();
      const { data: fetchedProducts } = await getAllProducts();

      setCategories(fetchedCategories);
      setProducts(fetchedProducts);
    };

    fetchData();
  }, []);

  const matchProductToCategory = (product: any, category: any) => {
    return (
      product.category === category._id ||
      product.category?._id === category._id ||
      product.categoryId === category._id ||
      product.categoryID === category._id ||
      product.category_id === category._id
    );
  };

  const categoriesWithProducts = categories?.filter((category: any) =>
    products.some((product: any) => matchProductToCategory(product, category))
  );

 
  const handleAddProduct = (product: IProduct) => {
    const toastId = "creating";
    if (user && user.role === "admin") {
      toast.error("You are not allowed to add items to the cart.", {
        id: toastId,
      });
      return;
    }
    dispatch(addProduct(product));
    toast.success("Successfully added to cart!", {
      id: toastId,
    });

    setIsCartModalOpen(true);
  };

  return (
    <div className="max-w-screen-xl mx-auto p-4">
      <h1 className="text-2xl uppercase text-blue-500 font-bold text-center mb-4">
        All Products
      </h1>
      {categoriesWithProducts?.length > 0 ? (
        categoriesWithProducts?.map((category: any) => {
          const categoryProducts = products?.filter((product: any) =>
            matchProductToCategory(product, category)
          );

          return (
            <Card
              id={category.name}
              key={category._id}
              className="mb-6 border border-blue-200 shadow-md"
            >
              <CardHeader className="bg-blue-500 text-white py-4 rounded-t-lg">
                <CardTitle className="uppercase font-semibold text-center text-lg md:text-xl">
                  {category?.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="overflow-x-auto rounded-md border-2 border-blue-100">
                  <Table className="w-full border border-gray-200 rounded-md">
                    <TableHeader>
                      <TableRow className="bg-gray-100 text-gray-700 rounded-md">
                        <TableHead className="w-16 md:w-20 p-3 text-center">
                          Image
                        </TableHead>
                        <TableHead className="p-3">Name</TableHead>
                        <TableHead className="p-3 text-center">Price</TableHead>
                        <TableHead className="p-3 text-center hidden sm:table-cell">
                          Stock
                        </TableHead>
                        <TableHead className="p-3 text-center">Cart</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {categoryProducts?.map((product: any) => (
                        <TableRow
                          key={product._id}
                          className="border-b hover:bg-gray-50 transition"
                        >
                          <TableCell className="p-3 text-center">
                            {product.imageUrls?.length > 0 ? (
                              <Image
                                src={product?.imageUrls[0]}
                                alt={product?.name}
                                width={40}
                                height={40}
                                className="rounded-md object-cover w-10 h-10"
                              />
                            ) : (
                              <div className="w-10 h-10 bg-gray-200 rounded-md"></div>
                            )}
                          </TableCell>
                          <TableCell
                            className="p-3 text-sm md:text-base font-medium cursor-pointer"
                            onClick={() => setSelectedProduct(product)}
                          >
                            <Tooltip>
                              <Dialog>
                                <DialogTrigger asChild>
                                  <div
                                    onClick={() => setSelectedProduct(product)}
                                  >
                                    <div className="max-w-xs truncate">
                                      {product?.name}
                                    </div>
                                  </div>
                                </DialogTrigger>
                                {selectedProduct && (
                                  <DialogContent className="max-w-lg border-2 border-blue-500">
                                    <div className="text-center">
                                      <h2 className="text-lg font-bold text-blue-600 mb-2">
                                        {selectedProduct.name}
                                      </h2>
                                      <Image
                                        src={selectedProduct.imageUrls[0]}
                                        alt={selectedProduct.name}
                                        width={200}
                                        height={200}
                                        className="rounded-md mx-auto my-4 object-cover mb-3"
                                      />
                                      <p className="text-gray-600 ">
                                        <strong>Category:</strong>{" "}
                                        {selectedProduct.category?.name}
                                      </p>
                                      <p className="text-gray-600">
                                        <strong>Stock:</strong>{" "}
                                        {selectedProduct?.stock}
                                      </p>
                                      <p className="text-gray-600">
                                        <strong>Price:</strong> $
                                        {selectedProduct?.price}
                                      </p>
                                      <p className="text-gray-700 mt-2 text-justify">
                                        <strong>Description:</strong>{" "}
                                        {selectedProduct?.description}
                                      </p>
                                    </div>
                                  </DialogContent>
                                )}
                              </Dialog>
                            </Tooltip>
                            <div className="sm:hidden text-xs text-gray-500">
                              Stock: {product?.stock}
                            </div>
                          </TableCell>
                          <TableCell className="p-3 text-center text-sm md:text-base font-semibold">
                            ${product?.price}
                          </TableCell>
                          <TableCell className="p-3 text-center hidden sm:table-cell text-gray-700">
                            {product.stock}
                          </TableCell>
                          <TableCell className="p-3 text-center">
                            <Button
                              onClick={() => handleAddProduct(product)}
                              variant="default"
                              size="sm"
                              className={`text-xs px-3 py-1 md:px-4 md:py-2 ${
                                product.stock === 0
                                  ? "bg-gray-400 cursor-not-allowed"
                                  : "bg-blue-500 hover:bg-blue-600"
                              }`}
                              disabled={product?.stock === 0}
                            >
                              {product.stock === 0 ? "Stock Out" : "Buy"}
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          );
        })
      ) : (
        <p className="text-center text-gray-500 mt-6">
          No categories with products found
        </p>
      )}

      <CartModal
        isOpen={isCartModalOpen}
        onClose={() => setIsCartModalOpen(false)}
      />
    </div>
  );
};

export default HomeTableData;
