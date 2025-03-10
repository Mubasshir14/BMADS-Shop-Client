
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { deleteProduct, getAllProducts } from "@/components/services/Product";
import React, { useEffect, useState } from "react";
import { EditIcon, DeleteIcon, ViewIcon } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tooltip } from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const ManageProduct = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortedProducts, setSortedProducts] = useState<any[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [productIdToDelete, setProductIdToDelete] = useState<string | null>(
    null
  );
  const [openModal, setOpenModal] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await getAllProducts();
        setProducts(data);
        setSortedProducts(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    const filteredProducts = products.filter(
      (product) =>
        product?.name
          .toLowerCase()
          .includes(event.target.value.toLowerCase()) ||
        product?.price.toString().includes(event.target.value) ||
        product?.category
          .toLowerCase()
          .includes(event.target.value.toLowerCase())
    );
    setSortedProducts(filteredProducts);
  };

  const handleSort = (key: keyof (typeof sortedProducts)[0]) => {
    const sorted = [...sortedProducts].sort((a, b) => {
      if (a[key] > b[key]) return 1;
      if (a[key] < b[key]) return -1;
      return 0;
    });
    setSortedProducts(sorted);
  };

  const handleDelete = async () => {
    if (productIdToDelete) {
      const toastId = "deleting";
      try {
        const res = await deleteProduct(productIdToDelete);
        if (res.success) {
          toast.success("The product has been deleted.", {
            id: toastId,
          });
        } else {
          toast.error("Something went wrong.", {
            id: toastId,
          });
        }
      } catch (err) {
        console.log(err);
      }
      setOpenModal(false);
    }
  };

  return (
    <div className="p-6  rounded-lg shadow-lg">
      <h1 className="text-blue-500 text-xl font-bold mb-3 text-center">
        Manage Products
      </h1>
      <Input
        type="text"
        value={searchQuery}
        onChange={handleSearch}
        className="mb-6 p-3 border border-gray-300 rounded-md w-full max-w-md mx-auto"
        placeholder="Search products"
      />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead
              onClick={() => handleSort("createdAt")}
              className="cursor-pointer text-blue-600"
            >
              Created At
            </TableHead>
            <TableHead className="text-blue-600">Image</TableHead>
            <TableHead className="text-blue-600">Name</TableHead>
            <TableHead className="text-blue-600">Price</TableHead>
            <TableHead className="text-blue-600">Stock</TableHead>
            <TableHead className="text-blue-600">Category</TableHead>
            <TableHead className="text-blue-600">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedProducts?.map((product) => (
            <TableRow key={product._id}>
              <TableCell>
                {new Date(product.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <Image
                  src={product.imageUrls[0]}
                  alt={product.name}
                  width={80}
                  height={80}
                  className="rounded-md object-cover"
                />
              </TableCell>
              <TableCell>{product?.name}</TableCell>
              <TableCell>${product?.price}</TableCell>
              <TableCell>{product?.stock}</TableCell>
              <TableCell>{product?.category?.name}</TableCell>
              <TableCell className="flex gap-2 space-x-3 justify-center">
                <Tooltip>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedProduct(product)}
                      >
                        <ViewIcon className="text-blue-500" />
                      </Button>
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
                            <strong>Stock:</strong> {selectedProduct.stock}
                          </p>
                          <p className="text-gray-600">
                            <strong>Price:</strong> ${selectedProduct.price}
                          </p>
                          <p className="text-gray-700 mt-2 text-justify">
                            <strong>Description:</strong>{" "}
                            {selectedProduct.description}
                          </p>
                        </div>
                      </DialogContent>
                    )}
                  </Dialog>
                </Tooltip>
                <Tooltip>
                  <Button
                    onClick={() =>
                      router.push(
                        `/dashboard/admin/product/update-product/${product?._id}`
                      )
                    }
                    variant="outline"
                    size="sm"
                  >
                    <EditIcon className="text-yellow-500" />
                  </Button>
                </Tooltip>
                <Tooltip>
                  <Button
                    onClick={() => {
                      setProductIdToDelete(product?._id);
                      setOpenModal(true);
                    }}
                    variant="outline"
                    size="sm"
                  >
                    <DeleteIcon className="text-red-500" />
                  </Button>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogTrigger asChild>
          <Button style={{ display: "none" }} />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader className="text-center text-lg font-bold text-red-500">
            Are you sure you want to delete this category?
          </DialogHeader>
          <DialogFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setOpenModal(false)}>
              Cancel
            </Button>
            <Button onClick={handleDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageProduct;
