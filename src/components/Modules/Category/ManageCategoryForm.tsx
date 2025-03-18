/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import {
  deleteCategory,
  getAllCategories,
} from "@/components/services/Category";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

const ManageCategoryForm = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [openModal, setOpenModal] = useState(false);
  const [categoryIdToDelete, setCategoryIdToDelete] = useState<string | null>(
    null
  );
  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await getAllCategories();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const filteredCategories = categories.filter((category) =>
    category?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedCategories = filteredCategories.sort((a, b) => {
    if (sortOrder === "asc") {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    } else {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });

  const handleDelete = async () => {
    if (categoryIdToDelete) {
      const toastId = "deleting";
      try {
        const res = await deleteCategory(categoryIdToDelete);
        if (res.success) {
          toast.success("The category has been deleted.", {
            id: toastId,
          });
          setCategories(
            categories.filter((category) => category._id !== categoryIdToDelete)
          );
        } else {
          toast.error("Something went wrong.", {
            id: toastId,
          });
        }
      } catch (err) {
        // console.log(err);
      }
      setOpenModal(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold text-blue-700 mb-4">
        Manage Categories
      </h2>
      <div className="flex justify-between items-center mb-4">
        <Input
          placeholder="Search categories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-1/3"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="text-blue-600">
              Sort by Date <ChevronDown size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setSortOrder("asc")}>
              Ascending
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortOrder("desc")}>
              Descending
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="overflow-x-auto">
        <Table className="min-w-full border bg-white rounded-lg shadow-md">
          <TableHeader className="border-rounded-r">
            <TableRow className="bg-blue-500 text-white ">
              <TableHead className="font-bold text-white text-lg hover:text-black">
                Name
              </TableHead>
              <TableHead className="font-bold text-white text-lg hover:text-black">
                Description
              </TableHead>
              <TableHead className="font-bold text-white text-lg hover:text-black">
                Icon
              </TableHead>
              <TableHead className="font-bold text-white text-lg hover:text-black">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedCategories.length > 0 ? (
              sortedCategories.map((category) => (
                <TableRow
                  key={category?._id}
                  className="border-b hover:bg-blue-100"
                >
                  <TableCell className="font-medium">
                    {category?.name}
                  </TableCell>
                  <TableCell className="truncate max-w-xs">
                    {category?.description}
                  </TableCell>
                  <TableCell>
                    <Image
                      src={category?.icon}
                      alt={category?.name}
                      className="h-10 w-10 rounded-md"
                      height={40}
                      width={40}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        size="icon"
                        variant="outline"
                        className="text-blue-500"
                        onClick={() =>
                          router.push(
                            `/mealProvider/dashboard/food/foods/update-food/${category._id}`
                          )
                        }
                      >
                        <Pencil size={16} />
                      </Button>
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => {
                          setCategoryIdToDelete(category._id);
                          setOpenModal(true);
                        }}
                        className="text-red-500"
                      >
                        <Trash2 size={16} />
                      </Button>
                      {/* <Button
                        size="icon"
                        variant="outline"
                        className="text-green-500"
                        onClick={() => router.push(`/dashboard/admin/category/update-category/${category._id}`)}
                      >
                        <Eye size={16} />
                      </Button> */}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-4">
                  No categories found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>


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

export default ManageCategoryForm;
